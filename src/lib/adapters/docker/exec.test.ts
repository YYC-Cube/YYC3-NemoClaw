// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

const execFileSyncMock = vi.fn(() => Buffer.from("ok"));
const spawnSyncMock = vi.fn(() => ({ status: 0, stdout: "", stderr: "" }));
const spawnMock = vi.fn(() => ({ stdout: null, stderr: null }));

vi.mock("node:child_process", () => ({
  execFileSync: execFileSyncMock,
  spawnSync: spawnSyncMock,
  spawn: spawnMock,
}));

describe("docker exec helpers", () => {
  it("dockerExecFileSync runs execFileSync with docker", async () => {
    const mod = await import("./exec");
    mod.dockerExecFileSync(["ps", "-a"]);
    expect(execFileSyncMock).toHaveBeenCalledWith("docker", ["ps", "-a"], {
      encoding: "utf-8",
    });
  });

  it("dockerSpawnSync runs spawnSync with docker", async () => {
    const mod = await import("./exec");
    mod.dockerSpawnSync(["ps"]);
    expect(spawnSyncMock).toHaveBeenCalledWith("docker", ["ps"], {});
  });

  it("dockerSpawn runs spawn with docker", async () => {
    const mod = await import("./exec");
    mod.dockerSpawn(["logs", "-f", "container"]);
    expect(spawnMock).toHaveBeenCalledWith("docker", ["logs", "-f", "container"], {});
  });
});
