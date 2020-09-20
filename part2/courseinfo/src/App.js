import React from 'react'
import Course from './course'

const App = ({course}) => {
   
  return (
    <>
      {course.map(course =>
        <Course key={course.id} course={course} />
      )}
    </>
  )
}
export default App
