import Bugsnag from '@bugsnag/js'
import type { EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { renderToString } from 'react-dom/server'

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY!,
})

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  responseHeaders.set('Content-Type', 'text/html')

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}

export function handleError(request: Request, error: Error) {
  console.log('notify bugsnag')
  Bugsnag.notify(error, event => {
    event.addMetadata('request', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    })
  })
}
