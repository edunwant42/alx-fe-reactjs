import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">
          Welcome to your Recipe Sharing Platform!
        </h1>
      </div>
    </>
  )
}

export default App
