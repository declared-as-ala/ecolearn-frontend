# Script to rename video files (remove spaces)
# Run this in PowerShell from the videos folder

Write-Host "🔄 إعادة تسمية ملفات الفيديو..." -ForegroundColor Cyan

# Get current directory
$currentDir = Get-Location

# Check if we're in the videos folder
if (-not (Test-Path "5eme 1.mp4")) {
    Write-Host "❌ خطأ: يجب تشغيل السكريبت من مجلد frontend/public/videos" -ForegroundColor Red
    Write-Host "📍 المسار الحالي: $currentDir" -ForegroundColor Yellow
    exit 1
}

# Rename files
$files = @(
    @{Old = "5eme 1.mp4"; New = "5eme-1.mp4"},
    @{Old = "5eme 2 .mp4"; New = "5eme-2.mp4"},
    @{Old = "5eme 3 .mp4"; New = "5eme-3.mp4"},
    @{Old = "5eme 4 .mp4"; New = "5eme-4.mp4"},
    @{Old = "5eme 5 .mp4"; New = "5eme-5.mp4"}
)

foreach ($file in $files) {
    if (Test-Path $file.Old) {
        Rename-Item -Path $file.Old -NewName $file.New -Force
        Write-Host "✅ تم: $($file.Old) → $($file.New)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  الملف غير موجود: $($file.Old)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "✨ تمت إعادة التسمية بنجاح!" -ForegroundColor Green
Write-Host "📋 الملفات الجديدة:" -ForegroundColor Cyan
Get-ChildItem -Filter "5eme-*.mp4" | ForEach-Object {
    Write-Host "   ✅ $($_.Name)" -ForegroundColor Green
}

