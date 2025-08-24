import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostsComponent from './components/PostsComponent'
import "../App.css"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ maxWidth: 900, margin: '1rem auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center' }}>React Query Demo, Posts</h1>
        <main>
          <PostsComponent />
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
