import React, { useState } from "react";
import "./AddContact.css";
import UserExistMessage from "./UserExistMessage/UserExistMessage";
import AddFormFeeling from "./AddFormFeeling/AddFormFeeling";

const AddContact = ({ contacts, addToList }) => {
  const [isExist, setIsExist] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  //Add Contact Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  //User Exist Message
  const userExistMessage = () => {
    return isExist && <UserExistMessage name={name} />;
  };

  //Check Contact form Feeling
  const addFormFeeling = () => {
    return isEmpty && <AddFormFeeling />;
  };

  //Add New Contact
  const addContact = (name, phone) => {
    //New Contact
    const person = {
      id: Date.now(),
      name,
      phone,
    };

    const userExists = (name) => {
      return contacts.some(function (item) {
        return item.name === name;
      });
    };

    //Check for Input not empty
    if (name && phone) {
      //If Contact doesn't exist add to contact list
      if (!userExists(name)) {
        const contactsCopy = JSON.parse(localStorage.getItem("contacts"));
        contactsCopy.unshift(person);

        //Add to State
        localStorage.setItem("contacts", JSON.stringify(contactsCopy));

        addToList([...contactsCopy]);

        setName("");
        setPhone("");
      } else {
        setIsExist(true);
        setTimeout(() => (setIsExist(false), setName(""), setPhone("")), 2000);
      }
    } else {
      setIsEmpty(true);
      setTimeout(() => setIsEmpty(false), 2000);
    }
  };

  return (
    <div className="contact-add">
      {userExistMessage()}
      {addFormFeeling()}
      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      {/*Allow type only numbers*/}
      <input
        value={phone}
        pattern="[0-9]*"
        placeholder="Phone"
        onChange={(e) =>
          setPhone((v) => (e.target.validity.valid ? e.target.value : v))
        }
      />

      <button className="btn btn-blue" onClick={() => addContact(name, phone)}>
        Add Contact
      </button>
    </div>
  );
};

export default AddContact;
