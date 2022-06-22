import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async ({ request }) => {
  throw new Error('Oops')
}

export default function () {
  return <div>Bug</div>
}
