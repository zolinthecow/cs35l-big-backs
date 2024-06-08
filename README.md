# CS35L Big Backs

Spotify project for S24 CS35L group Big Backs

## Installations

Make sure you have the following installed on your system:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [pnpm](https://pnpm.io/)

*IMPORTANT*: everything uses `pnpm` and not `npm`! It's a drop in replacement, so anytime you want to run an `npm` command, just replace it with `pnpm`.

Add environment variables:

```bash
touch .env.local
```
Ask someone for the variables and just paste them into the file

**NOTE TO 35L GRADER:** There shoudl be a `.env.local` file in the tarball

## Setup

Start the database:

```bash
docker-compose up
```

Make sure you have a populated `.env.local` file before continuing.

Run the database migrations:

```bash
pnpm exec prisma migrate dev
```

**IMPORTANT NOTE TO 35L GRADER:** The only way this app will run is if you either:
1. Email `colinzhao777@gmail.com` to be added to the spotify developer dashboard or
2. Create your own spotify developer app and change the values in `.env.local` to use your own client id and client secret

This is because Spotify never approved our developer application to publish the oauth app to the public so we have to manually add accounts to be approved to log in

## Development

First, run the development server:

```bash
pnpm dev
```

In another terminal window, start the database:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to make database changes, make any changes you have in `prisma/schema.prisma`, then run `pnpm exec prisma db push`.
When you're ready to make a PR, finalize the database schema changes by doing `pnpm exec prisma migrate --dev`.

For shadcn components, use the following command to add them:

```bash
pnpm dlx shadcn-ui@latest add [component name]
```
