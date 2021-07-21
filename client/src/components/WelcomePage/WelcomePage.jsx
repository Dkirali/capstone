import { useState, useEffect } from "react";
import "./WelcomePage.scss";
import video from "../../assets/videos/newuser.mp4"
import { Redirect } from "react-router-dom";



function WelcomePage(props) {
  const messages = [`Is this actually ${props.data.firstName} ${props.data.lastName}???`, `We've heard rumours of the great ${props.data.gamertag} joining Gamers Unite and didn't believe it`, "I guess we were wrong...", `We don't want to keep the great ${props.data.gamertag} waiting`,"Just a few questions before we can help to find your long lost gaming partner"];
  const id = props.data.id
  const data = props.data.firstName

  const Loader = props => {
    const { messages } = props;
    console.log(`line 15 ${data}`)
    const [messageIndex, setMessageIndex] = useState(0);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
      let timeout;
      if (messageIndex < messages.length - 1) {
        timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 5000);
      }

      return () => {
        clearTimeout(timeout);
        return true;
      };
    }, [messages, messageIndex]);

    useEffect(() => {
      let timer;
      timer = setTimeout(() => setRedirect(true), 6000);
  
      return () => {
        clearTimeout(timer);
      };
    })

    return redirect
    ? <Redirect props={data} to={`/questions/:${id}`} />
    :<div className="welcomepage__text">{messages[messageIndex]}</div>;
    
  };


  return (
    <div className="welcomepage">
      <video className="welcomepage__video" autoPlay loop muted >
        <source src={video} type="video/mp4"/>
      </video>
      <div className="welcomepage__content">
        <Loader messages={messages} />
      </div>
    </div>  
  );
}

export default WelcomePage;



