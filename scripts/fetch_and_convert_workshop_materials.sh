#!/bin/bash
# Usage: ./fetch_and_convert_workshop_materials.sh <github_repo_url> [workshop_slug]
# Example: ./fetch_and_convert_workshop_materials.sh https://github.com/pnsinha/Network-Analysis-and-Visualization network-analysis
#
# This script clones the given GitHub repo, finds all .ipynb and .Rmd files,
# converts them to HTML, and places the outputs in public/notebooks/<workshop_slug>/
# It can be run locally or in CI (e.g., GitHub Actions).

set -e

REPO_URL="$1"
WORKSHOP_SLUG="$2"

if [ -z "$REPO_URL" ]; then
  echo "Usage: $0 <github_repo_url> [workshop_slug]"
  exit 1
fi

if [ -z "$WORKSHOP_SLUG" ]; then
  # Use repo name as default slug
  WORKSHOP_SLUG=$(basename "$REPO_URL" .git)
fi

TEMP_DIR="tmp_workshop_repo_$WORKSHOP_SLUG"
OUTPUT_DIR="public/notebooks/$WORKSHOP_SLUG"

rm -rf "$TEMP_DIR" "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

echo "Cloning $REPO_URL ..."
git clone --depth 1 "$REPO_URL" "$TEMP_DIR"

# Convert Jupyter Notebooks to HTML
find "$TEMP_DIR" -name '*.ipynb' | while read nb; do
  echo "Converting $nb to HTML ..."
  jupyter nbconvert --to html "$nb" --output-dir="$OUTPUT_DIR"
done

# Convert R Markdown files to HTML
find "$TEMP_DIR" -name '*.Rmd' | while read rmd; do
  echo "Rendering $rmd to HTML ..."
  Rscript -e "rmarkdown::render('$rmd', output_dir='$OUTPUT_DIR')"
done

# List results
echo "Converted files in $OUTPUT_DIR:"
ls -lh "$OUTPUT_DIR"

echo "Cleaning up ..."
rm -rf "$TEMP_DIR"

echo "Done. HTML files are in $OUTPUT_DIR."
