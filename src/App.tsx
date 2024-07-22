import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'


type timerCurrentStateIsProps = 'STOPPED' | 'RUNNING' | 'PAUSED';

function formatSecondsToMinutesSeconds(seconds: number){
  return(seconds-(seconds%=60))/60+(9<seconds?':':':0')+seconds
}

function App() {
  const [initialTime, setInitialTime] = useState<number>(25); //in minutes
  const [timer, setTimer] = useState<number>(1500); // 25 minutes by default
  const [timeInterval, setTimeInterval] = useState<number>(0);
  const [timerCurrentState, setTimerCurrentState] = useState<timerCurrentStateIsProps>('STOPPED');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function pauseTimer() {
    if(timerCurrentState === 'RUNNING') {
      clearInterval(timeInterval);
      setTimerCurrentState('PAUSED');
    }
  }

  function stopTimer() {
    if(timerCurrentState === ('RUNNING' || 'PAUSED')) {
      setTimer(initialTime * 60);
      clearInterval(timeInterval);
      setTimerCurrentState('STOPPED');
    }
  }


  function startTimer() {
      if(timerCurrentState === 'RUNNING') return;
      if(timerCurrentState === 'STOPPED') {
        //setTimer(initialTime * 60);
        setTimer(5); // for debugging
      }
      setTimerCurrentState('RUNNING');
      setTimeInterval(setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000));

    }


  function handleTimerChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInitialTime(Number(e.target.value))
    setTimer(Number(e.target.value) * 60);
  }
  
  useEffect(() => {
    if(timer <= 0) {
      stopTimer();
      alert('Time is up!');
    }
  }, [timer])

  return (
    <>
      <input type="number" value={initialTime} onChange={handleTimerChange}/>
      <h1>
        {formatSecondsToMinutesSeconds(timer)}
      </h1>
      { timerCurrentState === ('STOPPED' || 'PAUSED') &&  <button onClick={startTimer}>PLAY</button> }
      { timerCurrentState === 'RUNNING' && <button onClick={pauseTimer}>PAUSE</button> }
      { timerCurrentState === 'RUNNING' && <button onClick={stopTimer}>STOP</button> }
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} /> }
    </>
  )
}

export default App
