@echo off
echo ===============================================
echo     Portfolio Site Quick Start Script
echo ===============================================
echo.

echo This script will help you initialize your portfolio repository.
echo Make sure you have Git installed and a GitHub account ready.
echo.

set /p repo_name="Enter your GitHub repository name (e.g., my-portfolio): "
set /p github_username="Enter your GitHub username: "

echo.
echo Setting up Git repository...
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main

echo.
echo Creating GitHub repository URL...
echo Your repository URL will be: https://github.com/%github_username%/%repo_name%
echo.

echo Please:
echo 1. Create a new repository on GitHub with the name: %repo_name%
echo 2. Copy and run this command:
echo    git remote add origin https://github.com/%github_username%/%repo_name%.git
echo 3. Then run: git push -u origin main
echo.

echo Next steps:
echo 1. Go to your GitHub repository settings
echo 2. Navigate to Pages section
echo 3. Select "Deploy from a branch"
echo 4. Choose "main" branch and "/docs" folder
echo 5. Your site will be available at: https://%github_username%.github.io/%repo_name%
echo.

echo Don't forget to:
echo - Update portfolio-data-template.md with your LinkedIn information
echo - Add your profile photo to docs/assets/profile-photo.jpg
echo - Customize the content in docs/index.html
echo.

pause
