import { useState } from 'react'
import EmotionTracker from './EmotionTracker'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <EmotionTracker></EmotionTracker>
    </>
  )
}

export default App
