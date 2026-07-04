// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

const runMock = vi.fn(() => ({ status: 0, stdout: "", stderr: "" }));
const runCaptureMock = vi.fn(() => "");

vi.mock("./run", () => ({
  dockerRun: runMock,
  dockerCapture: runCaptureMock,
}));

describe("docker volume helpers", () => {
  it("dockerListVolumesByPrefix queries volumes by prefix", async () => {
    runCaptureMock.mockReturnValueOnce("vol-abc\nvol-def\n");
    const mod = await import("./volume");

    const result = mod.dockerListVolumesByPrefix("vol-");

    expect(runCaptureMock).toHaveBeenCalledWith(
      ["volume", "ls", "-q", "--filter", "name=vol-"],
      { ignoreError: true },
    );
    expect(result).toEqual(["vol-abc", "vol-def"]);
  });

  it("dockerRemoveVolumes returns null for empty array", async () => {
    const mod = await import("./volume");
    const result = mod.dockerRemoveVolumes([]);
    expect(result).toBeNull();
  });

  it("dockerRemoveVolumes removes named volumes", async () => {
    const mod = await import("./volume");
    mod.dockerRemoveVolumes(["vol-abc", "vol-def"]);
    expect(runMock).toHaveBeenCalledWith(
      ["volume", "rm", "vol-abc", "vol-def"],
      {},
    );
  });

  it("dockerRemoveVolumesByPrefix lists then removes", async () => {
    runCaptureMock.mockReturnValueOnce("vol-a\nvol-b\nvol-c");
    const mod = await import("./volume");

    const result = mod.dockerRemoveVolumesByPrefix("vol-");

    expect(runCaptureMock).toHaveBeenCalledWith(
      ["volume", "ls", "-q", "--filter", "name=vol-"],
      { ignoreError: undefined },
    );
    expect(runMock).toHaveBeenCalledWith(
      ["volume", "rm", "vol-a", "vol-b", "vol-c"],
      {},
    );
    expect(result).toEqual(["vol-a", "vol-b", "vol-c"]);
  });

  it("dockerRemoveVolumesByPrefix handles empty list", async () => {
    runCaptureMock.mockReturnValueOnce("");
    const mod = await import("./volume");

    const result = mod.dockerRemoveVolumesByPrefix("vol-");

    expect(result).toEqual([]);
  });

  it("dockerListVolumesByPrefix throws on empty prefix", async () => {
    const mod = await import("./volume");
    expect(() => mod.dockerListVolumesByPrefix("")).toThrow("prefix");
  });
});
