#!/usr/bin/env bash
# Sync resume.pdf from the resume repo into this site's public/ directory.
#
# Run after rebuilding the LaTeX resume:
#   ./scripts/sync-resume.sh
#
# Optionally pass a custom path to the resume repo:
#   RESUME_REPO=/path/to/resume ./scripts/sync-resume.sh

set -euo pipefail

RESUME_REPO="${RESUME_REPO:-$(cd "$(dirname "$0")/../.." && pwd)/resume}"
SRC="${RESUME_REPO}/resume.pdf"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/resume.pdf"

if [[ ! -f "${SRC}" ]]; then
  echo "error: ${SRC} not found." >&2
  echo "set RESUME_REPO to the path of your resume repo, or rebuild resume.pdf first." >&2
  exit 1
fi

cp -f "${SRC}" "${DEST}"
echo "synced: ${SRC} -> ${DEST}"
echo "size:   $(wc -c <"${DEST}" | tr -d ' ') bytes"
