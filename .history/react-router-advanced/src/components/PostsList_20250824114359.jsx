import React from 'react'
import { Link } from 'react-router-dom'

const sample = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  body: `This is the body of post ${i + 1}`,
}))

export default function PostsList() {
  return (
    <div>
      <h3>Posts</h3>
      <ul>
        {sample.map((p) => (
          <li key={p.id}>
            <Link to={`${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
