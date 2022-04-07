import React, {useState} from 'react';
import './AddContact.css'

const AddContact = ({name, phone, addContact, addContactName, addContactPhone}) => {




    return (
        <div className="addContact">

            <input value={name}
                   placeholder="Name"
                   onChange={(e) => addContactName(e.target.value)}/>

            {/*Allow type only numbers*/}
            <input value={phone}
                   pattern="[0-9]*"
                   placeholder="Phone"
                   onChange={(e) => addContactPhone((v) => (e.target.validity.valid ? e.target.value : v))}
            />

            <button className="btn-blue" onClick={() => addContact(name, phone)}>Add Contact</button>

        </div>
    );
};

export default AddContact;