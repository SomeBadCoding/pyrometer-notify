You'll need a free [Cloudflare Workers account](https://dash.cloudflare.com/sign-up/workers) and [Pyrometer monitor](https://gitlab.com/tezos-kiln/pyrometer)

Prepare the following secrets, and webooks

Cloudflare API token with `Edit Workers Scripts & Worker Routes` permissions

* When using the deploy button input Account ID and Scoped API Token via the workers deployment workflow, and fork the repo
* Enable github worflows
* Deploy Worker
  
Post Deployment add `CF_API_TOKEN`, and `CF_ACCOUNT_ID` as GitHub Secrets. Repository -> Settings -> Secrets -> Actions

Add Discord Channel webhook addresses inside `index.js` update `<ids>` with the the corresponding channels where you want to send the notificaiton

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/SomeBadCoding/pyrometer-notify)
