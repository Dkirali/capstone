import { useState } from 'react'
import "./QuestionTwo.scss"
import { toast } from "react-toastify"
import gold from '../../assets/images/Ranks/gold.png'
import plat from '../../assets/images/Ranks/platinum.png'
import diamond from '../../assets/images/Ranks/diamond.png'
import master from '../../assets/images/Ranks/master.png'

function QuestionTwo({dispatch,id})  {
  const [questionTwo,setQuestionTwo] = useState(false)
  const [goldl,setGold] = useState(false)
  const [platl,setPlat] = useState(false)
  const [diamondl,setDiamond] = useState(false)
  const [masterl,setMaster] = useState(false)

  const updateState = (e) => {
    return dispatch({type: "updatePoint", payload:e.target.value})
  }

  const emptyInput = (e) => {
    if (e.target[0].value === "") {
      toast.error("Please enter a value")
      return false
    } else {
      return true
    }
  }

  const validRange = (e) => {
    console.log(e)
    if (e.target[0].value < 0 || e.target[0].value > 5000) {
      toast.error("Entered value should be between 0 and 5000")
      return false;
    } 
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = emptyInput(e)
    const isValidRange = validRange(e)
    
    if(isValid && isValidRange) {
      setQuestionTwo(true)
    } else {
      return false
    }
  }

  const onChange = (e) => {
    if (e.target.value >= 2000 && e.target.value <= 2499) {
      setGold(true)
      setPlat(false)
      setDiamond(false)
      updateState(e)
      return true;
    } else if (e.target.value >= 2500 && e.target.value <= 2999) {
      setGold(false)
      setPlat(true)
      setDiamond(false)
      updateState(e)
      return true;
    } else if (e.target.value >= 3000 && e.target.value <= 3499) {
      setGold(false)
      setPlat(false)
      setDiamond(true)
      updateState(e)
      return true;
    } else if (e.target.value >= 3500 && e.target.value <= 3999) {
      setGold(false)
      setPlat(false)
      setDiamond(false)
      setMaster(true)
      updateState(e)
      return true;
    } else {
      updateState(e)
      return false;
    }
  }

  return (
    <>
      <div className="second__data">
        <form onSubmit={(e)=> handleSubmit(e)} className={`second__data-form ${questionTwo === true ? "second__data-form-disappear": " "}`}>
          <legend className="second__data-title"> What's your current SR?</legend>
          <img src={gold} className={`img ${goldl === true ? "img-visible": " "}`} alt="gold Icon"/>
          <img src={plat} className={`img ${platl === true ? "img-visible": " "}`} alt="plat Icon"/>
          <img src={diamond} className={`img ${diamondl === true ? "img-visible": " "}`} alt="diamond Icon"/>
          <img src={master} className={`img ${masterl === true ? "img-visible": " "}`} alt="master Icon"/>
          <div className="second__data-content">
            <label className="second__data-label" htmlFor="point"> Please enter here: </label>
            <input className="second__data-input" name="point" type="number" pattern="^-?[0-9]\d*\.?\d*$" onChange={(e) => {onChange(e)}}/>
          </div>
          <button className="second__data-button"> Submit </button>
        </form>
      </div> 
    </>
  )
}
export default QuestionTwo