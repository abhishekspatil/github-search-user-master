#!/bin/bash
set -e -o pipefail

# Variables
declare -r dest='build/assets/js/app.js'
declare -a concatFiles=(
  'node_modules/jquery/dist/jquery.js'
  'node_modules/angular/angular.js'
  'app/github.js'
  'app/services/githubService.js'
  'app/controllers/githubController.js'
)

# Concatenating javascript
for i in ${concatFiles[@]}; do
  cat $i
done > $dest
