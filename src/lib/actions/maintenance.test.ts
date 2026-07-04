// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

// Mock EVERY module that maintenance.ts imports. The ../adapters/docker barrel
// re-exports from ./run.ts → ../../runner which uses CJS require("./platform")
// that vitest can't resolve at transform time. By mocking every direct import,
// we prevent vitest from following the barrel chain.
const dockerListImagesFormatMock = vi.fn(() => "");
const dockerRmiMock = vi.fn(() => ({ status: 0, stdout: "", stderr: "" }));

// Mock the adapter module directly — vitest won't need to resolve the barrel
vi.mock("../adapters/docker", () => ({
  dockerListImagesFormat: dockerListImagesFormatMock,
  dockerRmi: dockerRmiMock,
}));

vi.mock("../adapters/openshell/gateway-drift", () => ({
  detectOpenShellStateRpcPreflightIssue: vi.fn(() => null),
  detectOpenShellStateRpcResultIssue: vi.fn(() => null),
  printOpenShellStateRpcIssue: vi.fn(),
}));

vi.mock("../cli/branding", () => ({ CLI_NAME: "nemoclaw" }));

vi.mock("../credentials/store", () => ({
  prompt: vi.fn(() => ""),
}));

vi.mock("../domain/lifecycle/options", () => ({
  normalizeGarbageCollectImagesOptions: vi.fn((opts: unknown) =>
    typeof opts === "object" && !Array.isArray(opts) ? opts : {},
  ),
  normalizeUpgradeSandboxesOptions: vi.fn(),
}));

vi.mock("../domain/maintenance/images", () => ({
  findOrphanedSandboxImages: vi.fn(() => []),
  parseSandboxImageRows: vi.fn(() => []),
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

vi.mock("../state/registry", () => ({
  listSandboxes: vi.fn(() => ({ sandboxes: [] })),
}));

vi.mock("../state/sandbox", () => ({
  backupSandboxState: vi.fn(() => ({
    success: false,
    backedUpDirs: [],
    backedUpFiles: [],
    failedDirs: [],
    failedFiles: [],
  })),
}));

describe("backupAll", () => {
  it("handles empty sandbox registry", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => { });
    const mod = await import("./maintenance");

    await mod.backupAll();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("No sandboxes registered"));
    logSpy.mockRestore();
  });
});

describe("garbageCollectImages", () => {
  it("is a valid async function", async () => {
    const mod = await import("./maintenance");
    expect(typeof mod.garbageCollectImages).toBe("function");
  });
});
