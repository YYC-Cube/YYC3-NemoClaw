// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it, vi } from "vitest";

vi.mock("../cli/branding", () => ({
  AGENT_PRODUCT_NAME: "OpenClaw",
  CLI_DISPLAY_NAME: "NemoClaw",
  CLI_NAME: "nemoclaw",
}));

vi.mock("../cli/command-registry", () => ({
  brandedPublicText: vi.fn((text: string) => text),
  commandsByGroup: vi.fn(() => []),
  visibleCommands: vi.fn(() => []),
}));

vi.mock("../cli/oclif-metadata", () => ({
  getRegisteredOclifCommandSummary: vi.fn(() => null),
}));

vi.mock("../core/version", () => ({
  getVersion: vi.fn(() => "0.1.0-test"),
}));

vi.mock("../i18n", () => ({
  t: vi.fn((key: string) => key),
  tGroup: vi.fn((key: string) => key),
}));

describe("version", () => {
  it("prints version to console", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const mod = await import("./root-help");
    mod.version();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("v0.1.0-test"));
    spy.mockRestore();
  });
});

describe("help", () => {
  it("prints help output to console", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const mod = await import("./root-help");
    mod.help();
    expect(spy).toHaveBeenCalled();
    const output = spy.mock.calls[0][0];
    expect(output).toContain("NemoClaw");
    expect(output).toContain("v0.1.0-test");
    spy.mockRestore();
  });
});
