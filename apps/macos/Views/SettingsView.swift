// 设置视图 — SSH 配置 / Dashboard / 模型 / 关于

import SwiftUI

struct SettingsView: View {
    @Binding var appState: AppState

    var body: some View {
        TabView {
            // ── 通用 ─────────────────────────────────
            SSHView(appState: $appState)
                .tabItem { Label("SSH 隧道", systemImage: "lock") }

            DashboardSettingsView(appState: $appState)
                .tabItem { Label("Dashboard", systemImage: "globe") }

            ModelsView()
                .tabItem { Label("模型", systemImage: "brain") }

            AboutView()
                .tabItem { Label("关于", systemImage: "info.circle") }
        }
        .frame(width: 480, height: 360)
    }
}

// MARK: - SSH 配置

struct SSHView: View {
    @Binding var appState: AppState
    @AppStorage("ssh_host") private var sshHost = "yyc3-n1"
    @AppStorage("ssh_user") private var sshUser = "yyc3"
    @AppStorage("ssh_port") private var sshPort = "22"
    @AppStorage("ssh_key") private var sshKey = "~/.ssh/yyc3_ed25519"
    @AppStorage("local_port") private var localPort = "18789"

    var body: some View {
        Form {
            Section("SSH 连接") {
                HStack {
                    Text("主机")
                    TextField("yyc3-n1", text: $sshHost)
                        .frame(width: 200)
                }
                HStack {
                    Text("用户")
                    TextField("yyc3", text: $sshUser)
                        .frame(width: 200)
                }
                HStack {
                    Text("端口")
                    TextField("22", text: $sshPort)
                        .frame(width: 80)
                }
                HStack {
                    Text("密钥")
                    TextField("~/.ssh/yyc3_ed25519", text: $sshKey)
                        .frame(width: 250)
                }
            }

            Section("端口转发") {
                HStack {
                    Text("本地端口")
                    TextField("18789", text: $localPort)
                        .frame(width: 80)
                }
            }

            HStack {
                Spacer()
                Button("测试连接") {
                    testSSH()
                }
            }
        }
        .padding()
    }

    private func testSSH() {
        let task = Process()
        task.launchPath = "/usr/bin/ssh"
        task.arguments = [
            "-i", sshKey.replacingOccurrences(of: "~", with: NSHomeDirectory()),
            "-o", "ConnectTimeout=5",
            "-o", "StrictHostKeyChecking=accept-new",
            "\(sshUser)@\(sshHost)",
            "echo connected && hostname",
        ]
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        do {
            try task.run()
            task.waitUntilExit()
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            let output = String(data: data, encoding: .utf8) ?? ""
            if task.terminationStatus == 0 {
                appState.errorMessage = nil
                appState.isConnected = true
            } else {
                appState.errorMessage = "SSH 连接失败:\n\(output)"
            }
        } catch {
            appState.errorMessage = error.localizedDescription
        }
    }
}

// MARK: - Dashboard 设置

struct DashboardSettingsView: View {
    @Binding var appState: AppState
    @AppStorage("dashboard_url") private var dashboardURL = "http://localhost:18789"

    var body: some View {
        Form {
            Section("Dashboard") {
                HStack {
                    Text("URL")
                    TextField("http://localhost:18789", text: $dashboardURL)
                        .frame(width: 300)
                }
                HStack {
                    Text("Token")
                    TextField("粘贴 Token 进行预认证", text: $appState.dashboardToken)
                        .frame(width: 300)
                        .font(.caption)
                }
            }

            HStack {
                Spacer()
                Button("在浏览器中打开") {
                    let url = appState.dashboardToken.isEmpty
                        ? dashboardURL
                        : "\(dashboardURL)/#token=\(appState.dashboardToken)"
                    if let u = URL(string: url) {
                        NSWorkspace.shared.open(u)
                    }
                }
            }
        }
        .padding()
    }
}

// MARK: - 模型信息

struct ModelsView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("可用模型")
                .font(.headline)

            GroupBox("DGX Spark N1 (Ollama)") {
                VStack(alignment: .leading, spacing: 4) {
                    ModelRow("qwen3.6:35b-a3b", "通用推理 (默认)")
                    ModelRow("yyc3-coder-v1", "代码专项")
                    ModelRow("yyc3-mgmt-v2", "经管运维")
                }
                .padding(.vertical, 4)
            }

            GroupBox("Mac M4 Max (MLX)") {
                VStack(alignment: .leading, spacing: 4) {
                    ModelRow("Family/Coder v0.2.0", "YYC³ Family Coder")
                }
                .padding(.vertical, 4)
            }

            GroupBox("DGX Spark N2 (Ollama)") {
                VStack(alignment: .leading, spacing: 4) {
                    ModelRow("qwen3-coder-30b", "代码审查")
                }
                .padding(.vertical, 4)
            }

            Spacer()
        }
        .padding()
    }
}

struct ModelRow: View {
    let name: String
    let description: String

    init(_ name: String, _ description: String) {
        self.name = name
        self.description = description
    }

    var body: some View {
        HStack {
            Text(name)
                .font(.system(.body, design: .monospaced))
            Spacer()
            Text(description)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

// MARK: - 关于

struct AboutView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "cube.box")
                .font(.system(size: 48))
                .foregroundColor(.accentColor)

            Text("YYC³ NemoClaw")
                .font(.title2)
                .bold()

            Text("版本 0.1.0")
                .foregroundColor(.secondary)

            Text("macOS 桌面伴侣 — 管理沙箱、监控状态、访问 Dashboard")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)

            Divider()

            VStack(alignment: .leading, spacing: 4) {
                Text("技术栈").font(.caption).foregroundColor(.secondary)
                Text("SwiftUI 6 · WKWebView · Process (Shell)")
                    .font(.caption)
            }

            Spacer()

            Text("© 2026 YYC³ Team")
                .font(.caption2)
                .foregroundColor(.secondary)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
