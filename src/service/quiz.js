import axios from "axios";

const url = "http://localhost:3001/quizzes";

export const getAllQuizzes = async (id) => {
    id = id || "";
    return await axios.get(`${url}/${id}`);
};

export const addQuiz = async (quiz) => {
    return await axios.post(url, quiz);
};

export const editQuiz = async (id, quiz) => {
    return await axios.patch(`${url}/${id}`, quiz);
};

export const deleteQuiz = async (id) => {
    return await axios.delete(`${url}/${id}`);
};
