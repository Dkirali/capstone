import { useState } from 'react'
import "./QuestionOne.scss"
import bronze from '../../assets/images/Ranks/bronze.png'
import silver from '../../assets/images/Ranks/silver.png'
import gold from '../../assets/images/Ranks/gold.png'
import plat from '../../assets/images/Ranks/platinum.png'
import diamond from '../../assets/images/Ranks/diamond.png'
import master from '../../assets/images/Ranks/master.png'
import GM from '../../assets/images/Ranks/grandmaster.png'

function QuestionOne({dispatch,id}) {
  const [questionOne,setQuestionOne] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuestionOne(true)
  }

  return (
    <>
      <div className={`userdata__collect ${questionOne === true ? "userdata__collect-disappear": " "}`}>
        <form  onSubmit={(e) => {handleSubmit(e)}} className="userdata__form">
          <div className="userdata__collect-top">
            <legend className="userdata__collect-title"> What's your current division?</legend>
          </div>
          <div className="userdata__collect-bottom">
            <div className="userdata__left">
              <div className="userdata__box">
                <label className="userdata__label" htmlFor="bronze"> Bronze (1 - 1499)
                  <input className="userdata__input" name="rank" type="radio" value="bronze" id="bronze" onChange={() => {dispatch({type: "updateRank", payload:"bronze"})}} onClick={(e) => handleSubmit(e)}/>
                  <img src={bronze} alt="bronze rank logo" className="userdata__image"/>
                </label>
              </div>
              <div className="userdata__box">
                <label className="userdata__label" htmlFor="silver"> Silver (1500 - 1999)
                  <input className="userdata__input" name="rank" type="radio" value="silver" id="silver" onChange={() => {dispatch({type: "updateRank", payload:"silver"})}} onClick={(e) => handleSubmit(e)}/>
                  <img src={silver} alt="silver rank logo" className="userdata__image"/>
                </label>
              </div>
            </div>
            <div className="userdata__middle">
              <div className="userdata__box">
                <label className="userdata__label" htmlFor="gold"> Gold (2000 - 2499) 
                  <input className="userdata__input" name="rank" type="radio" value="gold" id="gold" onChange={() => {dispatch({type: "updateRank", payload:"gold"})}} onClick={(e) => handleSubmit(e)}/>
                  <img src={gold} alt="gold rank logo" className="userdata__image"/>
                </label>
              </div>
              <div className="userdata__box">
                <label className="userdata__label" htmlFor="plat"> Platinum (2500 - 2999)
                  <input className="userdata__input" name="rank" type="radio" value="plat" id="plat" onChange={() => {dispatch({type: "updateRank", payload:"plat"})}} onClick={(e) => handleSubmit(e)}/>
                  <img src={plat} alt="platinum rank logo" className="userdata__image"/>
                </label>
              </div>
            </div>
            <div className="userdata__middle">
              <div className="userdata__box">
                <label className="userdata__label" htmlFor="diamond"> Diamond (3000 - 3499) </label>
                  <input className="userdata__input" name="rank" type="radio" value="diamond" id="diamond" onChange={() => {dispatch({type: "updateRank", payload:"diamond"})}} onClick={(e) => handleSubmit(e)}/>
                  <img src={diamond} alt="diamond rank logo" className="userdata__image-diamond"/>
              </div>
              <div className="userdata__box">
                <label className="userdata__label" htmlFor="master"> Master (3500 - 3999)
                  <input className="userdata__input" name="rank" type="radio" value="master" id="master" onChange={() => {dispatch({type: "updateRank", payload:"master"})}} onClick={(e) => handleSubmit(e)}/>
                  <img src={master} alt="master rank logo" className="userdata__image"/>
                </label>
              </div>
            </div>
            <div className="userdata__right">
              <div className="userdata__box-gm">
                <label className="userdata__label" htmlFor="grandmaster"> GrandMaster (4000 +) 
                  <input className="userdata__input" name="rank" type="radio" value="grandmaster" id="grandmaster" onChange={() => {dispatch({type: "updateRank", payload:"grandmaster"})}} onClick={(e) => handleSubmit(e)}/> 
                  <img src={GM} alt="grandmaster rank logo" className="userdata__image"/>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
export default QuestionOne
