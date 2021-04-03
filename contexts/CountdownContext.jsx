import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengeContext';

export const CountdownContext = createContext({});
let CountdownTimeOut;

export function CountdownProvider({ children }) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); 
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      CountdownTimeOut = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]); 

  function resetCountdown() {
    clearTimeout(CountdownTimeOut);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  return (
    <CountdownContext.Provider value={{
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        resetCountdown, 
        startCountdown 
       }}>
      {children}
    </CountdownContext.Provider>
  );
}
