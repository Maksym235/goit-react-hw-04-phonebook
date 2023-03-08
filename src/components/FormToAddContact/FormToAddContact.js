import { useState } from 'react';
import { nanoid } from 'nanoid';
import { FormStyled, Input, Label, Button } from './FormToAddContact.styled';
import PropTypes from 'prop-types';

export function Form({ onHandlerSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onHandlerChange = evt => {
    switch (evt.target.name) {
      case 'name':
        setName(evt.target.value);
        break;
      case 'number':
        setNumber(evt.target.value);
        break;
      default:
        return;
    }
  };

  const onFormSubmmit = evt => {
    evt.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onHandlerSubmit(newContact);

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyled onSubmit={onFormSubmmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="enter name"
          onChange={onHandlerChange}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="enter number"
          onChange={onHandlerChange}
        />
      </Label>
      <Button>Add contact</Button>
    </FormStyled>
  );
}

Form.propTypes = {
  onHandlerSubmit: PropTypes.func.isRequired,
};
