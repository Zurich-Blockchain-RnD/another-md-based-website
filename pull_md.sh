#!/bin/sh

# both of the first command only need to run once in order to set pages and MD repositories
# both first command are executed repeatedly in case branch was changed or upstream

# set branch (for pages repo)
git checkout master
# set MD source repo (quick setup https mode link) - adds a repo to communicate with - needed to pull from other repositories the changes
git remote add upstream https://github.com/Zurich-Blockchain-RnD/Just-the-md-files.git

# pull changes from gh-pages
git pull origin master --no-edit

# pull changes from MD repo. --no-edit means it does not ask for description (no need to describe action of pull request)
# --allow-unrelated-histories override error message of no link between repositories
# if adding description enter these commands instead

# git pull upstream master --allow-unrelated-histories
# find command to add description

git pull upstream master --allow-unrelated-histories --no-edit
# push changed files from MD repo to pages repo
git push origin master

ROBOCOPY .\\_site\\ ..\\html-files\\ //s
cd ../html-files
git add .
git commit -m "Change site files"
git push origin master

# pause bash
$SHELL
