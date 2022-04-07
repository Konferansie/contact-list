import React, {useState} from 'react';
import './AddContact.css'

const AddContact = (props) => {

    const [contactName, setContactName] = useState('')
    const [contactPhoneNumber, setContactPhoneNumber] = useState('')


    return (
        <div className="addContact">

            <input value={contactName}
                   placeholder="Name"
                   onChange={(e) => setContactName(e.target.value)}/>

            {/*Allow type only numbers*/}
            <input value={contactPhoneNumber}
                   pattern="[0-9]*"
                   placeholder="Phone"
                   onChange={(e) => setContactPhoneNumber((v) => (e.target.validity.valid ? e.target.value : v))}
            />

            <button className="btn-blue" onClick={() => props.addContact(contactName, contactPhoneNumber)}>Add Contact</button>

        </div>
    );
};

export default AddContact;