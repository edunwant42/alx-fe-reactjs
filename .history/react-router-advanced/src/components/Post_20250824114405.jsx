import React from 'react'
import { useParams } from 'react-router-dom'

export default function Post() {
  const { postId } = useParams()

  return (
    <div>
      <h3>Post {postId}</h3>
      <p>Dynamic route rendering for a post with id {postId}.</p>
    </div>
  )
}
