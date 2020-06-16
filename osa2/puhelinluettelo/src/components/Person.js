import React from 'react'

const Person = ({person, removeNumber}) => {
    return (
      <p>{person.name} {person.number} <button onClick={() => removeNumber(person.id)}>delete</button></p>
    )
  }

  export default Person