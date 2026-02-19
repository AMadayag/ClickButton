import { useState, useRef } from 'react'
import './App.css'
import mouseclick from './assets/mouseclick.mp3'
import { blob, blobText } from './blob-assets'

function App() {
  const [count, setCount] = useState(0)
  const [blobIndex, setBlobIndex] = useState(0)
  const [blobTextIndex, setBlobTextIndex] = useState(0)
  const btnSound = useRef(new Audio(mouseclick))

  const handleBtnClick = () => {
    const newCount = count + 1
    setCount(newCount)
    btnSound.current.currentTime = 0
    btnSound.current.play()
    blobChecks(newCount)
  }
  
  const blobChecks = (newCount) => {
    if (newCount === 1) {
      blobNotices()
    }
    if (newCount >= 30) {
      blobAngry()
    }
  }

  const blobAngry = () => {
    if (blobIndex <= 8)
    setBlobIndex(8)
  }

  async function blobNotices() {
    setBlobIndex(1)
    await setTimeout(() => {
      setBlobIndex(2)
      setBlobTextIndex(1)
    }, 2000)
    await setTimeout(() => {
      setBlobIndex(3)
      setBlobTextIndex(2)
    }, 3500)
    await setTimeout(() => {
      setBlobIndex(4)
      setBlobTextIndex(3)
    }, 6000)
    await setTimeout(() => setBlobIndex(5), 7000)
    await setTimeout(() => {
      setBlobIndex(6)
      setBlobTextIndex(0)
    }, 8000)
  }

  const handleMousEnter = () => {
    if (count >= 1 && blobIndex === 6) {
      setBlobIndex(7)
    }
  }

  const handleMouseLeave = () => {
    if (blobIndex === 7) {
      setBlobIndex(6)
    } else if (blobIndex === 8) {
      setBlobIndex(9)
      setBlobTextIndex(4)
    }
  }

  return (
    <>
      <div className='window-container'>
        <div
          onClick={handleBtnClick}
          onMouseEnter={handleMousEnter}
          onMouseLeave={handleMouseLeave}
          className='button'>
          <img src="btn-plain.png" alt="CLICK ME!" className='button'/>
        </div>
        <div className='counter'>Count: {count}</div>
      </div>
      <div className='blob-container'>
        <img src={blob[blobIndex]} className='blob'/>
      </div>
      <div className='blob-text-container'>
        <img src={blobText[blobTextIndex]} className='blob-text' />
      </div>
    </>
  )
}

export default App
