import React from 'react';

import './ModalEdit.css'

const ModalEdit = ({name = '', phone = '',editableId, editContact, modalClose, editPhone, editName, customClasses, deleteContact}) => {
    return (
        <div className={customClasses}>
            <div className="inner">
                <p style={{fontWeight:'bold', textAlign:'center'}}>Contact editing</p>
                <input type="text" value={name} onChange={(e) => editName(e.target.value)}/>

                <input type="text"
                       value={phone}
                       pattern="[0-9]*"
                       onChange={(e) => editPhone((v) => (e.target.validity.valid ? e.target.value : v))}/>

                <div className="btn-group">
                    <button className="btn-green" onClick={() => {editContact(name, phone)}}>Save</button>
                    <button  className="btn-blue" onClick={() => {modalClose()}}>Cancel</button>
                    <button className="btn-red" onClick={() => deleteContact(editableId)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;