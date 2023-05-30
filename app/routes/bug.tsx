import type { LoaderArgs } from '@remix-run/node'

export async function loader({ request, context }: LoaderArgs) {
  throw new Error('Oops')
}

export default function () {
  return <div>Bug</div>
}
