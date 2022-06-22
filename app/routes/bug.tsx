import type { LoaderFunction } from '@remix-run/node'

async function getUser(request: Request) {
  return { name: 'Kiliman' }
}

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await getUser(request)
  context.setRequestContext({ user })

  throw new Error('Oops')
}

export default function () {
  return <div>Bug</div>
}
