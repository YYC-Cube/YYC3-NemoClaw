// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { AGENT_PRODUCT_NAME, CLI_DISPLAY_NAME, CLI_NAME } from "../cli/branding";
import {
  brandedPublicText,
  commandsByGroup,
  visibleCommands,
  type CommandDef,
} from "../cli/command-registry";
import { getRegisteredOclifCommandSummary } from "../cli/oclif-metadata";
import { getVersion } from "../core/version";
import { t, tGroup } from "../i18n";

const useColor = !process.env.NO_COLOR && !!process.stdout.isTTY;
const trueColor =
  useColor && (process.env.COLORTERM === "truecolor" || process.env.COLORTERM === "24bit");
const G = useColor ? (trueColor ? "\x1b[38;2;118;185;0m" : "\x1b[38;5;148m") : "";
const B = useColor ? "\x1b[1m" : "";
const D = useColor ? "\x1b[2m" : "";
const R = useColor ? "\x1b[0m" : "";

function hasDisplaySpecificDescription(command: CommandDef): boolean {
  const sameCommandId = visibleCommands().filter((entry) => entry.commandId === command.commandId);
  return new Set(sameCommandId.map((entry) => entry.description)).size > 1;
}

function getDisplayDescription(command: CommandDef): string {
  if (hasDisplaySpecificDescription(command)) {
    return command.description;
  }
  return brandedPublicText(getRegisteredOclifCommandSummary(command.commandId) ?? command.description);
}

export function version(): void {
  console.log(`${CLI_NAME} v${getVersion()}`);
}

/** Print CLI usage with all commands, flags, and reconfiguration guidance. */
export function help(): void {
  const PAD = 38; // column width for usage strings before description
  const grouped = commandsByGroup();
  const lines = [];

  lines.push("");
  lines.push(`  ${B}${G}${CLI_DISPLAY_NAME}${R}  ${D}v${getVersion()}${R}`);
  lines.push(`  ${D}${t("brand.tagline")}${R}`);

  for (const [group, cmds] of grouped) {
    lines.push("");
    lines.push(`  ${G}${tGroup(group)}:${R}`);

    let isFirstInGroup = true;
    for (const cmd of cmds) {
      const usage = cmd.usage;
      const desc = getDisplayDescription(cmd);
      const flags = cmd.flags ? ` ${D}${cmd.flags}${R}` : "";

      const prefix = isFirstInGroup ? B : "";
      const suffix = isFirstInGroup ? R : "";
      const dPrefix = cmd.deprecated ? D : "";
      const dSuffix = cmd.deprecated ? R : "";

      const displayUsage = `${dPrefix}${prefix}${usage}${suffix}${dSuffix}`;
      const displayDesc = cmd.deprecated ? `${D}${desc}${R}` : desc;
      const padding = Math.max(1, PAD - usage.length);
      lines.push(`    ${displayUsage}${" ".repeat(padding)}${displayDesc}${flags}`);

      isFirstInGroup = false;
    }
  }

  lines.push("");
  lines.push(`  ${G}${t("help.uninstallFlags")}:${R}`);
  lines.push(`    --yes${" ".repeat(29)}${t("common.skip")}`);
  lines.push(`    --keep-openshell${" ".repeat(18)}Leave the openshell binary installed`);
  lines.push(`    --delete-models${" ".repeat(19)}Remove ${CLI_DISPLAY_NAME}-pulled Ollama models`);

  lines.push("");
  lines.push(`  ${G}${t("help.reconfigure")}:${R}`);
  lines.push(
    `    ${D}• ${t("help.checkInference")}:   ${CLI_NAME} inference get${R}`,
    `    ${D}• ${t("help.changeModel")}:  ${CLI_NAME} inference set --model <model> --provider <provider>${R}`,
  );
  lines.push(`    ${D}• ${t("help.addNetworkPresets")}:     use the policy-add command on your sandbox${R}`);
  lines.push(
    `    ${D}• ${t("help.changeCredentials")}:      credentials reset <PROVIDER>, then re-run onboard${R}`,
  );
  lines.push(
    `    ${D}• ${t("help.agentConfigNote", { product: AGENT_PRODUCT_NAME })}${R}`,
  );
  lines.push(
    `    ${D}  ${t("help.durableSettings", { product: AGENT_PRODUCT_NAME })}${R}`,
  );
  lines.push(
    `    ${D}  ${t("help.lockConfig", { cli: CLI_NAME })}${R}`,
  );

  lines.push("");
  lines.push(`  ${D}${t("brand.poweredBy")}`);
  lines.push(`  ${t("brand.credentialsNote")}${R}`);
  lines.push(`  ${D}${t("brand.website")}${R}`);
  lines.push("");

  console.log(lines.join("\n"));
}
