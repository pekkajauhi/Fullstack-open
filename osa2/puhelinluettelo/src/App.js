import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './App.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('something happened...')
  const [notificationType, setNotificationType] = useState('error')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
    
  }

  const addNumber = (event) => {
    event.preventDefault()
    const numberObject = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)

    if(names.includes(newName)){
      const personToBeUpdated = persons.find(person => person.name === newName)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        personService.update(personToBeUpdated.id, numberObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setNotificationMessage(`Updated number of ${returnedPerson.name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          console.log(notificationMessage)
        })
        .catch(error => {
          console.log('fail')
          setNotificationMessage(`Information of  ${numberObject.name} has already been deleted`)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== numberObject.name))
        })
      }
    }else {
      
      personService
      .create(numberObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        console.log('notification type: ', notificationType)
        console.log(returnedPerson)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteNumber = (id) => {
    console.log('Delete number with id:', id)
    const personToBeRemoved = persons.find(person => person.id === id)

    if (window.confirm(`Do you really want to delete ${personToBeRemoved.name}?`)) { 
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setNotificationMessage(`Deleted number of ${personToBeRemoved.name}`)
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }

    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName = {newName} newNumber = {newNumber} addNumber = {addNumber} handleChange = {handleChange} handleNumberChange = {handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} removeNumber = {deleteNumber}/>
    </div>
  )

}

export default App
