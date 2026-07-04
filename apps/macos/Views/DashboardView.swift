// Dashboard 视图 — 内嵌 WebView 访问 Gateway 面板

import SwiftUI
import WebKit

struct DashboardView: View {
    @Binding var appState: AppState

    var body: some View {
        VStack(spacing: 0) {
            // ── 地址栏 ──
            HStack {
                Image(systemName: "lock.fill")
                    .foregroundColor(.green)
                    .font(.caption)
                Text(appState.dashboardURL)
                    .font(.caption)
                    .foregroundColor(.secondary)
                Spacer()
                Button {
                    appState.fetchDashboardToken()
                } label: {
                    Image(systemName: "arrow.clockwise")
                }
                .help("刷新 Dashboard Token")
                Button {
                    let url = "\(appState.dashboardURL)/#token=\(appState.dashboardToken)"
                    if let u = URL(string: url) {
                        NSWorkspace.shared.open(u)
                    }
                } label: {
                    Image(systemName: "arrow.up.forward.app")
                }
                .help("在浏览器中打开")
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(Color(NSColor.controlBackgroundColor))

            Divider()

            // ── WebView ──
            WebViewContainer(urlString: appState.dashboardURL)

            // ── 状态栏 ──
            HStack {
                Circle()
                    .fill(appState.sandboxStatus.color)
                    .frame(width: 6, height: 6)
                Text(appState.sandboxStatus.rawValue)
                    .font(.caption)
                Spacer()
                if !appState.modelName.isEmpty {
                    Text(appState.modelName)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 4)
            .background(Color(NSColor.controlBackgroundColor))
        }
    }
}

// MARK: - WKWebView 封装

struct WebViewContainer: NSViewRepresentable {
    let urlString: String

    func makeNSView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.applicationNameForUserAgent = "NemoClaw macOS/0.1.0"
        config.defaultWebpagePreferences.preferredContentMode = .mobile

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.customUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) NemoClaw/0.1.0"

        if let url = URL(string: urlString) {
            let request = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData)
            webView.load(request)
        }

        return webView
    }

    func updateNSView(_ webView: WKWebView, context: Context) {
        if let url = URL(string: urlString) {
            let request = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData)
            webView.load(request)
        }
    }
}
