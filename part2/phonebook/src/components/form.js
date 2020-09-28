import React from 'react';

const PersonForm = ({handleAdd, handlePerson, handleNumber}) => {
  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input 
        onChange={handlePerson}
        />
      </div>
      <div>number: <input 
        onChange={handleNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm