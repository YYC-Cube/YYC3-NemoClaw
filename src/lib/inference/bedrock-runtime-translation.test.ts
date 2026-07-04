// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";

import {
  AdapterHttpError,
  buildBedrockConverseRequest,
  convertBedrockConverseResponse,
  parseJsonObject,
} from "./bedrock-runtime-translation";

describe("AdapterHttpError", () => {
  it("carries status and code", () => {
    const err = new AdapterHttpError(429, "too many requests", "rate_limited");
    expect(err.status).toBe(429);
    expect(err.code).toBe("rate_limited");
    expect(err.message).toBe("too many requests");
  });

  it("defaults code to bad_request", () => {
    const err = new AdapterHttpError(400, "bad input");
    expect(err.code).toBe("bad_request");
  });

  it("is an instance of Error", () => {
    const err = new AdapterHttpError(500, "error");
    expect(err).toBeInstanceOf(Error);
  });
});

describe("parseJsonObject", () => {
  it("parses valid JSON objects", () => {
    expect(parseJsonObject('{"key": "value"}', "test")).toEqual({ key: "value" });
  });

  it("throws on arrays", () => {
    expect(() => parseJsonObject("[1,2,3]", "test")).toThrow(AdapterHttpError);
  });

  it("throws on non-object values", () => {
    expect(() => parseJsonObject('"string"', "test")).toThrow(AdapterHttpError);
  });

  it("throws on invalid JSON", () => {
    expect(() => parseJsonObject("{invalid}", "test")).toThrow(AdapterHttpError);
  });

  it("includes label in error message", () => {
    expect(() => parseJsonObject("[]", "myField")).toThrow("myField");
  });
});

describe("buildBedrockConverseRequest", () => {
  it("requires model field", () => {
    expect(() =>
      buildBedrockConverseRequest({ messages: [{ role: "user", content: "hi" }] }),
    ).toThrow("model");
  });

  it("requires non-empty messages", () => {
    expect(() =>
      buildBedrockConverseRequest({ model: "test-model", messages: [] }),
    ).toThrow("messages");
  });

  it("rejects unsupported OpenAI fields", () => {
    expect(() =>
      buildBedrockConverseRequest({
        model: "test",
        messages: [{ role: "user", content: "hi" }],
        n: 2,
      }),
    ).toThrow("Unsupported");
  });

  it("converts a basic request", () => {
    const input = buildBedrockConverseRequest({
      model: "anthropic.claude-3-sonnet",
      messages: [{ role: "user", content: "Hello" }],
    });
    expect(input.modelId).toBe("anthropic.claude-3-sonnet");
    expect(input.messages).toHaveLength(1);
    expect(input.messages![0].role).toBe("user");
  });

  it("extracts system messages", () => {
    const input = buildBedrockConverseRequest({
      model: "test",
      messages: [
        { role: "system", content: "You are helpful" },
        { role: "user", content: "Hi" },
      ],
    });
    expect(input.system).toHaveLength(1);
    expect(input.system![0].text).toBe("You are helpful");
  });

  it("converts temperature and max_tokens", () => {
    const input = buildBedrockConverseRequest({
      model: "test",
      messages: [{ role: "user", content: "Hi" }],
      temperature: 0.7,
      max_tokens: 2048,
    });
    expect(input.inferenceConfig?.temperature).toBe(0.7);
    expect(input.inferenceConfig?.maxTokens).toBe(2048);
  });

  it("removes inferenceConfig when all fields are undefined", () => {
    const input = buildBedrockConverseRequest({
      model: "test",
      messages: [{ role: "user", content: "Hi" }],
    });
    expect(input.inferenceConfig).toBeUndefined();
  });

  it("converts assistant messages with tool_calls", () => {
    const input = buildBedrockConverseRequest({
      model: "test",
      messages: [
        { role: "user", content: "What's the weather?" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call-1",
              type: "function",
              function: { name: "get_weather", arguments: '{"city":"SF"}' },
            },
          ],
        },
      ],
    });
    expect(input.messages).toHaveLength(2);
    const assistantMsg = input.messages![1];
    expect(assistantMsg.role).toBe("assistant");
    expect(assistantMsg.content).toHaveLength(1);
    const toolUse = assistantMsg.content![0].toolUse;
    expect(toolUse).toBeDefined();
    expect(toolUse!.name).toBe("get_weather");
  });

  it("converts tool messages", () => {
    const input = buildBedrockConverseRequest({
      model: "test",
      messages: [
        { role: "user", content: "What's the weather?" },
        {
          role: "assistant",
          content: null,
          tool_calls: [{ id: "call-1", type: "function", function: { name: "get_weather", arguments: "{}" } }],
        },
        { role: "tool", content: "72°F", tool_call_id: "call-1" },
      ],
    });
    expect(input.messages).toHaveLength(3);
  });

  it("rejects unsupported message roles", () => {
    expect(() =>
      buildBedrockConverseRequest({
        model: "test",
        messages: [{ role: "function", content: "{}" }],
      }),
    ).toThrow("Unsupported message role");
  });
});

describe("convertBedrockConverseResponse", () => {
  it("converts a text-only response", () => {
    const response = convertBedrockConverseResponse(
      {
        output: {
          message: {
            role: "assistant",
            content: [{ text: "Hello back" }],
          },
        },
        stopReason: "end_turn",
        usage: { inputTokens: 5, outputTokens: 3, totalTokens: 8 },
      } as any,
      "test-model",
    );

    expect(response.object).toBe("chat.completion");
    expect(response.choices[0].message.content).toBe("Hello back");
    expect(response.choices[0].finish_reason).toBe("stop");
    expect(response.usage?.prompt_tokens).toBe(5);
    expect(response.usage?.completion_tokens).toBe(3);
    expect(response.usage?.total_tokens).toBe(8);
  });

  it("converts tool_use responses", () => {
    const response = convertBedrockConverseResponse(
      {
        output: {
          message: {
            role: "assistant",
            content: [
              {
                toolUse: {
                  toolUseId: "toolu-1",
                  name: "get_weather",
                  input: { city: "SF" },
                },
              },
            ],
          },
        },
        stopReason: "tool_use",
      } as any,
      "test-model",
    );

    expect(response.choices[0].finish_reason).toBe("tool_calls");
    expect(response.choices[0].message.tool_calls).toHaveLength(1);
    expect(response.choices[0].message.tool_calls![0].function.name).toBe("get_weather");
    expect(response.choices[0].message.content).toBeNull();
  });

  it("converts max_tokens stop reason to length", () => {
    const response = convertBedrockConverseResponse(
      {
        output: { message: { role: "assistant", content: [{ text: "partial" }] } },
        stopReason: "max_tokens",
      } as any,
      "test-model",
    );
    expect(response.choices[0].finish_reason).toBe("length");
  });
});
