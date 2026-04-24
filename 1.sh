#!/bin/bash

FILE="/Users/anthonyhartman/code/leadser/automotive-crm/src/App.jsx"

# Backup original
cp "$FILE" "$FILE.bak"

# Remove duplicate Volume2 (keeps first, removes second)
sed -i '' 's/Volume2, \(.*\)Volume2/Volume2, \1/' "$FILE"

echo "Fixed! Check $FILE"
echo "Backup saved as $FILE.bak"