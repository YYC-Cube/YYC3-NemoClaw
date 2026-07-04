// 菜单栏视图 — 状态指示 + 快捷操作

import SwiftUI

struct MenuBarView: View {
    @Binding var appState: AppState

    var body: some View {
        // ── 状态头部 ──
        VStack(alignment: .leading, spacing: 0) {
            HStack {
                Image(systemName: "cube.box")
                    .foregroundColor(.accentColor)
                Text("YYC³ NemoClaw")
                    .font(.headline)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)

            Divider()

            // ── 状态指示 ──
            StatusRow(
                icon: "circle.fill",
                label: "沙箱状态",
                value: appState.sandboxStatus.rawValue,
                color: appState.sandboxStatus.color
            )
            if !appState.gatewayVersion.isEmpty {
                StatusRow(icon: "info.circle", label: "Gateway", value: appState.gatewayVersion, color: .secondary)
            }
            if !appState.modelName.isEmpty {
                StatusRow(icon: "brain", label: "模型", value: appState.modelName, color: .secondary)
            }

            Divider()

            // ── 操作按钮 ──
            Button {
                NSWorkspace.shared.open(URL(string: appState.dashboardURL)!)
            } label: {
                Label("打开 Dashboard", systemImage: "globe")
            }
            .keyboardShortcut("d")

            Button {
                appState.fetchDashboardToken()
                NSWorkspace.shared.open(URL(string: "\(appState.dashboardURL)/#token=\(appState.dashboardToken)")!)
            } label: {
                Label("Dashboard (已认证)", systemImage: "person.fill.checkmark")
            }

            Divider()

            Button {
                Task { await appState.refreshStatus() }
            } label: {
                Label("刷新状态", systemImage: "arrow.clockwise")
            }
            .keyboardShortcut("r")

            Button {
                _ = appState.toggleTunnel()
                Task { await appState.refreshStatus() }
            } label: {
                Label(
                    appState.sshTunnelPID > 0 ? "关闭 SSH 隧道" : "开启 SSH 隧道",
                    systemImage: appState.sshTunnelPID > 0 ? "lock.slash" : "lock"
                )
            }

            Divider()

            Button {
                NSApplication.shared.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
            } label: {
                Label("设置", systemImage: "gearshape")
            }

            Divider()

            Button("退出") {
                if appState.sshTunnelPID > 0 { kill(appState.sshTunnelPID, SIGTERM) }
                NSApplication.shared.terminate(nil)
            }
            .keyboardShortcut("q")

            // ── 版本脚注 ──
            Text("v0.1.0 · YYC³ Team")
                .font(.caption2)
                .foregroundColor(.secondary)
                .frame(maxWidth: .infinity, alignment: .center)
                .padding(.top, 4)
        }
        .padding(.vertical, 4)
        .onAppear {
            Task { await appState.refreshStatus() }
            appState.fetchDashboardToken()
        }
    }
}

// MARK: - 状态行组件

struct StatusRow: View {
    let icon: String
    let label: String
    let value: String
    let color: Color

    var body: some View {
        HStack(spacing: 6) {
            Image(systemName: icon)
                .font(.system(size: 8))
                .foregroundColor(color)
                .frame(width: 12)
            Text(label)
                .font(.caption)
                .foregroundColor(.secondary)
            Spacer()
            Text(value)
                .font(.caption)
                .foregroundColor(.primary)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 2)
    }
}
