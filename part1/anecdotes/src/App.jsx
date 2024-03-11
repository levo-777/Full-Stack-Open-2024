import { useState } from 'react'


const Button = (props) => {
  return (
      <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Title = (props) => 
{
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Anecdotes = (props) => {
  return(
    <div>
      <div>{props.anecdotes}</div>
    </div>
  )
}

const MostVotes = (props) => {
  if(Math.max(...props.points) <= 0)
  {
    return(
      <>
      <p></p>
      </>
    )
  }
  else
  {
    const index = props.points.indexOf(Math.max(...props.points));
    return(
      <div>
        <Anecdotes anecdotes={props.anecdotes[index]} />
        <p>votes: {Math.max(...props.points)}</p>
      </div>
      
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  

  const handleNextAnecdoteClick =() => 
  {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const handleClickVoteAnecdote = () => 
  {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints);
  }

  return (
    <div>
      <Title  text='Anecdote of the day'/>
      <Anecdotes anecdotes={anecdotes[selected]}/>
      <Button handleClick={handleClickVoteAnecdote} text="vote"/>
      <Button handleClick={handleNextAnecdoteClick} text="next anecdote"/>
      <Title text='Anecdote with most votes'/>
      <MostVotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
