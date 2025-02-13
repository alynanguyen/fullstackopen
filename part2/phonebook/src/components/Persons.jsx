import React from "react";

const Persons = ({ persons, deletePerson }) => {
    return (
      <div>
        {/* {persons.map(({ name, number, id }) => <p key={id}>{name} {number}</p>)} */}
        {persons.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={()=>deletePerson(person.id)}>delete</button>
          </div>
        )}
      </div>
    )
}

export default Persons;