import { useState } from 'react'


const StatisticLine = (props) => {
  return(
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) =>
{
  const sum = props.good + props.neutral + props.bad;
  if ( sum == 0){
    return (
      <div>
        <h1>No feedback given</h1>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text='average' value={(props.good * 1 + props.neutral * 0 + props.bad * (-1))/sum} />
      <StatisticLine text='positive' value={`${parseFloat(props.good / sum) * 100 } %`}/> 
    </div>
  )
}


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
