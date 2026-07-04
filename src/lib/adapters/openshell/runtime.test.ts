// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

// Must mock runner first — runtime.ts imports ../../runner which uses CJS require()
vi.mock("../../runner", () => ({
  ROOT: "/repo/root",
}));

vi.mock("./resolve", () => ({
  resolveOpenshell: vi.fn(() => "/usr/local/bin/openshell"),
}));

vi.mock("./client", () => ({
  runOpenshellCommand: vi.fn(() => ({ status: 0, stdout: "", stderr: "" })),
  captureOpenshellCommand: vi.fn(() => ""),
  captureSandboxSshConfigCommand: vi.fn(() => ({ status: 0, stdout: "", stderr: "" })),
  captureOpenshellCommandAsync: vi.fn(() => Promise.resolve({ stdout: "", stderr: "" })),
  getInstalledOpenshellVersion: vi.fn(() => "0.0.44"),
}));

describe("getOpenshellBinary", () => {
  it("resolves and caches openshell binary", async () => {
    const mod = await import("./runtime");
    const { resolveOpenshell } = await import("./resolve");

    const bin1 = mod.getOpenshellBinary();
    const bin2 = mod.getOpenshellBinary();

    expect(bin1).toBe("/usr/local/bin/openshell");
    expect(bin2).toBe(bin1);
    expect(resolveOpenshell).toHaveBeenCalledTimes(1);
  });
});

describe("runOpenshell", () => {
  it("delegates to runOpenshellCommand", async () => {
    const mod = await import("./runtime");
    const { runOpenshellCommand } = await import("./client");

    mod.runOpenshell(["sandbox", "list"]);

    expect(runOpenshellCommand).toHaveBeenCalledWith(
      "/usr/local/bin/openshell",
      ["sandbox", "list"],
      expect.objectContaining({ cwd: expect.any(String) }),
    );
  });
});

describe("captureOpenshell", () => {
  it("delegates to captureOpenshellCommand", async () => {
    const mod = await import("./runtime");
    const { captureOpenshellCommand } = await import("./client");

    mod.captureOpenshell(["status"]);

    expect(captureOpenshellCommand).toHaveBeenCalledWith(
      "/usr/local/bin/openshell",
      ["status"],
      expect.objectContaining({ cwd: expect.any(String) }),
    );
  });
});

describe("getStatusProbeTimeoutMs", () => {
  it("returns default timeout when env is unset", async () => {
    const mod = await import("./runtime");
    const timeout = mod.getStatusProbeTimeoutMs();
    expect(timeout).toBeGreaterThan(0);
    expect(typeof timeout).toBe("number");
  });
});

describe("isCommandTimeout", () => {
  it("returns true for ETIMEDOUT error", async () => {
    const mod = await import("./runtime");
    const result = mod.isCommandTimeout({
      error: Object.assign(new Error("timed out"), { code: "ETIMEDOUT" }),
    });
    expect(result).toBe(true);
  });

  it("returns false for other errors", async () => {
    const mod = await import("./runtime");
    const result = mod.isCommandTimeout({ error: new Error("other") });
    expect(result).toBe(false);
  });

  it("returns false when no error", async () => {
    const mod = await import("./runtime");
    const result = mod.isCommandTimeout({});
    expect(result).toBe(false);
  });
});

describe("getInstalledOpenshellVersionOrNull", () => {
  it("returns version from client", async () => {
    const mod = await import("./runtime");
    const version = mod.getInstalledOpenshellVersionOrNull();
    expect(version).toBe("0.0.44");
  });
});
