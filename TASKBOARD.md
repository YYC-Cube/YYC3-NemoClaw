# NemoClaw 项目优化任务看板

> **目标**：基于深度分析结果，系统化修复隐患、补齐短板、提升质量，将 CLI 质量提升至 Plugin 同等水平。
>
> **基准时间**：2026-07-04（周六）
> **总负责人**：@yanyu（项目 Owner）

---

## 看板状态总览

| 阶段 | 任务数 | 已完成 | 进行中 | 待启动 | 目标完成日期 |
|------|--------|--------|--------|--------|--------------|
| **P0 立即修复**（阻塞） | 3 | 3 | 0 | 0 | 2026-07-04 |
| **P1 短期**（1-2周） | 4 | 0 | 0 | 4 | 2026-07-18 |
| **P2 中期**（1-2月） | 4 | 0 | 0 | 4 | 2026-08-31 |
| **P3 长期**（3-6月） | 4 | 0 | 0 | 4 | 2026-12-31 |

---

## P0 立即修复（阻塞性问题）—— 已完成

> **状态**：已闭环 | **完成日期**：2026-07-04

| # | 任务 | 问题描述 | 修复动作 | 验证方式 |
|---|------|----------|----------|----------|
| P0-1 | Biome schema 版本不匹配 | `biome.json` 声明 `2.4.14`，实际 CLI 为 `2.4.16` | 升级 schema 至 `2.4.16` | `npx biome check` 无 info 警告 |
| P0-2 | 未使用变量 lint 错误 | `scripts/start-i18n-mcp-server.mjs` 中 `FALLBACK_MODEL` 未引用 | 重命名为 `_FALLBACK_MODEL` | `npx biome lint` 零错误 |
| P0-3 | 无效抑制注释 | `src/lib/onboard/child-exit-tracker.test.ts` 中 `biome-ignore` 对未启用规则无效果 | 删除该注释行 | `npx biome lint` 无 warning |
| P0-4 | i18n MCP 脚本格式错误 | 多处数组/对象格式不符合 Biome 100 字符行宽 | `biome format --write` 自动修复 | `npx biome format` 零错误 |

**当前质量基线**：
- `make check` ❌（仍因 `.pre-commit-config.yaml` 缺失而失败）
- `npx @biomejs/biome lint .` ✅ 零错误
- `npx @biomejs/biome format .` ✅ 零错误
- `npx tsc -p tsconfig.cli.json --noEmit` ✅ 零错误

---

## P1 短期（1-2周）—— 目标：2026-07-18

### P1-1 恢复 Git Hooks 体系（高优先级）

| 字段 | 内容 |
|------|------|
| **任务** | 重建 `.pre-commit-config.yaml` 或 `prek.toml`，使 `make check` 恢复可用 |
| **背景** | `make check` 调用 `npx prek run --all-files`，但配置文件缺失导致报错。本地提交前无法自动运行 formatter / linter / 测试。 |
| **前置条件** | 无 |
| **执行步骤** | 1. 在仓库根目录创建 `.pre-commit-config.yaml`（参考历史提交恢复）<br>2. 包含 hooks：file-fixers、formatters、linters、docs-to-skills dry-run、vitest(plugin)<br>3. 运行 `prek install` 注册 hooks<br>4. 验证 `make check` 成功执行 |
| **验收标准** | `make check` 在本地完整通过，无配置缺失报错 |
| **依赖下游** | P1-2、P1-3（hooks 恢复后，后续质量修复才能自动生效） |
| **建议负责人** | 项目 Owner |

### P1-2 修复 Plugin 子项目依赖孤岛

| 字段 | 内容 |
|------|------|
| **任务** | 确保 `nemoclaw/` 子项目依赖在根项目安装时自动就绪 |
| **背景** | `nemoclaw/package.json` 声明 `json5` 等依赖，但 `nemoclaw/node_modules` 为空。运行 `npx vitest run --project plugin` 时 `migration-state.test.ts` 因找不到 `json5` 报错。 |
| **前置条件** | 无 |
| **执行步骤** | 1. 在根 `package.json` 的 `prepare` 脚本中追加 `cd nemoclaw && npm install && npm run build`<br>2. 或调研改为 `pnpm workspaces` 统一管理的可行性（推荐方向）<br>3. 清理后重新执行 `npm install`<br>4. 验证 `npx vitest run --project plugin` 全部 17 个测试文件通过（含 `migration-state.test.ts`） |
| **验收标准** | 从零 clone 后单条 `npm install` 命令即可使 Plugin 测试全绿 |
| **建议负责人** | 项目 Owner |

### P1-3 加固环境敏感型测试的本地兼容性

| 字段 | 内容 |
|------|------|
| **任务** | 降低 `test/sandbox-connect-inference.test.ts` 等集成测试在本地非 CI 环境的失败率 |
| **背景** | 该测试 spawn 真实 CLI 子进程，依赖模拟的 `openshell` 二进制和特定环境变量。在本地 macOS 上 20 个用例全部失败（返回码 1 vs 预期 0），但 CI 中通过。 |
| **前置条件** | P1-2 完成（Plugin 依赖正常） |
| **执行步骤** | 1. 分析 `sandbox-connect-inference.test.ts` 失败的根本原因（是 `bin/nemoclaw.js` 执行失败，还是模拟环境未正确构建）<br>2. 在测试开头增加环境探测：检测 `docker`、`openshell` 模拟二进制是否可用<br>3. 对不可用的环境添加 `it.skip` 或 `describe.skip` 条件，并打印清晰提示<br>4. 检查其他 `test/` 中 spawn 真实进程的测试（如 `onboard.test.ts`、`runner.test.ts`）是否同样存在环境脆性 |
| **验收标准** | 在本地 macOS（无 Docker/Openshell 完整环境）执行 `npx vitest run --project cli` 时，环境敏感测试自动跳过，其余测试正常通过 |
| **建议负责人** | 项目 Owner |

### P1-4 制定 CLI 覆盖率提升计划（阶段一）

| 字段 | 内容 |
|------|------|
| **任务** | 为 CLI 核心模块建立单元测试骨架，将覆盖率从 33% 提升至 50% |
| **背景** | CLI 当前 Lines 33.2%、Functions 29.8%、Branches 23.4%，是项目最大质量缺口。 |
| **前置条件** | P1-1、P1-2 完成 |
| **执行步骤** | 1. 使用 `npx vitest run --coverage` 生成当前覆盖率报告，定位零覆盖文件<br>2. 优先选择以下模块建立单元测试（纯逻辑、无外部依赖）：<br>   - `src/lib/state/onboard-session.ts`（已有测试，补全边界）<br>   - `src/lib/validators/` 目录（如有）<br>   - `src/lib/credentials/` 下的解析/序列化逻辑<br>   - `src/lib/policies/` 下的规则组合逻辑<br>3. 每个新增测试文件遵循 `*.test.ts` 命名，与源码同目录或 `test/` 下<br>4. 更新 `ci/coverage-threshold-cli.json` 将目标 lines 从 33.2 提升至 50 |
| **验收标准** | `ci/coverage-threshold-cli.json` 中 `lines` 字段 ≥ 50，且 `npx vitest run --project cli --coverage` 不触发阈值失败 |
| **建议负责人** | 项目 Owner |

---

## P2 中期（1-2月）—— 目标：2026-08-31

### P2-1 包管理器统一与信号清理

| 字段 | 内容 |
|------|------|
| **任务** | 消除 npm/pnpm 双管理器信号，统一依赖安装流程 |
| **背景** | 根 `package.json` 声明 `packageManager: pnpm@10.8.1`，但仓库同时存在 `package-lock.json`。CI 中 `main.yaml` 使用 pnpm，但 `platform-vitest-main.yaml` 使用 npm。 |
| **执行步骤** | 1. 决策：保留 pnpm 或回退 npm（推荐保留 pnpm，因 `packageManager` 已声明）<br>2. 若保留 pnpm：删除 `package-lock.json`，生成 `pnpm-lock.yaml`，更新所有 CI workflow<br>3. 若保留 npm：移除 `packageManager` 字段，保留 `package-lock.json`，确保 `npm ci` 在所有 workflow 中一致使用<br>4. 将 `nemoclaw/` 纳入 workspace 管理（`pnpm-workspace.yaml` 或 npm workspaces） |
| **验收标准** | 仓库中只存在一种 lock 文件；所有 CI workflow 使用同一种包管理器；单条命令安装根+子项目依赖 |

### P2-2 CLI 核心模块测试补全（阶段二）

| 字段 | 内容 |
|------|------|
| **任务** | 将 CLI 覆盖率从 50% 提升至 65%，重点覆盖 onboard、credentials、runner 模块 |
| **执行步骤** | 1. 对 `src/lib/onboard/` 各子模块（preflight、dockerfile-patch、child-exit-tracker 等）补充边界测试<br>2. 对 `src/lib/credentials/` 增加凭据解析、轮换、暴露检测的单元测试<br>3. 对 `src/lib/runner/` 增加进程状态机、错误分类、恢复逻辑的测试<br>4. 使用 `vi.mock()` 隔离外部依赖（Docker、文件系统、网络）<br>5. 更新 `ci/coverage-threshold-cli.json`：lines 65%、functions 60%、branches 50%、statements 65% |
| **验收标准** | `npx vitest run --project cli --coverage` 通过，所有阈值达标 |

### P2-3 清理归档 CI 工作流

| 字段 | 内容 |
|------|------|
| **任务** | 评审 `.github/workflows/_archived/` 下 29 个废弃 workflow，决定保留或删除 |
| **执行步骤** | 1. 列出 `_archived/` 目录中所有 workflow 文件<br>2. 检查最近 6 个月是否有引用或恢复需求<br>3. 对无恢复价值的 workflow 直接删除（已归档在 Git 历史，可恢复）<br>4. 对有价值的 workflow 迁移至活跃目录或记录到文档 |
| **验收标准** | `_archived/` 目录清空或保留 ≤ 5 个真正有价值的文件；`.github/workflows/` 结构清晰 |

### P2-4 文档格式迁移收尾（MyST → Fern MDX）

| 字段 | 内容 |
|------|------|
| **任务** | 完成 `docs/` 目录从 MyST Markdown 到 Fern MDX 的迁移，消除双格式并存 |
| **执行步骤** | 1. 扫描 `docs/` 中所有 `.md` 文件，确认是否有未迁移的页面<br>2. 对未迁移的页面，使用 `nemoclaw-contributor-update-docs` skill 生成 MDX 版本<br>3. 验证 `npm run docs:strict` 通过（Fern check 无错误）<br>4. 删除已迁移的 `.md` 源文件或移动到 `docs/_legacy/` 并注明废弃<br>5. 更新 `docs/CONTRIBUTING.md` 中的格式说明 |
| **验收标准** | `docs/` 中用户可见页面全部为 `.mdx`；`npm run docs` 零错误；`docs-to-skills` dry-run 通过 |

---

## P3 长期（3-6月）—— 目标：2026-12-31

### P3-1 测试分层架构重构

| 字段 | 内容 |
|------|------|
| **任务** | 建立 Unit → Integration → E2E 三层测试体系，隔离脆性测试 |
| **执行步骤** | 1. 在 `vitest.config.ts` 中明确定义三层 project：<br>   - `cli-unit`：纯单元测试，无外部进程 spawn，< 1s<br>   - `cli-integration`： spawn 子进程、文件系统操作，允许在受限环境跳过<br>   - `e2e-scenario`：现有场景测试<br>   - `e2e-branch`：现有 Brev E2E<br>2. 将 `test/` 中纯逻辑测试标记为 `cli-unit`<br>3. 将 spawn 真实进程的测试归类到 `cli-integration`<br>4. 在 `package.json` 脚本中提供分层运行命令：`npm run test:unit`、`npm run test:integration` |
| **验收标准** | 开发者可在本地 10 秒内完成 `npm run test:unit` 并全绿；CI 中依次运行三层 |

### P3-2 CLI 覆盖率 ratchet 至 70%+

| 字段 | 内容 |
|------|------|
| **任务** | 将 CLI 覆盖率从 65% 提升至 70% 以上，建立质量门禁 |
| **执行步骤** | 1. 持续对 `src/lib/` 中未覆盖的边界分支增加测试<br>2. 对 `bin/` 中的 CommonJS launcher 增加轻量级集成测试<br>3. 更新 `ci/coverage-threshold-cli.json`：lines 70%、functions 70%、branches 60%、statements 70%<br>4. 在 CI 中增加覆盖率下降阻断门（如 Coveralls 或 Codecov 的 PR 评论） |
| **验收标准** | 新 PR 不能降低 CLI 或 Plugin 的覆盖率；`lines` 和 `statements` 均 ≥ 70% |

### P3-3 构建 Docker 沙盒测试环境

| 字段 | 内容 |
|------|------|
| **任务** | 提供统一的可复现测试环境，消除本地与 CI 差异 |
| **执行步骤** | 1. 在 `Dockerfile.test` 中定义预装环境：Node 22、Python 3.11、uv、hadolint、Docker CLI<br>2. 提供 `docker-compose.test.yml` 一键启动测试容器<br>3. 在容器中挂载源码并运行完整测试套件<br>4. 在 CI 中复用同一镜像（推送到 GitHub Container Registry） |
| **验收标准** | 任何开发者执行 `docker compose -f docker-compose.test.yml up` 后，在容器中运行 `npm test` 的结果与 CI 一致 |

### P3-4 `bin/` 和 `scripts/` 的 TypeScript 迁移

| 字段 | 内容 |
|------|------|
| **任务** | 按 `CONTRIBUTING.md` 语言政策，将剩余 JS 文件迁移至 TypeScript |
| **执行步骤** | 1. 统计 `bin/**/*.js` 和 `scripts/**/*.js` 中仍为 JS 的文件（排除必须 CommonJS 的 `bin/nemoclaw.js` 入口）<br>2. 按依赖复杂度排序，先迁移纯工具脚本，后迁移有外部依赖的脚本<br>3. 每个迁移 PR 对应一个脚本文件，确保测试覆盖<br>4. 更新 `tsconfig.cli.json` 的 `include` 以包含新 TS 文件 |
| **验收标准** | `bin/` 和 `scripts/` 中新增 `.ts` 文件数量超过剩余 `.js` 文件；`npm run typecheck:cli` 零错误 |

---

## 执行日历

```
2026-07-04 (周六)  [P0]  Biome 修复、lint/format 闭环 —— 已完成 ✅
2026-07-05 (周日)  [P1-1] 重建 .pre-commit-config.yaml
2026-07-06 (周一)  [P1-2] 修复 nemoclaw 依赖孤岛
2026-07-07 (周二)  [P1-3] 加固环境敏感测试本地兼容性
2026-07-08-11      [P1-4] CLI 覆盖率阶段一（33% → 50%）
2026-07-18 (周六)  [P1]  里程碑：短期目标达成，make check 全绿

2026-07-19-31      [P2-1] 包管理器统一
2026-08-01-15      [P2-2] CLI 覆盖率阶段二（50% → 65%）
2026-08-16-22      [P2-3] 清理归档 CI workflow
2026-08-23-31      [P2-4] 文档迁移收尾
2026-08-31 (周一)  [P2]  里程碑：中期目标达成，质量基线稳固

2026-09-01-30      [P3-1] 测试分层架构
2026-10-01-31      [P3-2] CLI 覆盖率 70%+ / 质量门禁
2026-11-01-30      [P3-3] Docker 沙盒测试环境
2026-12-01-31      [P3-4] JS → TS 迁移
2026-12-31 (周四)  [P3]  里程碑：长期目标达成，CLI/Plugin 质量对等
```

---

## 依赖关系图

```
P0 (已完成)
  │
  ▼
P1-1 ──┬──► P1-2 ──┬──► P1-3
       │           │
       └───────────┴──► P1-4 ──┐
                              │
P2-1 ◄────────────────────────┘
  │
  ▼
P2-2 ──► P2-3 ──► P2-4
  │
  ▼
P3-1 ──► P3-2 ──► P3-3 ──► P3-4
```

> **说明**：P1-1 是 P1 阶段所有后续任务的前置（hooks 恢复后才能保证质量自动化）。P1-4 与 P2-1 有交叉：覆盖率提升过程中发现的包管理问题应同步解决。P2-2 是 P3-2 的前置（必须先有 65% 基础，才能 ratchet 到 70%）。

---

## 质量门禁检查清单

每个任务完成后，必须验证以下门禁：

- [ ] `npx @biomejs/biome lint .` 零错误
- [ ] `npx @biomejs/biome format .` 零错误
- [ ] `npx tsc -p tsconfig.cli.json --noEmit` 零错误
- [ ] `npx vitest run --project plugin` 全绿（如有 Plugin 代码变更）
- [ ] 相关测试文件已更新或新增（代码变更必须带测试）
- [ ] 文档已更新（用户可见变更必须带文档）
- [ ] 提交信息符合 Conventional Commits 规范
- [ ] DCO Signed-off-by 已添加

---

## 附录：当前已知问题清单

| 编号 | 问题 | 影响范围 | 关联任务 | 优先级 |
|------|------|----------|----------|--------|
| 1 | `.pre-commit-config.yaml` 缺失 | 本地提交质量 | P1-1 | 🔴 高 |
| 2 | `nemoclaw` 依赖未自动安装 | Plugin 测试 | P1-2 | 🔴 高 |
| 3 | `sandbox-connect-inference` 本地全失败 | 开发者体验 | P1-3 | 🟡 中 |
| 4 | CLI 覆盖率 33%（Lines） | 质量风险 | P1-4/P2-2 | 🟡 中 |
| 5 | npm/pnpm 双管理器并存 | 构建一致性 | P2-1 | 🟡 中 |
| 6 | 29 个归档 workflow 占用 | 维护负担 | P2-3 | 🟢 低 |
| 7 | docs/ 双格式（MD+MDX）并存 | 文档维护 | P2-4 | 🟢 低 |
| 8 | 测试无分层，环境脆性集中 | 开发者体验 | P3-1 | 🟢 低 |
| 9 | 无 Docker 统一测试环境 | 环境一致性 | P3-3 | 🟢 低 |
| 10 | `bin/`/`scripts/` 仍有 JS | 类型安全 | P3-4 | 🟢 低 |

---

> **最后更新**：2026-07-04 12:24
> **下一个动作**：执行 P1-1（重建 `.pre-commit-config.yaml`），使 `make check` 恢复工作。
