import {useState, useEffect} from "react";
import ContactForm from "components/ContactForm/ContactForm";
import Filter from "components/Filter/Filter";
import ContactList from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid'

const TEST_CONTACTS = [
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
      ]


const App = () => {

  const [contacts, setContacts] = useState(()=> {return JSON.parse(window.localStorage.getItem('contacts')) ?? TEST_CONTACTS});
  const [filter, setFilter] = useState('')

  const addContact = contact => {

    if(contacts.some(c => c.name ===contact.name)) {
      alert(contact.name +' is already in contacts')
      return
    }

    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    }

    setContacts([...contacts, newContact])

  }

  useEffect(() => {localStorage.setItem('contacts', JSON.stringify(contacts))}, [contacts])

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !==contactId))
  }


  const handleFilterChange = event => {
    setFilter(event.currentTarget.value)
  }

  const getVisibleContacts = () => {
    const normilizedFilter = filter.toLowerCase();

    const result = contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter))
    return result;
  }

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}/>

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <ContactList contacts={getVisibleContacts()} onDeleteContact={deleteContact}/>
    </div>
  )
}

export default App;
