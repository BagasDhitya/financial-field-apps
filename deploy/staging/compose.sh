#!/bin/sh
# `docker compose` for the staging stack (ADR-0015): the compose file, the
# git-ignored env file and an image tag from the current commit (REQ-INFRA-002).
#   ./deploy/staging/compose.sh build | up -d | ps | logs -f fe | down
#   ./deploy/staging/compose.sh --profile seed run --rm seed [script] [args]
# STAGING_ENV_FILE overrides the env file path.
set -eu

DIR=$(cd "$(dirname "$0")" && pwd)
ENV_FILE="${STAGING_ENV_FILE:-$DIR/.env.staging}"

if [ ! -f "$ENV_FILE" ]; then
	echo "compose.sh: $ENV_FILE not found. Run deploy/staging/generate-secrets.sh first." >&2
	exit 2
fi

FFID_IMAGE_TAG="${FFID_IMAGE_TAG:-$(git -C "$DIR" rev-parse --short HEAD 2>/dev/null || echo local)}"
export FFID_IMAGE_TAG

exec docker compose -f "$DIR/docker-compose.yml" --env-file "$ENV_FILE" "$@"
