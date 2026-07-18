---
title: Server Setup
sidebar_position: 2
---

# Server Setup

## Requirements

- Debian 11 (Bullseye) or 12 (Bookworm), or Ubuntu 22.04+
- 1 GB RAM minimum (2 GB recommended for the Docusaurus build)
- Outbound internet access (for the Cloudflare tunnel and GitHub Actions runner)
- No inbound ports need to be open

## 1. Install system dependencies

```bash
sudo apt update
sudo apt install -y git curl rsync nginx
```

## 2. Install Node.js

Use the NodeSource repo for Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

```bash
node --version   # v22.x.x
```

## 3. Install pnpm

```bash
npm install -g pnpm
```

## 4. Create the docs directory

```bash
sudo mkdir -p /srv/trickfire-docs
sudo chown $USER:$USER /srv/trickfire-docs
```

## 5. Clone the repo

```bash
git clone https://github.com/TrickfireRobotics/trickfire-docs.git /srv/trickfire-docs
cd /srv/trickfire-docs
```

## 6. Install dependencies and build

```bash
pnpm install --frozen-lockfile
pnpm website:build
```

The first build takes 1–2 minutes. Subsequent builds are faster due to pnpm's cache.

## 7. Configure nginx

Copy the provided nginx config and enable it:

```bash
sudo cp /srv/trickfire-docs/scripts/nginx.conf /etc/nginx/sites-available/trickfire-docs
sudo ln -s /etc/nginx/sites-available/trickfire-docs /etc/nginx/sites-enabled/
sudo nginx -t
sudo nginx -s reload
```

The config serves `build/` on `localhost:80`. The Cloudflare tunnel (set up next) is what exposes this to the internet — nginx itself only listens on localhost.

## 8. Verify the server

```bash
curl -s http://localhost/ | grep -o '<title>[^<]*</title>'
# <title>TrickFire Robotics Docs</title>
```

## Updating the server

The `scripts/build.sh` script handles updates automatically. To run it manually:

```bash
bash /srv/trickfire-docs/scripts/build.sh
```

This pulls the latest framework code, updates dependencies if the lockfile changed, and rebuilds the site. Content in `content/` is untouched (it's gitignored).
