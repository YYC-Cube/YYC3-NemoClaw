// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

vi.mock("../../runner", () => ({
  run: vi.fn((args: readonly string[]) => ({ status: 0, stdout: "", stderr: "" })),
  runCapture: vi.fn((args: readonly string[]) => ""),
}));

describe("dockerArgv", () => {
  it("prepends docker to args", async () => {
    const mod = await import("./run");
    expect(mod.dockerArgv(["ps", "-a"])).toEqual(["docker", "ps", "-a"]);
  });

  it("handles empty args", async () => {
    const mod = await import("./run");
    expect(mod.dockerArgv([])).toEqual(["docker"]);
  });
});

describe("dockerRun", () => {
  it("delegates to runner.run with docker prefix", async () => {
    const mod = await import("./run");
    const { run } = await import("../../runner");

    mod.dockerRun(["ps"], { suppressOutput: true });

    expect(run).toHaveBeenCalledWith(["docker", "ps"], { suppressOutput: true });
  });
});

describe("dockerCapture", () => {
  it("delegates to runner.runCapture with docker prefix", async () => {
    const mod = await import("./run");
    const { runCapture } = await import("../../runner");

    mod.dockerCapture(["images", "-q"], { ignoreError: true });

    expect(runCapture).toHaveBeenCalledWith(["docker", "images", "-q"], { ignoreError: true });
  });
});
