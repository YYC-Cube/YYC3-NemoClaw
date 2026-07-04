// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

const runMock = vi.fn(() => ({ status: 0, stdout: "", stderr: "" }));
const runCaptureMock = vi.fn(() => "");

vi.mock("./run", () => ({
  dockerRun: runMock,
  dockerCapture: runCaptureMock,
}));

describe("docker container helpers", () => {
  it("dockerStop calls docker run stop", async () => {
    const mod = await import("./container");
    mod.dockerStop("my-sandbox");
    expect(runMock).toHaveBeenCalledWith(["stop", "my-sandbox"], {});
  });

  it("dockerLogs returns combined stdout/stderr", async () => {
    runMock.mockReturnValueOnce({
      status: 0,
      stdout: "stdout line\n",
      stderr: "stderr line\n",
    });
    const mod = await import("./container");
    const result = mod.dockerLogs("my-sandbox");
    expect(result).toContain("stdout line");
    expect(result).toContain("stderr line");
  });

  it("dockerRm calls docker run rm", async () => {
    const mod = await import("./container");
    mod.dockerRm("my-sandbox");
    expect(runMock).toHaveBeenCalledWith(["rm", "my-sandbox"], {});
  });

  it("dockerForceRm adds -f flag", async () => {
    const mod = await import("./container");
    mod.dockerForceRm("my-sandbox");
    expect(runMock).toHaveBeenCalledWith(["rm", "-f", "my-sandbox"], {});
  });

  it("dockerRename passes old and new names", async () => {
    const mod = await import("./container");
    mod.dockerRename("old-name", "new-name");
    expect(runMock).toHaveBeenCalledWith(
      ["rename", "old-name", "new-name"],
      {},
    );
  });

  it("dockerRunDetached prepends run -d", async () => {
    const mod = await import("./container");
    mod.dockerRunDetached(["--name", "test", "nginx"]);
    expect(runMock).toHaveBeenCalledWith(
      ["run", "-d", "--name", "test", "nginx"],
      {},
    );
  });

  it("dockerPort captures port mapping", async () => {
    const mod = await import("./container");
    mod.dockerPort("my-sandbox", "8080");
    expect(runCaptureMock).toHaveBeenCalledWith(
      ["port", "my-sandbox", "8080"],
      {},
    );
  });

  it("dockerExecArgv builds docker exec argv", async () => {
    const mod = await import("./container");
    const result = mod.dockerExecArgv("my-sandbox", ["ls", "-la"]);
    expect(result).toEqual(["docker", "exec", "my-sandbox", "ls", "-la"]);
  });
});
