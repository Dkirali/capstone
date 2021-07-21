import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./QuestionSix.scss"

function QuestionSix({dispatch,id})  {
  const [questionSix,setquestionSix] = useState(false)
  const [value, setValue] = useState("");

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  

  useEffect(() => {
    const timeoutId = setTimeout(() => dispatch({type: "updateDescription", payload:value}), 2000);
    return () => clearTimeout(timeoutId);
  }, [value,dispatch]);
 

  const handleSubmit = (e) => {
    setquestionSix(true)

  }



  return (
    <>
      <div className="sixth__data">
        <form className={`sixth__data-form ${questionSix === true ? "sixth__data-form-disappear": " "}`}>
          <legend className="sixth__data-title"> Please write a brief description about yourself, this will encourage other gamers to get in touch with you!</legend>
          <div className="sixth__data-content">
            <label className="sixth__data-label" htmlFor="description"> Please enter here: </label>
            <textarea className="sixth__data-input" name="description" placeholder="Maximum is 40 characters" onChange={(e)=> handleOnChange(e)} maxLength="40"/>
          </div>
          <Link to={`/homepage/${id}`}>
            <button className="sixth__data-button" onClick={(e) => handleSubmit(e)}>Submit</button>
          </Link>
        </form>
      </div> 
    </>
  )
}
export default QuestionSix