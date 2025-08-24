import React from 'react'
import { useParams } from 'react-router-dom'

export default function Post() {
  const { postId } = useParams()

  return (
    <div className="card">
      <h3>Post {postId}</h3>
      <p className="muted">Dynamic route rendering for a post with id {postId}.</p>
    </div>
  )
}
