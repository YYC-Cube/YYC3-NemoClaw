// NemoClaw — macOS 菜单栏 App
//
// 入口：@main App 结构体
// 架构：MenuBarExtra + Settings + 多个 WindowGroup

import SwiftUI
import ServiceManagement

@main
struct NemoClawApp: App {
    @State private var appState = AppState()

    var body: some Scene {
        // ── 菜单栏图标 ─────────────────────────────────
        MenuBarExtra {
            MenuBarView(appState: $appState)
        } label: {
            let icon = appState.isConnected ? "icloud.fill" : "icloud.slash"
            Image(systemName: icon)
                .symbolEffect(.pulse, value: appState.isConnected)
        }

        // ── Dashboard 窗口 ──────────────────────────────
        WindowGroup("Dashboard", id: "dashboard") {
            DashboardView(appState: $appState)
                .frame(minWidth: 900, minHeight: 600)
        }
        .windowResizability(.contentSize)

        // ── 设置窗口 ─────────────────────────────────────
        Settings {
            SettingsView(appState: $appState)
        }
    }
}

// MARK: - 全局状态

@MainActor
final class AppState: @unchecked Sendable {
    var isConnected = false { didSet { notifyChange() } }
    var sandboxStatus: SandboxStatus = .unknown { didSet { notifyChange() } }
    var dashboardURL = "http://localhost:18789" { didSet { notifyChange() } }
    var dashboardToken = "" { didSet { notifyChange() } }
    var sshTunnelPID: Int32 = 0 { didSet { notifyChange() } }
    var gatewayVersion = "" { didSet { notifyChange() } }
    var modelName = "" { didSet { notifyChange() } }
    var errorMessage: String? { didSet { notifyChange() } }

    private var observers = [(AnyObject, () -> Void)]()

    func addObserver(_ observer: AnyObject, _ closure: @escaping () -> Void) {
        observers.append((observer, closure))
    }

    private func notifyChange() {
        for (_, closure) in observers {
            closure()
        }
    }

    enum SandboxStatus: String, CaseIterable {
        case unknown = "未知"
        case healthy = "健康"
        case unhealthy = "不健康"
        case offline = "离线"

        var color: Color {
            switch self {
            case .healthy:   return .green
            case .unhealthy: return .orange
            case .offline:   return .red
            case .unknown:   return .gray
            }
        }
    }

    func refreshStatus() async {
        let result = runNemoclaw("yyc3-spark", "status")
        if result.contains("healthy") {
            sandboxStatus = .healthy
            isConnected = true
        } else if result.contains("unhealthy") {
            sandboxStatus = .unhealthy
            isConnected = true
        } else {
            sandboxStatus = .offline
            isConnected = false
        }
        // 提取版本和模型
        if let line = result.components(separatedBy: "\n").first(where: { $0.contains("OpenClaw") }) {
            gatewayVersion = line.trimmingCharacters(in: .whitespaces)
        }
        if let line = result.components(separatedBy: "\n").first(where: { $0.contains("model:") }) {
            modelName = line.components(separatedBy: "model:").last?
                .trimmingCharacters(in: .whitespaces) ?? ""
        }
    }

    func toggleTunnel() -> Bool {
        if sshTunnelPID > 0 {
            kill(sshTunnelPID, SIGTERM)
            sshTunnelPID = 0
            isConnected = false
            return false
        } else {
            let pid = startSSHTunnel()
            sshTunnelPID = pid
            isConnected = pid > 0
            return pid > 0
        }
    }

    func fetchDashboardToken() {
        let result = runNemoclaw("yyc3-spark", "dashboard-url")
        if let tokenRange = result.range(of: "#token=") {
            dashboardToken = String(result[tokenRange.upperBound...]).trimmingCharacters(in: .whitespacesAndNewlines)
        }
        dashboardURL = "http://localhost:18789"
    }
}

// MARK: - Shell 助手

func runNemoclaw(_ args: String...) -> String {
    let task = Process()
    task.launchPath = "/opt/homebrew/bin/nemoclaw"
    task.arguments = args
    let pipe = Pipe()
    task.standardOutput = pipe
    task.standardError = pipe
    do {
        try task.run()
        task.waitUntilExit()
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        return String(data: data, encoding: .utf8) ?? ""
    } catch {
        return "Error: \(error.localizedDescription)"
    }
}

func startSSHTunnel() -> Int32 {
    let task = Process()
    task.launchPath = "/usr/bin/ssh"
    task.arguments = [
        "-i", "\(NSHomeDirectory())/.ssh/yyc3_ed25519",
        "-N", "-L", "18789:127.0.0.1:18789",
        "-o", "ExitOnForwardFailure=yes",
        "-o", "ServerAliveInterval=30",
        "yyc3-n1",
    ]
    let pipe = Pipe()
    task.standardOutput = pipe
    task.standardError = pipe
    do {
        try task.run()
        return task.processIdentifier
    } catch {
        return 0
    }
}
