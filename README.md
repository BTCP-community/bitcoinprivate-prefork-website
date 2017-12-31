# Bitcoin Private Pre-Fork Website

bitcoinprivate-prefork.github.io

## Testing Locally

You can quickly get a local server running for testing and developing using the following commands.

**You'll need to have the latest version of Node.JS installed.** Node.JS will not be required in whatever environment the outputted build files run in. The site is entirely static and does not depend on any backend.

**You'll also need to have the latest version of Bower installed.** Bower is also not required in production, only for building.

You'll need to be in the dev directory to test or build.

```
cd dev
npm install
bower install
npm run dev
```

## Deploying

The website is currently hosted with github pages. Use `npm run build` from the `dev` directory, this will update the root directory with the latest src changes.

```
npm run build
```

## Questions

If you have any questions, please submit a new issue.
