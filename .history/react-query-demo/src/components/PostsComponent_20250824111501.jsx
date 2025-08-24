import React from 'react'
import { useQuery } from '@tanstack/react-query'
import "../"

async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export default function PostsComponent() {
  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30,
  })

  if (isLoading) return <div>Loading posts...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error.message}</div>

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refetch posts'}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.slice(0, 20).map((p) => (
          <li key={p.id} style={{ padding: 12, borderBottom: '1px solid #eee' }}>
            <strong>{p.title}</strong>
            <p style={{ marginTop: 6 }}>{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
