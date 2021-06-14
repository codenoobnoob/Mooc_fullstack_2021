import React, { useState, useEffect } from "react";
import Persons from "./components/Render";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import notifications from "./components/Notifications"
import personsService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({message: null, isError: false});

  const getDevData = () => {
    personsService.getData().then(initialData => {
      setPersons(initialData)
    }).catch(error => {
      notifications.errorMessage(`Could not connect to the server. Please check server connectivity and refresh the page! ${error}`, true, setMessage)
    })
  }


  useEffect(getDevData, []);
  
 

  const AddName = (e) => {
    e.preventDefault();
    let newMessage = null
    let newIsError = false
    const indexOfExisting = persons.map((person) => person.name).indexOf(newName) 
    if (indexOfExisting !== -1) {
      if (window.confirm(`${newName} is aleady added to phonebook, replace the old number with the new one?`)) {
        newMessage = `${newName} phone number was changed`
        const oldId = persons[indexOfExisting].id
        const updatedPerson = {
          name: newName,
          number: newNumber,
          id: oldId
        }
        personsService.updateData(persons[indexOfExisting].id, updatedPerson).then(returnedPerson => setPersons(persons.map(person => person.id !== oldId ? person : returnedPerson))).catch(error => {
          newMessage = "error while trying to update person"
          newIsError = true
        })
      }
    } else {
      newMessage = `${newName} added to phonebook`
      const newPerson = {
        name: newName,
        number: newNumber,
        id: Math.max(persons.map((person) => person.id) + 1),
      };
      setPersons(
        persons.concat({
          newPerson,
        })
      );
      personsService.addData(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      }).catch(error => {
        newMessage = "error while trying to add person"
        newIsError = true
      })
    }
    setNewName("");
    setNewNumber("");
    notifications.setMessageWithTimeout(newMessage, newIsError, setMessage, 5000)
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };
  const handeleNumberChange = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value);
  };
  const handeleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const deletePerson = (e) => {
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete ${e.target.dataset.fullname}`)) {
      personsService.removeData(e.target.id).then((response) => { 
        if (response) {
          setPersons(persons.filter(person => person.id !== parseInt(e.target.id, 10)))
          notifications.setMessageWithTimeout(`Person ${e.target.dataset.fullname} was removed from the server`, false, setMessage, 5000)
        } 
      }).catch(error => {
        notifications.setMessageWithTimeout(`Person ${e.target.dataset.fullname} was already removed from the server, Please refresh the page.`, true, setMessage, 5000)
      })
    }

  }

  return (
    <div className="mainWindow">
      <h1>Phonebook</h1>
      <notifications.NotificationMessage key="messages" message={message.message} isError={message.isError} />
      <Filter key="filter" filter={filter} handeleFilterChange={handeleFilterChange} />
      <PersonForm
        key="personform"
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handeleNumberChange={handeleNumberChange}
        addName={AddName}
      />
      <h2>Numbers</h2>
      <Persons key="persons" persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>  
  );
};

export default App;
