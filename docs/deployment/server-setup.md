---
title: Server Setup
sidebar_position: 2
---

# Server Setup

This project is ran on our Debian server, but this setup should work on any Debian-based server.

### 1. Install system dependencies

This project requires `rsync` for syncing the documentation from repos, and `nginx` for routing, and then `node` for running the framework.

```bash
sudo apt update
sudo apt install -y git curl rsync nginx
```

Use the NodeSource repo for Node.js 22:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

You can verify the correct version matches what this project requires:

```bash
node --version   # v22.x.x
```

Then we need the `pnpm` package manager:

```bash
npm install -g pnpm
```

### 2. Create the docs directory

```bash
sudo mkdir -p /home/trickfire/trickfire-docs
```

### 3. Clone the repo

```bash
git clone https://github.com/TrickfireRobotics/docs.git /home/trickfire/trickfire-docs
cd /home/trickfire/trickfire-docs
```

### 4. Install dependencies and build

```bash
pnpm install --frozen-lockfile
pnpm website:build
```

The first build takes 1–2 minutes. Subsequent builds are faster due to pnpm's cache.

### 5. Configure `nginx`

Copy the provided nginx config and enable it:

```bash
sudo cp /home/trickfire/trickfire-docs/scripts/nginx.conf /etc/nginx/sites-available/trickfire-docs
sudo ln -s /etc/nginx/sites-available/trickfire-docs /etc/nginx/sites-enabled/
sudo nginx -t
sudo nginx -s reload
```

The config serves `build/` on `localhost:80`. The Cloudflare tunnel (set up next) is what exposes this to the internet, `nginx` itself only listens on localhost.

### 6. Verify the server

```bash
curl -s http://localhost/ | grep -o '<title>[^<]*</title>'
# <title>TrickFire Robotics Docs</title>
```

## Updating the server

The `scripts/build.sh` script handles updates automatically. To run it manually:

```bash
bash /home/trickfire/trickfire-docs/scripts/build.sh
```

This pulls the latest framework code, updates dependencies if the lockfile changed, and rebuilds the site. Content in `content/` is untouched (it's gitignored).
