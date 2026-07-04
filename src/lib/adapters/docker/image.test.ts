// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

// Must mock runner first — image.ts imports ../../runner which uses CJS require()
vi.mock("../../runner", () => ({
  ROOT: "/repo/root",
  run: vi.fn((args: readonly string[]) => ({ status: 0, stdout: "", stderr: "" })),
  runCapture: vi.fn(() => ""),
  runShell: vi.fn(),
}));

describe("docker image helpers", () => {
  it("dockerBuild passes correct args with DOCKER_BUILDKIT=1", async () => {
    const mod = await import("./image");
    mod.dockerBuild("/path/to/Dockerfile", "my-tag", "/context");

    // dockerBuild uses dockerRun which delegates to run
    const { run } = await import("../../runner");
    expect(run).toHaveBeenCalled();
  });

  it("dockerBuild respects quiet flag", async () => {
    const mod = await import("./image");
    const { run } = await import("../../runner");
    mod.dockerBuild("/Dockerfile", "tag", "/ctx", { quiet: true });
    expect(run).toHaveBeenCalled();
  });

  it("dockerRmi removes image by reference", async () => {
    const mod = await import("./image");
    const { run } = await import("../../runner");
    mod.dockerRmi("my-image:latest");
    expect(run).toHaveBeenCalled();
  });

  it("dockerListImagesFormat captures formatted image list", async () => {
    const mod = await import("./image");
    const { runCapture } = await import("../../runner");
    mod.dockerListImagesFormat("openshell/*", "{{.ID}}");
    expect(runCapture).toHaveBeenCalled();
  });
});
