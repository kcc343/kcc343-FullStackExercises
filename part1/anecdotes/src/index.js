import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => <h1>{props.text}</h1>

const findMaxIndex = (votes) => {
  let max = votes[0]
  let maxIndex = 0
  for (let i = 1; i < 6; i++) {
    if (max < votes[i]) {
      max = votes[i]
      maxIndex = i
    }
  }
  return maxIndex
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  let num = Math.floor(Math.random() * 6)

  const handleVotes = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  let max = findMaxIndex(votes)

  return (
    <div>
      <Heading text="Anecdote of the Day"></Heading>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} vote(s)</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={() => setSelected(num)}>next anecdote</button>
      <Heading text="Anecdote with the Most Votes"></Heading>
      <p>{props.anecdotes[max]}</p>
      <p>has {votes[max]} vote(s)</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debut it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);

