#!/bin/sh
# Creates the staging env file from .env.staging.example and fills every
# generated secret (ADR-0015, runbooks/staging-docker.md step 1).
#   ./deploy/staging/generate-secrets.sh            → deploy/staging/.env.staging
#   ./deploy/staging/generate-secrets.sh <path>     → another path (for a dry check)
# Never prints a secret, never overwrites an existing file. Needs openssl.
set -eu

DIR=$(cd "$(dirname "$0")" && pwd)
EXAMPLE="$DIR/.env.staging.example"
TARGET="${1:-$DIR/.env.staging}"

if [ -e "$TARGET" ]; then
	echo "generate-secrets: $TARGET already exists; not overwriting it." >&2
	exit 2
fi
if ! command -v openssl >/dev/null 2>&1; then
	echo "generate-secrets: openssl is required." >&2
	exit 2
fi

# Hex only: no characters that the env file or compose interpolation could misread.
secret() {
	openssl rand -hex 32
}

umask 077
TMP="$TARGET.tmp.$$"
trap 'rm -f "$TMP"' EXIT

while IFS= read -r line || [ -n "$line" ]; do
	case "$line" in
		POSTGRES_PASSWORD= | API_TOKEN_SALT= | ADMIN_JWT_SECRET= | TRANSFER_TOKEN_SALT= | \
		JWT_SECRET= | ENCRYPTION_KEY= | REVALIDATE_SECRET= | PREVIEW_SECRET= | \
		STAGING_BASIC_AUTH_PASSWORD=)
			printf '%s%s\n' "$line" "$(secret)"
			;;
		APP_KEYS=)
			printf 'APP_KEYS=%s,%s,%s,%s\n' "$(secret)" "$(secret)" "$(secret)" "$(secret)"
			;;
		STAGING_BASIC_AUTH_USER=)
			printf 'STAGING_BASIC_AUTH_USER=ffid\n'
			;;
		*)
			printf '%s\n' "$line"
			;;
	esac
done <"$EXAMPLE" >"$TMP"

mv "$TMP" "$TARGET"
trap - EXIT
chmod 600 "$TARGET"

echo "generate-secrets: wrote $TARGET (mode 600)."
echo "Generated: POSTGRES_PASSWORD, APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, TRANSFER_TOKEN_SALT,"
echo "  JWT_SECRET, ENCRYPTION_KEY, REVALIDATE_SECRET, PREVIEW_SECRET, STAGING_BASIC_AUTH_PASSWORD."
echo "Basic auth user: ffid (password is in the file)."
echo "Still blank: CMS_API_TOKEN, CMS_PREVIEW_TOKEN, CMS_SEED_TOKEN (runbook step 4)."
