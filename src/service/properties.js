import axios from "axios";

const url = "http://localhost:3001/properties";

export const getallProperties = async (id) => {
    id = id || "";
    return await axios.get(`${url}/${id}`);
}

export const addProperty = async (property) => {
    return await axios.post(url,property);
}

export const editProperty = async (id,property) => {
    return await axios.patch(`${url}/${id}`,property);
}

export const deleteProperty = async (id) => {
    return await axios.delete(`${url}/${id}`);
}

export const addReservation = async (reservation) => {
    return await axios.post("http://localhost:3001/reservations", reservation);
}
