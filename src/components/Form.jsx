import React from "react";
import { firebase } from "../firebase";

function Form() {
  const db = firebase.firestore();

  const person = {
    adress: "Avenida siempre viva barranquilla",
    age: 18,
    name: "Don Pipe",
    food: 'pizza',
    vehicule: 'car',
  };

  const addPerson = async (person) => {
    const data = await db.collection("people").add(person);
    console.warn('dataaa', data.id)

  };

  return (
    <>
      <h2>Testing with this button to add</h2>
      <button onClick={ () => addPerson(person)}>Add person</button>
    </>
  );
}

export default Form;
