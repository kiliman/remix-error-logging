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
// this adds the request data as metadata to the error report
// context is the object from `getLoadContext`
// you can use this to add per request context like current user
export function handleError(request: Request, error: Error, context: any) {
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
export const loader: LoaderFunction = async ({ request, context }) => {
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
