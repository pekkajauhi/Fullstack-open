import React from 'react'

const Filter = ({filterValue, handleFilterChange}) => {
    return (
    <div>
          filter shown with <input onChange={handleFilterChange} value={filterValue}/>
    </div>
    )
  }

  export default Filter