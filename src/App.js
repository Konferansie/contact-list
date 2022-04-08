import React, { useEffect, useState } from "react";
import axios from "axios";

import ContactsList from "./Components/ContactsList/ContatsList";
import SearchForm from "./Components/SearchForm/SeachForm";
import AddContact from "./Components/AddContact/AddContact";
import ModalEdit from "./Components/Modal/ModaEdit/ModalEdit";

import "./App.css";
import Api from "./api";
import sortContacts from "./Components/ContactsList/sortContacts/sortContacts";
import SortContacts from "./Components/ContactsList/sortContacts/sortContacts";

function App() {
  //State
  const [contacts, setContacts] = useState([]);
  const [searchContact, setSearchContact] = useState("");
  const [showModal, setShowModal] = useState(false);

  //State for Edit Modal`
  const [editableName, setEditableName] = useState("");
  const [editablePhone, setEditablePhone] = useState("");
  const [editableId, setEditableId] = useState("");

  //Get Data from API and set to state
  useEffect(async () => {
    if (localStorage.getItem("contacts") === null) {
      //Get Data from API
      const result = await axios(Api());
      // storing contacts
      localStorage.setItem("contacts", JSON.stringify(result.data));
    }

    const items = JSON.parse(localStorage.getItem("contacts"));
    if (items) {
      setContacts(items);
    }
  }, []);

  //Add Contact to List
  const addContactToState = (list) => {
    setContacts(list);
  };

  //Search Input handler
  const handleSearchChange = (searchValue) => {
    setSearchContact(searchValue);
  };

  const editableNameHandler = (name) => {
    setEditableName(name);
  };
  const editablePhoneHandler = (phone) => {
    setEditablePhone(phone);
  };

  //set props to Edit Modal
  const EditModal = () => {
    const customClasses = "contact--edit-modal";

    return (
      showModal && (
        <ModalEdit
          customClasses={customClasses + " open"}
          name={editableName}
          phone={editablePhone}
          editName={editableNameHandler}
          editPhone={editablePhoneHandler}
          editableId={editableId}
          addContactToState={addContactToState}
          modalClose={modalClose}
          contacts={contacts}
        />
      )
    );
  };

  //Show Modal with editable contact
  const showModalHandler = (id) => {
    setShowModal(!showModal);
    const contact = contacts.filter((item) => item.id === id);

    //Send data to Modal's Form
    setEditableName(contact[0].name);
    setEditablePhone(contact[0].phone);
    setEditableId(contact[0].id);
  };

  //Modal Close
  const modalClose = () => {
    setShowModal(false);
  };

  //Search - Filter List - filter by Name or Phone Number
  const filtered = !searchContact
    ? contacts
    : contacts.filter(
        (person) =>
          person.name.toLowerCase().includes(searchContact.toLowerCase()) ||
          person.phone.toLowerCase().includes(searchContact.toLowerCase())
      );

  return (
    <div className="app-wrapper">
      <div className="contact-list--total">Total Contacts: {filtered.length}</div>

      <AddContact contacts={contacts} addToList={addContactToState} />

      <div className="search-sort">
        <SearchForm
          changeSearch={handleSearchChange}
          searchContact={searchContact}
        />
        <SortContacts
          filtered={filtered}
          addContactToState={addContactToState}
        />
      </div>

      <ContactsList contacts={filtered} showModalHandler={showModalHandler} />
      {EditModal()}
    </div>
  );
}

export default App;
