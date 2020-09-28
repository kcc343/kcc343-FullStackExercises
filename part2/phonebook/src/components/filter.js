import React from 'react';

const Filter = ({handle}) => {
  return (
    <div>
      <input onChange={handle} />
    </div>
  )
}

export default Filter