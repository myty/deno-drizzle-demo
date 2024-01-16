# Deno+Drizzle Demo

This is a demo of using Deno along with Drizzle as the ORM data layer and Hono as the web server.

## Prerequisites

- Deno
- NPM

## Getting Started

There are 2 different ways to get up and running. Devcontainers is the preferred method as it will have prerequisites automatically installed as well as environment variables and dependencies setup.

### With Devcontainers

1. Open the project from devcontainer capable IDE such as VSCode.
2. Run `deno task serve` to start the server.

### Without Devcontainers

1. Run `npm install` to install the dev dependencies. This is needed to run `drizzle-kit` for generating the migrations.
   Once Deno is able to run `drizzle-kit` this step will no longer be needed.
2. Run `deno task initialize` to install dependencies; database, migrate, and seed the database.
3. Run `deno task serve` to start the server.
