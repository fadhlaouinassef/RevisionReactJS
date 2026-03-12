import { Button, Card } from 'react-bootstrap';
import './App.css';
import EventList from './components/EventList';
import useEvaluationStore from "../ZustandStores/useEvaluationStore";
import { useEffect } from 'react';

function App() {

const evaluation = useEvaluationStore((state) => state.evaluation);

useEffect(() => {
  console.log("Evaluation sélectionnée :", evaluation);
}, [evaluation]);

  return (
    <>
      <EventList />
    </>
  )
}

export default App
