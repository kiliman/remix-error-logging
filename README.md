# Remix Error Logging

This example adds a patch to enable server side logging to your
favorite logging service. This one uses [Bugsnag](https://www.bugsnag.com/), but any of them
should work.

The patch adds a `handleError` export in _entry.server_. This function
will be called with the current request and error object.

```ts
// entry.server.tsx

// initialize Bugsnag with your API key
Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY!,
})

// add handleError export to notify Bugsnag
// args includes the same object as loader and actions
// { request, params, context }
export function handleError(error: unknown, { request, context }: DataFunctionArgs) {
  console.log('notify bugsnag')
  Bugsnag.setUser(context.getRequestContext().user)
  Bugsnag.notify(error, event => {
    event.addMetadata('request', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    })
  })
}

// routes/bug.tsx
export async function loader async ({ request, context }: LoaderArgs) => {
  const user = await getUser(request)
  // set the context used by bugsnag for this request
  context.setRequestContext({ user })

  throw new Error('Oops')
}

// server.js
const getLoadContext = () => ({
  _requestContext: {},
  getRequestContext: () => this._requestContext,
  setRequestContext: ({ user, context, metaData }) => {
    this._requestContext = { user, context, metaData }
  },
})
```

## 🛠 Installation

```bash
npm install -D patch-package
```

Copy the patch file from the `patches` folder to your project `patches` folder.
Apply the patch

```bash
npx patch-package
```

Update your _package.json_ file to include the following postinstall script. This will ensure your patch is automatically applied when you checkout you project.

```json
"scripts": {
  "postinstall": "patch-package"
}
```
