# Classroom deployment

Pushes to `main` run the **Deploy web app** GitHub Action. It builds with Node.js 24.14.1 and `VITE_API_URL=/api/v1`, uploads only `dist/`, and activates the new static release. The Actions page also supports **Run workflow**.

Repository configuration:
- Variable `DEPLOY_HOST`: demo Droplet IPv4.
- Variable `DEPLOY_KNOWN_HOSTS`: the verified server SSH host-key entry.
- Secret `DEPLOY_SSH_KEY`: a dedicated SSH private key for the server's `deploy` user.

SSH uses key authentication and pinned host-key verification. Nginx serves `/var/www/property-portal`, which links to `/opt/property-portal/app`. The deploy user switches that link between builds in `/opt/property-portal/releases`. The web workflow does not restart the API or change its database.
