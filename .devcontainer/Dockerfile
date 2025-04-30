ARG DENO_VERSION=2.3.1

FROM denoland/deno:bin-$DENO_VERSION AS deno
FROM mcr.microsoft.com/devcontainers/typescript-node:20
COPY --from=deno /deno /usr/local/bin/deno
