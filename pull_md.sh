#!/bin/sh

git checkout gh-pages
git pull upstream master --allow-unrelated-histories --no-edit
git push origin gh-pages