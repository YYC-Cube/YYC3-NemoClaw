// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

// Mock ALL dependencies that could touch runner.ts CJS require chain
vi.mock("../state/registry", () => ({
  listSandboxes: vi.fn(() => ({ sandboxes: [] })),
}));

vi.mock("../sandbox/version", () => ({
  checkAgentVersion: vi.fn(() => ({ version: "0.1.0", needsUpgrade: false })),
}));

vi.mock("./sandbox/rebuild", () => ({
  rebuildSandbox: vi.fn(),
}));

vi.mock("../cli/branding", () => ({ CLI_NAME: "nemoclaw" }));

vi.mock("../adapters/openshell/gateway-drift", () => ({
  detectOpenShellStateRpcPreflightIssue: vi.fn(() => null),
  detectOpenShellStateRpcResultIssue: vi.fn(() => null),
  printOpenShellStateRpcIssue: vi.fn(),
}));

vi.mock("../domain/lifecycle/options", () => ({
  normalizeUpgradeSandboxesOptions: vi.fn((opts: unknown) =>
    typeof opts === "object" && !Array.isArray(opts) ? opts : {},
  ),
}));

vi.mock("../domain/maintenance/upgrade", () => ({
  classifyUpgradeableSandboxes: vi.fn(() => ({ stale: [], unknown: [] })),
  shouldSkipUpgradeConfirmation: vi.fn(() => false),
  splitRebuildableSandboxes: vi.fn(() => ({ rebuildable: [], stopped: [] })),
}));

vi.mock("../openshell-sandbox-list", () => ({
  captureSandboxListWithGatewayRecovery: vi.fn(() => ({
    result: { status: 0, output: "" },
  })),
  printSandboxListFailureWithRecoveryContext: vi.fn(),
}));

vi.mock("../runtime-recovery", () => ({
  parseReadySandboxNames: vi.fn(() => new Set()),
}));

vi.mock("../credentials/store", () => ({
  prompt: vi.fn(),
}));

describe("upgradeSandboxes", () => {
  it("handles empty sandbox registry", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const mod = await import("./upgrade-sandboxes");

    await mod.upgradeSandboxes();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("No sandboxes"));
    logSpy.mockRestore();
  });

  it("accepts --check option", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const mod = await import("./upgrade-sandboxes");

    await mod.upgradeSandboxes({ check: true });

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("No sandboxes"));
    logSpy.mockRestore();
  });
});
