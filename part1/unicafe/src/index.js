import React, {useState} from 'react'
import ReactDOM from 'react-dom';

const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  let avg = (props.good - props.bad) / total
  let positive = props.good / total

  return (
    <>
      <p>good: {props.good}</p>
      <p>neutral: {props.neutral}</p>
      <p>bad: {props.bad}</p>
      <p>total: {total}</p>
      <p>average: {avg}</p>
      <p>positve avg: {positive * 100}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback on Our Service</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h1>Statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
