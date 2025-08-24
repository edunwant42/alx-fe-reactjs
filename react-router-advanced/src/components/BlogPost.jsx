import React from 'react'
import { useParams } from 'react-router-dom'

export default function BlogPost() {
  const { id } = useParams()
  return (
    <div className="card">
      <h3>Blog post {id}</h3>
      <p className="muted">This is a placeholder for a blog post with id {id}.</p>
    </div>
  )
}
