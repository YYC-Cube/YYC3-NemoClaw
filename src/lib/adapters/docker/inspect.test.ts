// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

const runMock = vi.fn(() => ({ status: 0, stdout: "", stderr: "" }));
const runCaptureMock = vi.fn(() => "");

vi.mock("./run", () => ({
  dockerRun: runMock,
  dockerCapture: runCaptureMock,
}));

describe("docker inspect helpers", () => {
  it("dockerInspect inspects arbitrary args", async () => {
    const mod = await import("./inspect");
    mod.dockerInspect(["--type", "image", "my-image"]);
    expect(runMock).toHaveBeenCalledWith(["inspect", "--type", "image", "my-image"], {});
  });

  it("dockerImageInspect inspects an image", async () => {
    const mod = await import("./inspect");
    mod.dockerImageInspect("my-image:latest");
    expect(runMock).toHaveBeenCalledWith(["image", "inspect", "my-image:latest"], {});
  });

  it("dockerImageInspectFormat captures formatted image info", async () => {
    const mod = await import("./inspect");
    mod.dockerImageInspectFormat("{{.Id}}", "my-image");
    expect(runCaptureMock).toHaveBeenCalledWith(
      ["image", "inspect", "--format", "{{.Id}}", "my-image"],
      {},
    );
  });

  it("dockerContainerInspectFormat captures formatted container info", async () => {
    const mod = await import("./inspect");
    mod.dockerContainerInspectFormat("{{.State.Status}}", "my-container");
    expect(runCaptureMock).toHaveBeenCalledWith(
      ["inspect", "--type", "container", "--format", "{{.State.Status}}", "my-container"],
      {},
    );
  });
});
