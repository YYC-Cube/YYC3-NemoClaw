// swift-tools-version: 6.0

import PackageDescription

let package = Package(
    name: "NemoClaw",
    platforms: [
        .macOS(.v15)
    ],
    targets: [
        .executableTarget(
            name: "NemoClaw",
            dependencies: [],
            path: ".",
            exclude: [
                "nemoclaw.json",
                "README.md",
                "build.sh",
                "Products/",
                ".build/",
            ],
            swiftSettings: [
                .swiftLanguageMode(.v6),
                .enableUpcomingFeature("BareSlashRegexLiterals"),
                .unsafeFlags(["-O"])
            ]
        )
    ]
)
