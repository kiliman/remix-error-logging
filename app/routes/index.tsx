import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link to="bug">Bug</Link>
        </li>
      </ul>
    </div>
  )
}
