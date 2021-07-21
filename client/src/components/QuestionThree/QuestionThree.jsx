import { useState } from 'react'
import "./QuestionThree.scss"

function QuestionThree({dispatch}) {
  const [questionThree,setQuestionThree] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestionThree(true)
  }

  return (
    <>
      <div className="third__data">
        <form className={`third__data-form ${questionThree === true ? "third__data-form-disappear": " "}`}>
          <legend className="third__data-title"> Which platform are you on?</legend>
          <div className="third__data-content">
            <div className="third__data-content-top">
              <div className="third__data-box">
                <label className="third__data-label" htmlFor="psn"> Playstation
                <input className="third__data-input" name="platform" type="radio" value="psn" id="psn" onChange={() => {dispatch({type: "updatePlatform", payload:"playstation"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div>
              <div className="third__data-box">
                <label className="third__data-label" htmlFor="xbox"> Xbox
                <input className="third__data-input" name="platform" type="radio" value="xbox" id="xbox" onChange={() => {dispatch({type: "updatePlatform", payload:"xbox"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div>   
            </div>
            <div className="third__data-content-bottom">
              <div className="third__data-box">
                <label className="third__data-label" htmlFor="nintendo"> Nintendo
                <input className="third__data-input" name="platform" type="radio" value="nintendo" id="nintendo" onChange={() => {dispatch({type: "updatePlatform", payload:"nintendo"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div> 
              <div className="third__data-box">
                <label className="third__data-label" htmlFor="pc"> PC 
                <input className="third__data-input" name="platform" type="radio" value="pc" id="pc" onChange={() => {dispatch({type: "updatePlatform", payload:"pc"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div> 
            </div>
          </div>
        </form>
      </div> 
    </>
  )
}
export default QuestionThree