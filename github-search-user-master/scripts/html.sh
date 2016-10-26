#!/bin/bash
set -e -o pipefail

# Variables
declare -r dest='build/tmp-index.html'

# Javascripts
sed 's/<script.*<\/script>//g' index.html > $dest
sed -i '.bak' 's/prod-script/script/g' $dest

# Stylesheets
sed -i '.bak' 's/<link rel="stylesheet".*>//g' $dest
sed -i '.bak' 's/prod-link/link/g' $dest
