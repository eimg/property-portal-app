#!/usr/bin/env bash
set -euo pipefail
archive="${1:?Expected an uploaded build archive}"
release=$(mktemp -d /opt/property-portal/releases/app.XXXXXXXX)
trap 'rm -f "$archive"' EXIT
tar -xzf "$archive" --no-same-owner -C "$release"
chmod 755 "$release"
test -s "$release/index.html"
ln -s "$release" /opt/property-portal/app.next
mv -Tf /opt/property-portal/app.next /opt/property-portal/app
curl --fail --silent --show-error --max-time 10 --output /dev/null http://127.0.0.1/
printf 'Web release deployed: %s\n' "$release"
