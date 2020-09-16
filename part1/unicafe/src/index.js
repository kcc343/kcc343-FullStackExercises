import React, {useState} from 'react'
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + neutral + bad
  let avg = (good - bad) / total
  let positive = good / total

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
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>total: {total}</p>
        <p>average: {avg}</p>
        <p>positve avg: {positive * 100}%</p>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
