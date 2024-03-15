import { useEffect, useState } from 'react';
import personServices from './services/person';

const Header = ({ text }) => (
  <div>
    <h2>{text}</h2>
  </div>
);

const FilterPersons = ({ filterPersonName, handleFilterPersons }) => (
  <div>
    <label>Filter: </label>
    <Input value={filterPersonName} handleNewChange={handleFilterPersons} />
  </div>
);

const Input = ({ value, handleNewChange }) => (
  <div>
    <input value={value} onChange={handleNewChange} />
  </div>
);

const Button = ({ type, text, handleNewChange }) => (
  <button type={type} onClick={handleNewChange}>
    {text}
  </button>
);

const AddPersonForm = ({ newName, newPhoneNumber, handleNewName, handleNewPhoneNumber, onSubmit }) => (
  <div>
    <Header text="Add Person" />
    <form onSubmit={onSubmit}>
      <label>Name:</label>
      <Input value={newName} handleNewChange={handleNewName} />
      <label>Number:</label>
      <Input value={newPhoneNumber} handleNewChange={handleNewPhoneNumber} />
      <br/>
      <Button text="add" type="submit" />
    </form>
  </div>
);

const People = ({ name, number, id, handleNewChange}) => (
  <div>
    <li>{name} {number} <Button text="delete" handleNewChange={()=>handleNewChange(id)}/></li>
  </div>
);

const Persons = ({ personsAfterFilter, handleNewChange }) => (
  <div>
    {personsAfterFilter.map((person, index) => (
      <People key={person.props.id} name={person.props.name} number={person.props.number} id={person.props.id} handleNewChange={handleNewChange}/>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [filterPersonName, setFilterPersonName] = useState('');
  const [changeMessage, setChangeMessage] = useState('')

  useEffect(() => {
    personServices.getAll().then(initialResult => {
      setPersons(initialResult);
    });
  }, []);

  const handleNewName = event => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = event => {
    setNewPhoneNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }

    const checkName = persons.find(props => props.name.toLowerCase() === newPerson.name.toLowerCase())
    const changedPerson = { ...checkName, number:newPhoneNumber}

    if(checkName && checkName.number === newPerson.number){
      window.alert(`${newName} is already added to phonebook`)
    }
    else if(checkName && checkName.number !== newPerson.number){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
        personServices
        .updatePerson(checkName.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(n => n.id !== checkName.id? n : returnedPerson))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setChangeMessage(`number of ${newName} is changed`)
          }, 5000)
        })
        .catch(error => {
          setChangeMessage(`Information of ${newName} has already been removed from server`)
        })
      }
    }
    else{
      personServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setChangeMessage(`Successfully added ${newName}`)
        setTimeout(() => {
        setChangeMessage(null)
      }, 5000)
      }) 
      .catch(error => {
        setChangeMessage(`[error] ${error.response.data.error}`)
      })
    }
    setNewName('')
    setNewPhoneNumber('')         
}

  const handleFilterPersonName = event => {
    setFilterPersonName(event.target.value);
  };

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    {
      personServices
      .getDeletePerson(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }
    
  }

  const filter = persons.filter(person =>
    person.name.toLowerCase().includes(filterPersonName.toLowerCase())
  );

  const personAfterFilter = filter.map(props => <People key={props.id} name={props.name} number={props.number} id={props.id}/>);

  return (
    <div>
      <Header text="PhoneBook" />
      <FilterPersons filterPersonName={filterPersonName} handleFilterPersons={handleFilterPersonName} />
      <AddPersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNewName={handleNewName}
        handleNewPhoneNumber={handleNewPhoneNumber}
        onSubmit={addPerson}
      />
      <Header text="Persons" />
      <Persons personsAfterFilter={personAfterFilter} 
               handleNewChange={deletePerson} 
      />
    </div>
  );
};

export default App;
