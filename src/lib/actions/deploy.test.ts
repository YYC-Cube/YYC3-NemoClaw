// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

// deploy.ts imports ../runner (CJS require chain) - mock at file level
vi.mock("../runner", () => ({
  ROOT: "/repo/root",
  run: vi.fn(),
  runInteractive: vi.fn(),
  shellQuote: vi.fn((s: string) => s),
  validateName: vi.fn((s: string) => s),
}));

// Mock the heavy deploy implementation
vi.mock("../deploy", () => ({
  executeDeploy: vi.fn(),
}));

describe("runDeployAction", () => {
  it("calls executeDeploy with expected defaults", async () => {
    const mod = await import("./deploy");
    const { executeDeploy } = await import("../deploy");

    await mod.runDeployAction();

    expect(vi.mocked(executeDeploy)).toHaveBeenCalledOnce();
    expect(vi.mocked(executeDeploy).mock.calls[0][0].instanceName).toBeUndefined();
  });

  it("passes instance name through", async () => {
    const mod = await import("./deploy");
    const { executeDeploy } = await import("../deploy");

    await mod.runDeployAction("my-instance");

    const calls = vi.mocked(executeDeploy).mock.calls;
    const lastCall = calls[calls.length - 1];
    expect(lastCall[0].instanceName).toBe("my-instance");
  });
});
