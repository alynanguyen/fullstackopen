import React from "react";
import axios from 'axios';
const baseUrl = 'https://fullstackopen-hbf9.onrender.com/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const update = (id, changedPerson) => {
    return axios.put(`${baseUrl}/${id}`, changedPerson)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }