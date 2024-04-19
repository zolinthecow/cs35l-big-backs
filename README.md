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

## Getting Started

First, run the development server:

```bash
pnpm dev
```

In another terminal window, start the database:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

