#!/bin/sh

git checkout gh-pages
git remote add upstream https://github.com/salmanahmad456/md-files.git
git pull upstream master --allow-unrelated-histories --no-edit
git push origin gh-pages