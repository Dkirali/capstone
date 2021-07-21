import { useEffect, useState } from 'react'
import profile from "../../assets/logo/profile.png"
import rein from "../../assets/images/reino.png"
import soldier from "../../assets/images/sold.png"
import ana from "../../assets/images/ana.png"
import flex from "../../assets/images/flex.png"
import HomeWelcomeUser from '../HomeWelcomeUser/HomeWelcomeUser'
import HomeWelcomeText from '../HomeWelcomeText/HomeWelcomeText'
import twitter from "../../assets/socials/twitter.svg"
import facebook from "../../assets/socials/facebook.svg"
import youtube from "../../assets/socials/youtube.svg"
import insta from "../../assets/socials/insta.svg"

import axios from "axios"
import "./HomePage.scss"


const baseUrl = 'http://localhost:8080/api/users';

const Capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
} 

function HomePage(props) {
  const { id } = props.match.params
  const formattedId = parseInt(id.split(":")[1])

  const [currentUser, setCurrentUser] = useState([])
  const [allUsers,setAllUsers] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/homepage`)
    .then(user => {
    const findCurrentUser = user.data.find(res => res.id === formattedId)
    const allUsers = user.data.filter(res => res.id !== formattedId)
    setCurrentUser(findCurrentUser)
    setAllUsers(allUsers)
    })
    .catch(err => {
      console.log("error", err)
    })

  },[setCurrentUser, setAllUsers,formattedId])

  useEffect(() => {
    axios.get(`${baseUrl}/userprofile`)
    .then(user => {
    console.log(user)
    })
    .catch(err => {
      console.log("error", err)
    })

  },)


 
  return (
    <>
    <header className="header">
        <section className="header__nav">
            <nav className="nav__container">
                <div className="nav__container-left">
                  <div className="nav__container-box facebook">
                    <div className="nav__container-tooltip">Facebook</div>
                    <img className="nav__container-image"src={facebook} alt="facebook logo" />
                  </div>
                  <div className="nav__container-box twitter">
                    <div className="nav__container-tooltip">Twitter</div>
                    <img className="nav__container-image" src={twitter} alt="twitter logo"/>
                  </div>
                </div>
                <ul className="nav__container-list">
                    <img className="nav__container-logo" src={profile} alt="user profile"/>
                </ul>
                <div className="nav__container-right">
                  <div className="nav__container-box instagram">
                    <div className="nav__container-tooltip">Instagram</div>
                    <img className="nav__container-image" src={insta} alt="instagram logo"/>
                  </div>
                  <div className="nav__container-box youtube">
                    <div className="nav__container-tooltip">Youtube</div>
                    <img className="nav__container-image"src={youtube} alt="youtube logo"/>
                  </div>
                </div>
            </nav>
        </section>
    </header>
    <main className="homepage">
      <div className="homepage__hero">
        <HomeWelcomeUser text={`Hello ${currentUser.gamertag}`}/>
        <HomeWelcomeText text={"Here are the matches based on your preferences!"} />
      </div>
      <div className="loki">
      <div className="homepage__content ">
          {allUsers.map((user) => {
            if(user.rank === currentUser.rank && user.crossplay === currentUser.crossplay) {
              return (
                <div className={`homepage__card glow ${user.role === "damage" ? "homepage__card glow-damage": " "} ${user.role === "tank" ? "homepage__card glow-tank": " "} ${user.role === "healer" ? "homepage__card glow-healer": " "} ${user.role === "flex" ? "homepage__card glow-flex": " "}`}>
                <div className="homepage__card-left">
                  <div className="homepage__card-left-content">
                   {user.role === "tank" && <img className="homepage__card-image" src={rein} alt="rein user profile"/>}
                   {user.role === "damage" && <img className="homepage__card-image-damage" src={soldier} alt="soldier user profile"/>}
                   {user.role === "healer" && <img className="homepage__card-image-healer" src={ana} alt="ana user profile"/>}
                   {user.role === "flex" && <img className="homepage__card-image-flex" src={flex} alt="flex user profile"/>}
                  </div>
                  <h4 className="homepage__card-image-title">{user.role.toUpperCase()}</h4>
                </div>
                <div className="homepage__card-right">
                  <p className="homepage__card-text"> Gamertag </p>
                  <p className="homepage__card-input"> {user.gamertag} </p>
                  <p className="homepage__card-text"> Division </p>
                  <p className="homepage__card-input"> {Capitalize(user.rank)} </p>
                  <p className="homepage__card-text"> Current SR </p>
                  <p className="homepage__card-input"> {user.point} </p>
                  <p className="homepage__card-text"> Platform </p>
                  <p className="homepage__card-input"> {Capitalize(user.platform)} </p>
                  <p className="homepage__card-text-description"> Description </p>
                  <p className="homepage__card-description"> {Capitalize(user.description)} </p>
                </div>
              </div>
              )
            } else {
              return (
                null
              )
            }
          })}
      </div>
      </div>
    </main>
    </>
  )
}

export default HomePage
