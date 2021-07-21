import { useState } from 'react'
import "./QuestionFour.scss"

function QuestionFour({dispatch}) {
  const [questionFour,setQuestionFour] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestionFour(true)
  }
  return (
    <>
      <div className="fourth__data">
        <form className={`fourth__data-form ${questionFour === true ? "fourth__data-form-disappear": " "}`}>
          <legend className="fourth__data-title"> Which role would you prefer to play?</legend>
          <div className="fourth__data-content">
            <div className="fourth__data-content-top">
              <div className="fourth__data-box">
                <label className="fourth__data-label" htmlFor="tank"> Tank 
                <input className="fourth__data-input" name="role" type="radio" value="tank" id="tank" onChange={() => {dispatch({type: "updateRole", payload:"tank"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div>
              <div className="fourth__data-box">
                <label className="fourth__data-label" htmlFor="healer"> Healer
                <input className="fourth__data-input" name="role" type="radio" value="healer" id="healer" onChange={() => {dispatch({type: "updateRole", payload:"healer"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div>   
            </div>
            <div className="fourth__data-content-bottom">
              <div className="fourth__data-box">
                <label className="fourth__data-label" htmlFor="dps"> DPS 
                <input className="fourth__data-input" name="role" type="radio" value="dps" id="dps" onChange={() => {dispatch({type: "updateRole", payload:"damage"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div> 
              <div className="fourth__data-box">
                <label className="fourth__data-label" htmlFor="flex"> Flex
                  <input className="fourth__data-input" name="role" type="radio" value="flex" id="flex" onChange={() => {dispatch({type: "updateRole", payload:"flex"})}} onClick={(e) => handleSubmit(e)}/>
                </label>
              </div> 
            </div>
          </div>
        </form>
      </div> 
    </>
  )
}
export default QuestionFour