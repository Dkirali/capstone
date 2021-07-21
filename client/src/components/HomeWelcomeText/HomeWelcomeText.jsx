import { useState,useEffect,useRef } from 'react'
import "./HomeWelcomeText.scss"

function HomeWelcomeText({ text }) {

  const index = useRef(0)

  const [currentText, setCurrentText] = useState('')


  useEffect(() => {
    setTimeout(() => {
      setCurrentText(value => value + text.charAt(index.current))
      index.current += 1;
    },200)
  },[currentText, text])
  
  return (
    <>
      <h2 className="homepage__greeting-text"> {currentText}</h2>
    </>
  )
}

export default HomeWelcomeText