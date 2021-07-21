import { useState } from 'react'
import "./QuestionFive.scss"

function QuestionFive({dispatch})  {
  const [questionSeven,setQuestionSeven] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestionSeven(true)
  }

  return (
    <>
      <div className="fifth__data">
        <form className={`fifth__data-form ${questionSeven === true ? "fifth__data-form-disappear": " "}`}>
          <legend className="fifth__data-title"> Do you want us to match you with players from other platforms?</legend>
          <div className="fifth__data-content">
            <div className="fifth__data-content-top">
              <label className="fifth__data-label" htmlFor="yes"> Yes
                <input className="fifth__data-input" name="crossplay" type="radio" value="yes" id="yes" onChange={() => {dispatch({type: "updateCrossplay", payload:"yes"})}} onClick={(e) => {handleSubmit(e)}}/>
              </label>
            </div>
            <div className="fifth__data-content-bottom">
              <label className="fifth__data-label" htmlFor="no"> No 
                <input className="fifth__data-input" name="crossplay" type="radio" value="no" id="no" onChange={() => {dispatch({type: "updateCrossplay", payload:"no"})}} onClick={(e) => {handleSubmit(e)}}/>
              </label>
            </div>
          </div>
        </form>
      </div> 
    </>
  )
}
export default QuestionFive