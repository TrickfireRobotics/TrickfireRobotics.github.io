---
title: GitHub Actions Runner
sidebar_position: 4
---

# GitHub Actions Runner

The self-hosted runner lets GitHub Actions jobs run directly on the docs server, giving them filesystem access to `/srv/trickfire-docs/` without SSH or file transfers.

## Runner label

The runner must be registered with the label **`docs`**. Both `sync-docs.yml` and `deploy.yml` target `runs-on: [self-hosted, docs]`.

## 1. Create a runner in GitHub

Go to **GitHub → TrickfireRobotics organization → Settings → Actions → Runners → New self-hosted runner**.

Select **Linux / x64** and follow the download instructions. They'll give you a specific `--token` for the registration command — tokens expire after one hour.

## 2. Install and configure the runner

As the user who will run jobs (not root):

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner

# Download (use the URL shown in the GitHub UI for the current version)
curl -o actions-runner-linux-x64.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.x.y/actions-runner-linux-x64-2.x.y.tar.gz

tar xzf actions-runner-linux-x64.tar.gz

# Register (use the token from the GitHub UI)
./config.sh \
  --url https://github.com/TrickfireRobotics \
  --token <TOKEN> \
  --name docs-server \
  --labels docs \
  --work /home/<user>/actions-runner/_work \
  --unattended
```

The `--labels docs` flag is what makes `runs-on: [self-hosted, docs]` route jobs here.

## 3. Install as a systemd service

```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

Enable on boot:

```bash
sudo systemctl enable actions.runner.TrickfireRobotics.docs-server
```

Check status:

```bash
sudo systemctl status actions.runner.TrickfireRobotics.docs-server
```

## 4. Grant access to /srv/trickfire-docs

The runner user needs write access to `/srv/trickfire-docs/content/` and execute access to `build.sh`:

```bash
sudo chown -R <runner-user>:<runner-user> /srv/trickfire-docs
```

If you cloned the repo as a different user, transfer ownership to the runner user here.

## 5. Verify

Go to **GitHub → TrickfireRobotics → Settings → Actions → Runners**. The runner should show as **Idle** (green).

Trigger a test run by going to **Actions → Deploy Docs Site → Run workflow** in this repo.

## Runner environment

The runner inherits the shell environment of the service user. Make sure `node`, `pnpm`, `git`, and `rsync` are on the `PATH` for that user.

If pnpm was installed globally via npm, add it to the runner's PATH:

```bash
# In ~/.bashrc or ~/.profile for the runner user:
export PATH="$HOME/.local/share/pnpm:$PATH"
```

Then restart the runner service:

```bash
sudo systemctl restart actions.runner.TrickfireRobotics.docs-server
```

## Security considerations

- The runner runs as a non-root user with access only to `/srv/trickfire-docs/` and the runner work directory.
- Member repo CI workflows call the **reusable** `sync-docs.yml` — they cannot execute arbitrary code on the server beyond what that workflow defines.
- Repository access for the runner is controlled by GitHub's self-hosted runner security model. Organization runners can be restricted to specific repositories in **Settings → Actions → Runner groups**.

## Re-registering the runner

If the runner token expires or the runner is removed from GitHub:

```bash
cd ~/actions-runner
sudo ./svc.sh stop
./config.sh remove --token <OLD-TOKEN>
./config.sh \
  --url https://github.com/TrickfireRobotics \
  --token <NEW-TOKEN> \
  --name docs-server \
  --labels docs \
  --unattended
sudo ./svc.sh start
```
