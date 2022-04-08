import React from "react";

import "./ModalEdit.css";

const ModalEdit = ({
  name = "",
  phone = "",
  addContactToState,
  contacts,
  editableId,
  modalClose,
  editPhone,
  editName,
  customClasses,
}) => {
  //Edit Contact

  function editContact(name, phone) {
    const editedContact = contacts.map((contact) => {
      // if this task has the same ID as the edited contact

      if (editableId === contact.id) {
        return { ...contact, name, phone };
      }

      return contact;
    });
    addContactToState(editedContact);
    modalClose();
  }

  //Delete contact from localStorage and state
  const deleteContact = (id) => {
    const items = JSON.parse(localStorage.getItem("contacts"));
    const filteredArr = items.filter((item) => item.id !== id);
    localStorage.setItem("contacts", JSON.stringify(filteredArr));
    addContactToState(filteredArr);
    modalClose();
  };

  return (
    <div className={customClasses}>
      <div className="inner">
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          Contact editing
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => editName(e.target.value)}
        />

        <input
          type="text"
          value={phone}
          pattern="[0-9]*"
          onChange={(e) =>
            editPhone((v) => (e.target.validity.valid ? e.target.value : v))
          }
        />

        <div className="btn-group">
          <button
            className="btn btn-green"
            onClick={() => {
              editContact(name, phone);
            }}
          >
            Save
          </button>
          <button
            className="btn btn-blue"
            onClick={() => {
              modalClose();
            }}
          >
            Cancel
          </button>
          <button className="btn btn-red" onClick={() => deleteContact(editableId)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
