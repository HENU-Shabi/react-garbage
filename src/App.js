import React from 'react';
import LogIn from "./component/LogIn";
import './App.css';
import {useCookies} from "react-cookie";
import AppBody from "./component/AppBody";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  let bodyElement;
  if(cookies.token === undefined){
    bodyElement = <LogIn cookie={[cookies, setCookie, removeCookie]}/>
  }else{
    bodyElement = <AppBody cookie={[cookies, setCookie, removeCookie]}/>
  }
  return (
    <div className="App">
      {bodyElement}
    </div>
  );
}

export default App;
