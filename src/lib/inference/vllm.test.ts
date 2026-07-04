// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

// nim.ts uses CJS require('../runner') — mock nim at module level
vi.mock("./nim", () => ({
  getGpuIndicesByName: vi.fn(() => []),
}));

vi.mock("../runner", () => ({
  runCapture: vi.fn(() => ""),
  runShell: vi.fn(() => ({ status: 0, stdout: "", stderr: "" })),
  ROOT: "/repo/root",
}));

vi.mock("../adapters/docker", () => ({
  dockerCapture: vi.fn(() => ""),
  dockerPullWithProgressWatchdog: vi.fn(() => Promise.resolve({ status: 0 })),
  dockerSpawn: vi.fn(() => ({
    stdout: { on: vi.fn() },
    stderr: { on: vi.fn() },
    on: vi.fn(),
  })),
}));

vi.mock("../core/ports", () => ({ VLLM_PORT: 8003 }));

vi.mock("./vllm-models", () => ({
  selectVllmModelFromEnv: vi.fn(() => null),
  assertGatedModelAccess: vi.fn(),
  buildVllmServeCommand: vi.fn(() => "vllm serve"),
  DEFAULT_VLLM_MODEL: { id: "nemotron-nano-4b", envValue: "nemotron-3-nano-4b" },
  VLLM_MODELS: [
    { id: "model-a", envValue: "model-a" },
    { id: "model-b", envValue: "model-b" },
    { id: "Qwen3.6-35B-A3B-NVFP4", envValue: "qwen3.6-35b-a3b-nvfp4" },
    { id: "nemotron-nano-4b", envValue: "nemotron-3-nano-4b" },
  ],
}));

describe("detectVllmProfile", () => {
  it("detects spark platform", async () => {
    const mod = await import("./vllm");
    const profile = mod.detectVllmProfile({ platform: "spark" });
    expect(profile).not.toBeNull();
    expect(profile!.name).toBe("DGX Spark");
  });

  it("detects station platform", async () => {
    const mod = await import("./vllm");
    const profile = mod.detectVllmProfile({ platform: "station" });
    expect(profile).not.toBeNull();
    expect(profile!.name).toBe("DGX Station");
  });

  it("detects generic nvidia GPU", async () => {
    const mod = await import("./vllm");
    const profile = mod.detectVllmProfile({ type: "nvidia" });
    expect(profile).not.toBeNull();
    expect(profile!.name).toBe("Linux + NVIDIA GPU");
  });

  it("returns null for non-nvidia GPUs", async () => {
    const mod = await import("./vllm");
    const profile = mod.detectVllmProfile({ type: "amd" });
    expect(profile).toBeNull();
  });

  it("returns null for null input", async () => {
    const mod = await import("./vllm");
    const profile = mod.detectVllmProfile(null);
    expect(profile).toBeNull();
  });
});

describe("buildHfTokenDockerArgs", () => {
  it("returns empty array when no HF token is set", async () => {
    const mod = await import("./vllm");
    const args = mod.buildHfTokenDockerArgs({});
    expect(args).toEqual([]);
  });

  it("returns -e HF_TOKEN when token is set", async () => {
    const mod = await import("./vllm");
    const args = mod.buildHfTokenDockerArgs({ HF_TOKEN: "hf-secret" });
    expect(args).toEqual(["-e", "HF_TOKEN"]);
  });

  it("prefers HF_TOKEN over HUGGING_FACE_HUB_TOKEN", async () => {
    const mod = await import("./vllm");
    const args = mod.buildHfTokenDockerArgs({
      HF_TOKEN: "primary",
      HUGGING_FACE_HUB_TOKEN: "secondary",
    });
    expect(args).toEqual(["-e", "HF_TOKEN"]);
  });
});

describe("buildHfTokenForwardEnv", () => {
  it("returns empty object when no token", async () => {
    const mod = await import("./vllm");
    const env = mod.buildHfTokenForwardEnv({});
    expect(env).toEqual({});
  });

  it("returns token key-value when set", async () => {
    const mod = await import("./vllm");
    const env = mod.buildHfTokenForwardEnv({ HF_TOKEN: "hf-secret" });
    expect(env).toEqual({ HF_TOKEN: "hf-secret" });
  });
});
