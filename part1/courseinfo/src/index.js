import React from 'react';
import ReactDOM from 'react-dom';

const Header = (obj) => {
  console.log(obj)
  return (
    <div>
      <h1>{obj['course'].name}</h1>
    </div>
  )
}

const Content = (obj) => {
  let arr = obj.parts
  const [partOne, partTwo, partThree] = arr
  return (
    <div>
      <Part part={partOne.name} number={partOne.exercises}/>
      <Part part={partTwo.name} number={partTwo.exercises} />
      <Part part={partThree.name} number={partThree.exercises} />
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
  let arr = obj.parts
  const [partOne, partTwo, partThree] = arr
  let total = partOne.exercises + partTwo.exercises + partThree.exercises
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamanetals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
