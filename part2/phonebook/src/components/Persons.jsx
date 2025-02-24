import React from "react";

const Persons = ({ persons, deletePerson }) => {
    return (
      <div>
        {/* {persons.map(({ name, number, id }) => <p key={id}>{name} {number}</p>)} */}
        {persons.map(person =>
          <div key={person._id}>
            {person.name} {person.number}
            <button onClick={()=>deletePerson(person.name)}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons;