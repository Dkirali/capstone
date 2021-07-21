import React from 'react'
import { useReducer,useEffect } from 'react'
import './UserData.scss'
import video from '../../assets/videos/neon.mp4'
import QuestionOne from '../QuestionOne/QuestionOne'
import QuestionTwo from '../QuestionTwo/QuestionTwo'
import QuestionThree from '../QuestionThree/QuestionThree'
import QuestionFour from '../QuestionFour/QuestionFour'
import QuestionSeven from '../QuestionFive/QuestionFive'
import QuestionEight from '../QuestionSix/QuestionSix'
import axios from 'axios'


const baseUrl = 'http://localhost:8080/api/users';


function UserData(props) {
  const { id } = props.match.params


  const selectedAnswer = {
    rank: '',
    point: '',
    platform:'',
    role:'',
    time:'',
    day: '',
    crossplay:'',
    description:''
  };
 
  const reducer = (state, action) => {
    switch (action.type) {
      case "updateRank":
        return { ...state, rank: action.payload };
      case "updatePoint":
        return { ...state, point: action.payload };
      case "updatePlatform":
        return { ...state, platform: action.payload };
      case "updateRole":
        return { ...state, role: action.payload };
      case "updateCrossplay":
        return { ...state, crossplay: action.payload };
      case "updateDescription":
        return { ...state, description: action.payload };
      default:
        return state;
    }
  };

  useEffect(() => {
    if(state.description !== '') {
      const formattedId = id.split(":")[1]
      axios.put(`${baseUrl}/answers/${formattedId}`, {
        id: formattedId,
        rank: state.rank,
        point: state.point,
        platform: state.platform,
        role: state.role,
        crossplay: state.crossplay,
        description: state.description,
      })
      .then (res => {
        console.log("success")
      })
      .catch (err => {
        console.log(err)
      })
    }
  })

  const [ state, dispatch ] = useReducer(reducer, selectedAnswer)
  
  return (
    <>
      <div className="userdata">
        <video className="userdata__video" autoPlay loop muted >
          <source src={video} type="video/mp4"/>
        </video>
        <QuestionOne  dispatch={dispatch} />
        <QuestionTwo  dispatch={dispatch} />
        <QuestionThree  dispatch={dispatch} />
        <QuestionFour dispatch={dispatch} />
        <QuestionSeven dispatch={dispatch} />
        <QuestionEight dispatch={dispatch} id={id} />
      </div> 
    </>
  )
}

export default UserData


