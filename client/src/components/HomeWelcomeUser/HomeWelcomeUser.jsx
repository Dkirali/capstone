import { useState,useEffect,useRef } from 'react'
import "./HomeWelcomeUser.scss"

function HomeWelcomeUser({ text }) {

  const index = useRef(0)

  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setCurrentText(value => value + text.charAt(index.current))
      index.current += 1;
    },500)
  },[currentText, text])
  
  return (
    <>
      <h2 className="homepage__greeting"> {currentText}</h2>
    </>
  )
}

export default HomeWelcomeUser
