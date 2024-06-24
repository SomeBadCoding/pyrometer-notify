You'll need a [Cloudflare Workers account](https://dash.cloudflare.com/sign-up/workers) and [Pyrometer monitor](https://gitlab.com/tezos-kiln/pyrometer)

Prepare the following secrets, and webooks

Cloudflare API token with `Edit Cloudflare Workers` permissions

* Update API Token, and Account ID inside `.github/workflows/deploy.yml` via GitHub Secrets. Repository -> Settings -> Secrets -> Actions

Add Discord Channel webhook addresses 

* Inside `index.js` update `<ids>` with the the corresponding channels where you want to send the notificaiton


[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SomeBadCoding/pyrometer-notify)
