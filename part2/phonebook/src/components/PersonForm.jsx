import React from "react";

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange} required />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

  export default PersonForm;