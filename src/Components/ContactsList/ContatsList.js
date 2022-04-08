import React from "react";
import "./ContactList.css";

const ContactsList = ({ contacts, showModalHandler }) => {
  return (
    <div className="contact-list">
      {contacts.length ? (
        contacts.map((item, index) => (
          <li className="contact-list--item" key={item.id} id={item.id}>
            <div className="contact-info">
              <div className="name">{item.name}</div>
              <div className="phone">{item.phone}</div>
            </div>
            <div className="btn-setting">
              <div
                className="btn-edit"
                onClick={(e) => {
                  showModalHandler(item.id);
                }}
              />
            </div>
          </li>
        ))
      ) : (
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          No such contacts
        </p>
      )}
    </div>
  );
};
export default ContactsList;
