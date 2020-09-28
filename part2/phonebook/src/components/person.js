import React from 'react';

const Person = ({list}) => {
  return (
    list.map(person => 
      <div key={person.name}>{person.name} {person.number}</div>
    )
  )
}

export default Person