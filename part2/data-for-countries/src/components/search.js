import React from 'react';

const Search = ({filter, handle}) => {
  return (
    <div>
      <input onChange={handle} />
    </div>
  )
}

export default Search