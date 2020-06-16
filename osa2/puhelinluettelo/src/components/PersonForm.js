import React from 'react'



const PersonForm = ({newName, newNumber, addNumber, handleChange, handleNumberChange}) => {
  return (
    <form onSubmit={addNumber}>
        <div>
          name: <input onChange={handleChange} value={newName}/>

        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm