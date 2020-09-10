import React from 'react';
import ReactDOM from 'react-dom';

const Header = (obj) => {
  return (
    <>
      <h1>{obj.course}</h1>
    </>
  )
}

const Content = (obj) => {
  return (
    <>
      <p>
        {obj.part1} {obj.exercises1}
      </p>
      <p>
        {obj.part2} {obj.exercises2}
      </p>
      <p>
        {obj.part3} {obj.exercises3}
      </p>
    </>
  )
}

const Total = (obj) => {
  return (
    <>
      <p>Number of exercises {obj.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamanetals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
