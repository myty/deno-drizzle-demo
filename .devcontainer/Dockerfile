ARG DENO_VERSION=1.40.2

FROM denoland/deno:bin-$DENO_VERSION AS deno
FROM mcr.microsoft.com/devcontainers/typescript-node:20
COPY --from=deno /deno /usr/local/bin/deno
