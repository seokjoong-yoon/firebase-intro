import React, {useState, useEffect} from 'react'
import AppRouter from './Router'
import {authService} from '../fbase'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // authService.currentUser returns User or null
                                                    // after a few seconds. it have to be awaited.
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true) // used when loading because onAuthStateChanged() takes some times.
    });
  }, []) // adding empty array to second parameter makes Effect fired just when 1. mounted, and 2. unmounted

  return (
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "initializing..."}
      </>
  );
}

export default App;
