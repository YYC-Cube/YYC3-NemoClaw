// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// Store known credential env keys so tests can verify save/load/list round-trips
const CREDENTIAL_ENV_KEYS = [
  "NVIDIA_API_KEY",
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "GEMINI_API_KEY",
  "BRAVE_API_KEY",
  "GITHUB_TOKEN",
  "HF_TOKEN",
  "TELEGRAM_BOT_TOKEN",
  "DISCORD_BOT_TOKEN",
  "SLACK_BOT_TOKEN",
  "SLACK_APP_TOKEN",
  "WECHAT_BOT_TOKEN",
] as const;

describe("normalizeCredentialValue", () => {
  let normalizeCredentialValue: (value: string | null | undefined) => string;

  beforeAll(async () => {
    const mod = await import("./store");
    normalizeCredentialValue = mod.normalizeCredentialValue;
  });

  it("trims whitespace", () => {
    expect(normalizeCredentialValue("  abc  ")).toBe("abc");
  });

  it("strips CR characters", () => {
    expect(normalizeCredentialValue("abc\r\n")).toBe("abc");
  });

  it("returns empty string for null", () => {
    expect(normalizeCredentialValue(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(normalizeCredentialValue(undefined)).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(normalizeCredentialValue("")).toBe("");
  });

  it("preserves internal spaces", () => {
    expect(normalizeCredentialValue("a b c")).toBe("a b c");
  });
});

describe("getCredentialPromptIntent", () => {
  let getCredentialPromptIntent: (value: string | null | undefined) => { kind: string; value?: string };

  beforeAll(async () => {
    const mod = await import("./store");
    getCredentialPromptIntent = mod.getCredentialPromptIntent;
  });

  it("returns credential kind for a normal value", () => {
    const result = getCredentialPromptIntent("sk-abc123");
    expect(result.kind).toBe("credential");
    if (result.kind === "credential") {
      expect(result.value).toBe("sk-abc123");
    }
  });

  it("returns back intent for 'back'", () => {
    expect(getCredentialPromptIntent("back").kind).toBe("back");
  });

  it("returns exit intent for 'exit'", () => {
    expect(getCredentialPromptIntent("exit").kind).toBe("exit");
  });

  it("returns exit intent for 'quit'", () => {
    expect(getCredentialPromptIntent("quit").kind).toBe("exit");
  });

  it("returns help intent for '?'", () => {
    expect(getCredentialPromptIntent("?").kind).toBe("help");
  });

  it("returns help intent for 'help'", () => {
    expect(getCredentialPromptIntent("help").kind).toBe("help");
  });

  it("is case-insensitive for navigation commands", () => {
    expect(getCredentialPromptIntent("EXIT").kind).toBe("exit");
    expect(getCredentialPromptIntent("Quit").kind).toBe("exit");
    expect(getCredentialPromptIntent("BACK").kind).toBe("back");
  });

  it("normalizes value before checking navigation commands", () => {
    expect(getCredentialPromptIntent("  exit  ").kind).toBe("exit");
  });
});

describe("resolveHomeDir", () => {
  let resolveHomeDir: () => string;
  const origHome = process.env.HOME;

  beforeAll(async () => {
    const mod = await import("./store");
    resolveHomeDir = mod.resolveHomeDir;
  });

  afterEach(() => {
    process.env.HOME = origHome;
  });

  it("resolves HOME from environment", () => {
    const home = resolveHomeDir();
    expect(home).toBeTruthy();
    expect(path.isAbsolute(home)).toBe(true);
  });

  it("throws when HOME is set to unsafe path /tmp", () => {
    process.env.HOME = "/tmp";
    expect(() => resolveHomeDir()).toThrow();
  });

  it("throws for unsafe paths like /dev/shm", () => {
    process.env.HOME = "/dev/shm";
    expect(() => resolveHomeDir()).toThrow();
  });

  it("resolves relative paths to absolute", () => {
    process.env.HOME = "/tmp/../home/user";
    const home = resolveHomeDir();
    expect(home).toBe("/home/user");
  });
});

describe("getCredsDir", () => {
  let getCredsDir: () => string;
  const origHome = process.env.HOME;

  beforeAll(async () => {
    const mod = await import("./store");
    getCredsDir = mod.getCredsDir;
  });

  afterEach(() => {
    process.env.HOME = origHome;
  });

  it("returns .nemoclaw under home directory", () => {
    process.env.HOME = "/home/test-user";
    const dir = getCredsDir();
    expect(dir).toMatch(/\/\.nemoclaw$/);
  });

  it("uses home resolved from environment", () => {
    const dir = getCredsDir();
    expect(dir).toBeTruthy();
  });
});

describe("saveCredential / getCredential / deleteCredential", () => {
  let saveCredential: (key: string, value: string | null | undefined) => void;
  let getCredential: (key: string) => string | null;
  let deleteCredential: (key: string) => boolean;

  beforeAll(async () => {
    const mod = await import("./store");
    saveCredential = mod.saveCredential;
    getCredential = mod.getCredential;
    deleteCredential = mod.deleteCredential;
  });

  afterEach(() => {
    for (const key of CREDENTIAL_ENV_KEYS) {
      delete process.env[key];
    }
  });

  it("saves and retrieves a credential", () => {
    saveCredential("NVIDIA_API_KEY", "nv-secret-123");
    expect(getCredential("NVIDIA_API_KEY")).toBe("nv-secret-123");
  });

  it("returns null for unset credential", () => {
    expect(getCredential("NONEXISTENT_KEY")).toBeNull();
  });

  it("normalizes whitespace on save", () => {
    saveCredential("OPENAI_API_KEY", "  sk-abc  ");
    expect(getCredential("OPENAI_API_KEY")).toBe("sk-abc");
  });

  it("deletes credential when value is empty", () => {
    process.env.ANTHROPIC_API_KEY = "sk-ant-123";
    saveCredential("ANTHROPIC_API_KEY", "");
    expect(getCredential("ANTHROPIC_API_KEY")).toBeNull();
  });

  it("deleteCredential returns true when key existed", () => {
    process.env.GEMINI_API_KEY = "test-value";
    const result = deleteCredential("GEMINI_API_KEY");
    expect(result).toBe(true);
    expect("GEMINI_API_KEY" in process.env).toBe(false);
  });

  it("deleteCredential returns false when key did not exist", () => {
    const result = deleteCredential("NONEXISTENT_KEY");
    expect(result).toBe(false);
  });
});

describe("loadCredentials / listCredentialKeys", () => {
  let loadCredentials: () => Record<string, string>;
  let listCredentialKeys: () => string[];

  beforeAll(async () => {
    const mod = await import("./store");
    loadCredentials = mod.loadCredentials;
    listCredentialKeys = mod.listCredentialKeys;
  });

  afterEach(() => {
    for (const key of CREDENTIAL_ENV_KEYS) {
      delete process.env[key];
    }
  });

  it("returns empty object when no credentials are set", () => {
    expect(loadCredentials()).toEqual({});
  });

  it("returns only known credential keys", () => {
    process.env.NVIDIA_API_KEY = "nv-test";
    process.env.ANTHROPIC_API_KEY = "ant-test";
    process.env.SOME_UNKNOWN_VAR = "should-not-appear";

    const creds = loadCredentials();
    expect(creds.NVIDIA_API_KEY).toBe("nv-test");
    expect(creds.ANTHROPIC_API_KEY).toBe("ant-test");
    expect(creds).not.toHaveProperty("SOME_UNKNOWN_VAR");
  });

  it("listCredentialKeys returns sorted keys", () => {
    process.env.Z_LAST_KEY = "z-val";
    process.env.A_FIRST_KEY = "a-val";

    // Prefix with NEMOCLAW_ to match known env keys
    process.env.BRAVE_API_KEY = "test";

    const keys = listCredentialKeys();
    expect(keys).toEqual(["BRAVE_API_KEY"]);
  });
});

describe("resolveProviderCredential", () => {
  let resolveProviderCredential: (envName: string) => string | null;
  const origKeys: Record<string, string | undefined> = {};

  beforeAll(async () => {
    const mod = await import("./store");
    resolveProviderCredential = mod.resolveProviderCredential;
  });

  afterEach(() => {
    for (const key of Object.keys(origKeys)) {
      if (origKeys[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = origKeys[key]!;
      }
    }
  });

  it("returns value from process.env when set", () => {
    process.env.NVIDIA_API_KEY = "nv-direct";
    expect(resolveProviderCredential("NVIDIA_API_KEY")).toBe("nv-direct");
  });
});

describe("KNOWN_CREDENTIAL_ENV_KEYS", () => {
  let KNOWN_CREDENTIAL_ENV_KEYS: readonly string[];

  beforeAll(async () => {
    const mod = await import("./store");
    KNOWN_CREDENTIAL_ENV_KEYS = mod.KNOWN_CREDENTIAL_ENV_KEYS;
  });

  it("includes all major provider keys", () => {
    expect(KNOWN_CREDENTIAL_ENV_KEYS).toContain("NVIDIA_API_KEY");
    expect(KNOWN_CREDENTIAL_ENV_KEYS).toContain("OPENAI_API_KEY");
    expect(KNOWN_CREDENTIAL_ENV_KEYS).toContain("ANTHROPIC_API_KEY");
    expect(KNOWN_CREDENTIAL_ENV_KEYS).toContain("GITHUB_TOKEN");
    expect(KNOWN_CREDENTIAL_ENV_KEYS).toContain("BRAVE_API_KEY");
    expect(KNOWN_CREDENTIAL_ENV_KEYS).toContain("SLACK_BOT_TOKEN");
  });

  it("does not contain duplicates", () => {
    const unique = new Set(KNOWN_CREDENTIAL_ENV_KEYS);
    expect(unique.size).toBe(KNOWN_CREDENTIAL_ENV_KEYS.length);
  });
});
