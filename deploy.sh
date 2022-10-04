#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build-github

# 进入构建文件夹
cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

cd -