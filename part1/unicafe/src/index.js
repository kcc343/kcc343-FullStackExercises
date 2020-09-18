import React, {useState} from 'react'
import ReactDOM from 'react-dom';

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  let avg = (props.good - props.bad) / total
  let positive = props.good / total
  if (total === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <Statistic text="good" value={props.good}></Statistic>
          <Statistic text="neutral" value={props.neutral}></Statistic>
          <Statistic text="bad" value={props.bad}></Statistic>
          <Statistic text="total" value={total}></Statistic>
          <Statistic text="average" value={avg}></Statistic>
          <Statistic text="positive average" value={positive * 100 + "%"}></Statistic>
        </tbody>
      </table>
    </>
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
    <>
      <h1>Give Feedback on Our Service</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good"></Button>
        <Button handleClick={() => setNeutral(neutral +1)} text="neutral"></Button>
        <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      </div>
      <h1>Statistics</h1>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
