import React from 'react'
import Person from './Person'


const Persons = ({filterValue, persons, removeNumber}) => {
    return (
      <div>
      {
        persons.filter(person => person.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1).map(person => <Person key={person.name} person = {person} removeNumber = {removeNumber}/>)
      }
      </div>
    )
  }

  export default Persons