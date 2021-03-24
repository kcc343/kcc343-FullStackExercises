import React from 'react';

const Person = ({list, handleDeletion}) => {
  return (
    list.map(person => 
      <div key={person.name}>
        {person.name} {person.phone}
        <button onClick={() => handleDeletion(person.name, person.id)}>delete</button>
      </div>
    )
  )
}

export default Person