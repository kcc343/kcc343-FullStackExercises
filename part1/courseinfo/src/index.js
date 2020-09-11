import React from 'react';
import ReactDOM from 'react-dom';

const Header = (obj) => {
  return (
    <div>
      <h1>{obj.course}</h1>
    </div>
  )
}

const Content = (obj) => {
  return (
    <div>
      <Part part={obj.part1} number={obj.exercises1}/>
      <Part part={obj.part2} number={obj.exercises2} />
      <Part part={obj.part3} number={obj.exercises3} />
    </div>
  )
}

const Part = (obj) => {
  return (
    <div>
      <p>{obj.part} {obj.number}</p>
    </div>
  )
}

const Total = (obj) => {
  return (
    <div>
      <p>Number of exercises {obj.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamanetals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
