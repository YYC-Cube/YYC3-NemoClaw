// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

const spawnSyncMock = vi.fn(() => ({
  status: 0,
  stdout: "",
  stderr: "",
}));

vi.mock("./exec", () => ({
  dockerSpawnSync: spawnSyncMock,
}));

describe("dockerLoginPasswordStdin", () => {
  it("logs into registry with password stdin", async () => {
    const mod = await import("./login");
    mod.dockerLoginPasswordStdin("registry.example.com", "myuser", "secret123");

    expect(spawnSyncMock).toHaveBeenCalledWith(
      ["login", "registry.example.com", "-u", "myuser", "--password-stdin"],
      {
        input: "secret123",
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      },
    );
  });
});
