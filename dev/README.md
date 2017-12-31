# Bitcoin Private Pre-Fork Website

bitcoinprivate-prefork.github.io

## Testing Locally

You can quickly get a local server running for testing and developing using the following commands.

**You'll need to have the latest version of Node.JS installed.** Node.JS will not be required in whatever environment the outputted build files run in. The site is entirely static and does not depend on any backend.

**You'll also need to have the latest version of Bower installed.** Bower is also not required in production, only for building.

```
npm install
bower install
npm run dev
```

## Deploying

If you want to host the static files yourself, you can simply build from `src` and upload the generated `build` directory to wherever you're hosting.

To generate the build directory, run

```
npm run build
```

## Questions

If you have any questions, please submit a new issue.
