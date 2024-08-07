# Deno+Drizzle Demo

This is a demo of using Deno along with Drizzle as the ORM data layer and Hono as the web server.

## Prerequisites

- Deno or Devcontainers

## Getting Started

There are 2 different ways to get up and running. Devcontainers is the preferred method as it will have prerequisites automatically installed as well as environment variables and dependencies setup.

Before either method, you will need to create a `.env` file in the root of the project with the following content:

```env
DATABASE_URL=postgresql://docker:docker@localhost:5432/drizzle_demo
```

### With Devcontainers

1. Open the project from devcontainer capable IDE such as VSCode.
2. Run `deno task dev` to start the server.

### Without Devcontainers

1. Run `deno task initialize` to install dependencies; database, migrate, and seed the database.
2. Run `deno task dev` to start the server.
