@echo off
echo 正在构建项目...
npm run build

if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

echo.
echo 构建成功！准备部署到GitHub Pages...
echo.

echo 请确保您已经：
echo 1. 在GitHub上创建了名为 dongxiong-website 的仓库
echo 2. 将本地仓库与GitHub仓库关联
echo 3. 配置了GitHub Pages源为 gh-pages 分支
echo.

echo 接下来将执行以下操作：
echo 1. 创建gh-pages分支
echo 2. 提交构建文件到gh-pages分支
echo 3. 推送到GitHub
echo.

pause

echo 创建gh-pages分支并提交构建文件...
git checkout -b gh-pages
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
git checkout main

echo.
echo 部署完成！
echo 您的网站将在几分钟后可以通过以下地址访问：
echo https://[您的用户名].github.io/dongxiong-website/
echo.
pause