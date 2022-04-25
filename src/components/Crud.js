import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { useForm } from "react-hook-form";

function PeopleList({ list, deleteUser, update }) {
  return (
    <>
      {list.map((user) => (
        <div className="m-4">
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          <p>{user.id}</p>
          <p>{user.age}</p>
          <p>{user.address}</p>
          <p>{user.country}</p>
          <p>{user.city}</p>
          <p>{user.password}</p>
          <button
            class=" block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => update(user.id, user)}
          >
            Update
          </button>
          <button
            class="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => deleteUser(user.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

function Form({ recall, setRecall, user, updateForm, setUpdateForm}) {
  const db = firebase.firestore();

  const update = async (user, id) => {
    try {
      const test = await db.collection("people").doc(id).get()
      console.warn('REQUESTING USER', test)
      await db.collection("people").doc(id).update({
        address: user.address,
        age: user.age,
        city: user.city,
        country: user.country,
        name: user.name,
        password: user.password,
        username: user.username,
      });
    } catch (error) {
      console.log(error);
    }
    setUpdateForm(false);
    setRecall(!recall);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    
    if (updateForm) {
      update(data, user.id);
      
    } else {
      console.log(data);
      await db.collection("people").add(data);
      setRecall(!recall);
    }
    
    reset();
  };

  return (
    <>
      <div class="w-full max-w-xs">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder={user ? user.username : "Username"}
              {...register("username")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder={user ? user.name : "Full Name"}
              {...register("name")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Age"
              type="number"
              placeholder={user ? user.age : "Age"}
              {...register("age")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder={user ? user.address : "Address"}
              {...register("address")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              placeholder={user ? user.country : "Country"}
              {...register("country")}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder={user ? user.city : "City"}
              {...register("city")}
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Crud() {
  const [list, setList] = useState([]);
  const [recall, setRecall] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [updateUser, setUpdateUser] = useState({});

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("people").get();
        const arrayData = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        console.log("PRINTING LIST", arrayData);

        setList(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, [recall]);

  const deleteUser = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("people").doc(id).delete();
      const aux = list.filter((item) => item.id !== id);
      setList(aux);
    } catch (error) {
      console.warn('ERROR DELETE',error);
    }
  };

  const update = async (id, user) => {
    setUpdateUser(user);
    setUpdateForm(true);
  };

  return (
    <>
      <Form
        recall={recall}
        setRecall={setRecall}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        user={updateUser}
      />
      <PeopleList list={list} deleteUser={deleteUser} update={update} />
    </>
  );
}

export default Crud;