@echo off
chcp 65001 >nul
echo 🔄 إعادة تسمية ملفات الفيديو...
echo.

cd /d "%~dp0"

if not exist "5eme 1.mp4" (
    echo ❌ خطأ: يجب تشغيل الملف من مجلد frontend/public/videos
    pause
    exit /b 1
)

echo ✅ إعادة تسمية الملفات...
ren "5eme 1.mp4" "5eme-1.mp4" 2>nul && echo ✅ تم: 5eme 1.mp4 → 5eme-1.mp4 || echo ⚠️  الملف غير موجود: 5eme 1.mp4
ren "5eme 2 .mp4" "5eme-2.mp4" 2>nul && echo ✅ تم: 5eme 2 .mp4 → 5eme-2.mp4 || echo ⚠️  الملف غير موجود: 5eme 2 .mp4
ren "5eme 3 .mp4" "5eme-3.mp4" 2>nul && echo ✅ تم: 5eme 3 .mp4 → 5eme-3.mp4 || echo ⚠️  الملف غير موجود: 5eme 3 .mp4
ren "5eme 4 .mp4" "5eme-4.mp4" 2>nul && echo ✅ تم: 5eme 4 .mp4 → 5eme-4.mp4 || echo ⚠️  الملف غير موجود: 5eme 4 .mp4
ren "5eme 5 .mp4" "5eme-5.mp4" 2>nul && echo ✅ تم: 5eme 5 .mp4 → 5eme-5.mp4 || echo ⚠️  الملف غير موجود: 5eme 5 .mp4

echo.
echo ✨ تمت إعادة التسمية بنجاح!
echo.
pause

