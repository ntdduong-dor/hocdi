#!/bin/bash
echo "🚀 Deploying Học Đi to GitHub Pages..."
echo ""

# Push source code
echo "📤 Pushing source code..."
git push origin main
if [ $? -ne 0 ]; then
  echo "❌ Push failed. Please check your GitHub credentials."
  echo ""
  echo "Nếu chưa có token, tạo tại: https://github.com/settings/tokens"
  echo "Chọn: Generate new token (classic) → scope 'repo' → Copy token"
  echo "Khi git hỏi password, paste token vào."
  exit 1
fi

echo "✅ Source pushed!"
echo ""

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npx gh-pages -d dist
if [ $? -ne 0 ]; then
  echo "❌ Deploy failed."
  exit 1
fi

echo ""
echo "✅ Deploy thành công!"
echo "🔗 Truy cập: https://ntdduong-dor.github.io/hocdi/"
echo ""
echo "📱 Trên điện thoại:"
echo "   Android: Chrome → Menu ⋮ → 'Cài đặt ứng dụng'"
echo "   iOS: Safari → Share ↑ → 'Thêm vào Màn hình chính'"
