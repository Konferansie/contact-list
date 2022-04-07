import React, {useEffect, useState} from 'react'
import axios from "axios";
import ContactsList from "./Components/ContactsList/ContatsList";

import './App.css';
import SearchForm from "./Components/SearchForm/SeachForm";
import AddContact from "./Components/AddContact/AddContact";
import ModalEdit from "./Components/Modal/ModaEdit/ModalEdit";
import UserExistMessage from "./Components/UserExistMessage/UserExistMessage";
import AddFormFeeling from "./Components/AddFormFeeling/AddFormFeeling";

function App() {

    //State
    const [contacts, setContacts] = useState([]);
    const [searchContact, setSearchContact] = useState('');
    const [showModal, setShowModal] = useState(false);

    //State for Edit Modal
    const [editableName, setEditableName] = useState('');
    const [editablePhone, setEditablePhone] = useState('');
    const [editableId, setEditableId] = useState('');
    const [isExist, setIsExist] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const [sort, setSort] = useState(false)

    //Get Data from API and set to state
    useEffect(async () => {
        if (localStorage.getItem('contacts') === null) {
            //Get Data from API
            const result = await axios(
                'https://demo.sibers.com/users',
            );
            // storing contacts
            localStorage.setItem('contacts', JSON.stringify(result.data));
        }

        const items = JSON.parse(localStorage.getItem('contacts'));
        if (items) {
            setContacts(items);
        }
    }, []);


    //User Exist Message
    const userExistMessage = () => {
        return isExist && <UserExistMessage/>
    }

    //Check Contact form Feeling
    const addFormFeeling = () => {
        return isEmpty && <AddFormFeeling/>
    }

    //Add New Contact
    const addContact = (name, phone) => {

        //New Contact
        const person = {
            id: Date.now(),
            name,
            phone,
        }


        //Check if Contact Exist
        const userExists = (name) => {
            return contacts.some(function (item) {
                return item.name === name;
            });
        }


        //Check for Input not empty
        if (name && phone) {

            //If Contact doesn't exist add to contact list
            if (!userExists(name)) {
                const contactsCopy = JSON.parse(localStorage.getItem("contacts"));
                contactsCopy.unshift(person)

                //Add to State
                localStorage.setItem('contacts', JSON.stringify(contactsCopy));
                setContacts(contactsCopy)
            } else {
                setIsExist(true);
                setTimeout(() => setIsExist(false), 4000)
            }
        } else {
            setIsEmpty(true);
            setTimeout(() => setIsEmpty(false), 4000)
        }
    }

    //Delete contact from localStorage and state
    const deleteContact = (id) => {
            const items = JSON.parse(localStorage.getItem('contacts'));
            const filteredArr = items.filter(item => item.id !== id);
            localStorage.setItem('contacts', JSON.stringify(filteredArr));
            setContacts(filteredArr);
            modalClose()

        }

    //Search Input handler
    const handleSearchChange = (searchValue) => {
        setSearchContact(searchValue);
    };

    const editableNameHandler = (name) => {
        setEditableName(name);
    }
    const editablePhoneHandler = (phone) => {
        setEditablePhone(phone);
    }

    //Edit Contact
    function editContact(name, phone) {

        const editedContact = contacts.map(contact => {
            // if this task has the same ID as the edited contact

            if (editableId === contact.id) {
                //
                return {...contact, name, phone}
            }

            return contact
        });
        setContacts(editedContact);
        setShowModal(false)
    }

    //Sort Contacts List A-Z, Z-A
    const sortContacts = () => {
        let sorted = [];
        setSort(!sort);

        if (!sort) {
            sorted = [...filtered].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            setContacts(sorted)
        } else {
            sorted = [...filtered].sort((b, a) => ((b.name < a.name) ? 1 : (a.name < b.name) ? -1 : 0))
            setContacts(sorted);
        }
    }

    //set props to Edit Modal
    const EditModal = () => {
        const customClasses = 'ediModal';

        return showModal && <ModalEdit
            customClasses={customClasses + ' open'}
            name={editableName}
            phone={editablePhone}
            editName={editableNameHandler}
            editPhone={editablePhoneHandler}
            editableId={editableId}
            editContact={editContact}
            modalClose={modalClose}
            deleteContact={deleteContact}
        />

    }

    //Show Modal with editable contact
    const showModalHandler = (id) => {
        setShowModal(!showModal);
        const contact = contacts.filter(item => item.id === id);

        //Send data to Modal's Form
        setEditableName(contact[0].name)
        setEditablePhone(contact[0].phone)
        setEditableId(contact[0].id)
    }

    //Modal Close
    const modalClose = () => {
        setShowModal(false);
    }


    //Search - Filter List - filter by Name or Phone Number
    const filtered = !searchContact
        ? contacts
        : contacts.filter((person) =>
            person.name.toLowerCase().includes(searchContact.toLowerCase()) ||
            person.phone.toLowerCase().includes(searchContact.toLowerCase())
        );

    return (
        <div className="App">
            {userExistMessage()}
            {addFormFeeling()}
            <div className="contacts-total">Total Contacts: {filtered.length}</div>

            <AddContact addContact={addContact}/>
            <div className="search-sort">
                <SearchForm changeSearch={handleSearchChange} searchContact={searchContact}/>
                <div className="btn-filter" onClick={() => sortContacts()}/>
            </div>

            <ContactsList contacts={filtered}
                          deleteContact={deleteContact}
                          showModalHandler={showModalHandler}
            />
            {EditModal()}

        </div>
    );
}

export default App;
