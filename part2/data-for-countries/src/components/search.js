import React from 'react';

const Search = ({handle}) => {
  return (
    <div>
      <input onChange={handle} />
    </div>
  )
}

export default Search