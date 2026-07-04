// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

vi.mock("../actions/global", () => ({
  recoverNamedGatewayRuntime: vi.fn().mockResolvedValue({ recovered: true }),
}));

vi.mock("../cli/branding", () => ({
  CLI_DISPLAY_NAME: "NemoClaw",
  CLI_NAME: "nemoclaw",
}));

import {
  BRIDGE_PROVIDER_SUFFIXES,
  credentialsGatewayRecoveryFailureLines,
  isBridgeProviderName,
  printCredentialsUsage,
  recoverGatewayOrExit,
} from "./command-support";

describe("isBridgeProviderName", () => {
  it("returns true for telegram bridge provider", () => {
    expect(isBridgeProviderName("my-sandbox-telegram-bridge")).toBe(true);
  });

  it("returns true for discord bridge provider", () => {
    expect(isBridgeProviderName("my-sandbox-discord-bridge")).toBe(true);
  });

  it("returns true for slack bridge provider", () => {
    expect(isBridgeProviderName("my-sandbox-slack-bridge")).toBe(true);
  });

  it("returns true for slack app provider", () => {
    expect(isBridgeProviderName("my-sandbox-slack-app")).toBe(true);
  });

  it("returns false for regular provider names", () => {
    expect(isBridgeProviderName("nvidia-prod")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isBridgeProviderName("")).toBe(false);
  });

  it("returns false for names with only partial suffix match", () => {
    expect(isBridgeProviderName("my-sandbox-telegram")).toBe(false);
  });

  it("handles all known suffixes", () => {
    for (const suffix of BRIDGE_PROVIDER_SUFFIXES) {
      expect(isBridgeProviderName(`sandbox${suffix}`)).toBe(true);
    }
  });
});

describe("printCredentialsUsage", () => {
  it("prints usage information to the provided log function", () => {
    const lines: string[] = [];
    const log = (msg?: string) => lines.push(msg ?? "");

    printCredentialsUsage(log);

    expect(lines.length).toBeGreaterThan(0);
    expect(lines.some((l) => l.includes("credentials"))).toBe(true);
    expect(lines.some((l) => l.includes("list"))).toBe(true);
    expect(lines.some((l) => l.includes("reset"))).toBe(true);
  });

  it("defaults to console.log", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => { });
    printCredentialsUsage();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("credentialsGatewayRecoveryFailureLines", () => {
  it("returns query failure lines with correct kind", () => {
    const lines = credentialsGatewayRecoveryFailureLines("query");
    expect(lines.some((l) => l.includes("query"))).toBe(true);
  });

  it("returns reach failure lines with correct kind", () => {
    const lines = credentialsGatewayRecoveryFailureLines("reach");
    expect(lines.some((l) => l.includes("reach"))).toBe(true);
  });

  it("includes gateway reference in both kinds", () => {
    const queryLines = credentialsGatewayRecoveryFailureLines("query");
    const reachLines = credentialsGatewayRecoveryFailureLines("reach");
    for (const line of [...queryLines, ...reachLines]) {
      expect(line).toMatch(/gateway|openshell|onboard/i);
    }
  });
});

describe("recoverGatewayOrExit", () => {
  it("returns true when recovery succeeds", async () => {
    const result = await recoverGatewayOrExit("query", () => { });
    expect(result).toBe(true);
  });

  it("does not call reportFailure when recovery succeeds", async () => {
    const reportFailure = vi.fn();
    await recoverGatewayOrExit("query", reportFailure);
    expect(reportFailure).not.toHaveBeenCalled();
  });
});
