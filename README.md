# dareto
codename: Red Panda ()

`self challenging and make a different!`

## Getting started

Make sure you have [node.js](https://nodejs.org) LTS installed.

```bash
npm ci
```

### Local development

```bash
npm run dev
```



### Client side only

The Internet Computer, including Juno, does not currently support Server Side Rendering. Therefore, it is recommended to generate a pre-rendered or client-side-only frontend application.

We suggest using the [static exports](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) option from Next.js.

In `next.config.js` file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;
```


### Deploy to Juno
```bash
npm run build && juno deploy
```
After `npm run build`, the bundle output directory called `out` can be used as the source of the content to upload to a Juno's satellite.



## Resources
1. [setup wallet](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-wallet)
2. [Alze](https://demergent-labs.github.io/azle/deployment.html)