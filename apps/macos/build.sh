#!/usr/bin/env bash
# build.sh — NemoClaw macOS Desktop 构建脚本
#
# 使用方法:
#   ./build.sh            # Debug 构建
#   ./build.sh release    # Release 构建（签名）
#   ./build.sh run        # 构建并运行

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_NAME="NemoClaw"
BUILD_DIR="${PROJECT_DIR}/.build"
DERIVED_DIR="${PROJECT_DIR}/DerivedData"

echo "=== NemoClaw macOS Desktop 构建 ==="
echo "项目路径: ${PROJECT_DIR}"
echo ""

# 检测命令行工具
if ! xcrun --sdk macosx --show-sdk-path &>/dev/null; then
    echo "❌ 错误: Xcode 命令行工具未安装"
    echo "   运行: xcode-select --install"
    exit 1
fi

SDK_PATH="$(xcrun --sdk macosx --show-sdk-path)"
echo "SDK: ${SDK_PATH}"

# 参数解析
BUILD_MODE="${1:-debug}"
case "${BUILD_MODE}" in
    release|Release)
        CONFIG="release"
        ;;
    run)
        CONFIG="debug"
        ;;
    debug|Debug|*)
        CONFIG="debug"
        ;;
esac

# 清理
echo ""
echo "=== 清理旧构建 ==="
rm -rf "${DERIVED_DIR}"

# 编译 Swift 源文件
echo ""
echo "=== 编译 (${CONFIG}) ==="
SWIFT_FILES=()
while IFS= read -r -d '' file; do
    # 排除 Package.swift（SwiftPM 清单，不是源码）
    [[ "$(basename "$file")" == "Package.swift" ]] && continue
    SWIFT_FILES+=("${file}")
done < <(find "${PROJECT_DIR}" -name "*.swift" -not -path "*/\.*" -not -path "*/.build/*" -print0)

echo "找到 ${#SWIFT_FILES[@]} 个 Swift 源文件"

# 创建输出目录
mkdir -p "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app/Contents/MacOS"
mkdir -p "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app/Contents/Resources"

# 编译
swiftc \
    -o "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app/Contents/MacOS/${APP_NAME}" \
    "${SWIFT_FILES[@]}" \
    -sdk "${SDK_PATH}" \
    -target "arm64-apple-macosx15.0" \
    -framework SwiftUI \
    -framework WebKit \
    -framework AppKit \
    -framework ServiceManagement \
    -O \
    -module-name "NemoClaw" \
    -whole-module-optimization

echo "✅ 编译成功"

# 复制 Info.plist
cp "${PROJECT_DIR}/Info.plist" "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app/Contents/"

# 创建 PkgInfo
echo "APPL????" > "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app/Contents/PkgInfo"

# 设置图标占位（使用系统图标作为后备）
# 如需自定义图标，将 NemoClaw.icns 放到此目录
if [ -f "${PROJECT_DIR}/NemoClaw.icns" ]; then
    cp "${PROJECT_DIR}/NemoClaw.icns" "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app/Contents/Resources/"
fi

echo ""
echo "=== 构建完成 ==="
echo "App Bundle: ${BUILD_DIR}/${CONFIG}/${APP_NAME}.app"
echo "大小: $(du -sh "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app" | cut -f1)"

# 如果是 release，签名
if [ "${CONFIG}" = "release" ]; then
    echo ""
    echo "=== 签名 ==="
    codesign --force --sign - --deep "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app"
    echo "✅ 签名完成"
fi

# 运行
if [ "${BUILD_MODE}" = "run" ]; then
    echo ""
    echo "=== 启动 ${APP_NAME} ==="
    open "${BUILD_DIR}/${CONFIG}/${APP_NAME}.app"
fi

echo ""
echo "✅ 完成"
