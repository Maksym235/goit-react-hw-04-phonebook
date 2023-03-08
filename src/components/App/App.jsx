import { useState, useMemo } from 'react';
import data from 'Data/data.json';
import { Conteiner, Title, ContactsTitle } from './appConteiner.styled';
import { BsFillTelephonePlusFill } from 'react-icons/bs';
import { IoMdContact } from 'react-icons/io';
import { Form } from 'components/FormToAddContact/FormToAddContact';
import { Input } from '../FindInput/FindInput';
import { ContactList } from '../ContactsList/ContactsList';
import { useLocalStorage } from 'components/hooks/useLocalStorage';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', data);
  const [filtered, setFiltered] = useState('');

  const onHandlerChange = evt => {
    setFiltered(evt.currentTarget.value);
  };

  const onHandlerSubmit = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(state => [newContact, ...state]);
  };

  const filtredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filtered.toLocaleLowerCase())
    );
  }, [contacts, filtered]);

  const onDeleteContact = cntId => {
    setContacts(contacts.filter(contact => contact.id !== cntId));
  };

  return (
    <Conteiner>
      <Title>
        PHONEBOOK
        <BsFillTelephonePlusFill />
      </Title>
      <Form onHandlerSubmit={onHandlerSubmit} />
      <ContactsTitle>
        Contacts <IoMdContact />
      </ContactsTitle>
      <Input onHandlerChange={onHandlerChange} />
      <ContactList data={filtredContacts} onDeleteContact={onDeleteContact} />
    </Conteiner>
  );
}
