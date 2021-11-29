import http from "../http-common";
import { Training } from "../models/Training";

export async function getAllTrainings() {
    const { data } = await http.get(
        "/trainings"
    );
    return data;
};

export async function createTraining(data: Training) {
    const response = await http.post("/trainings", data);
    return response.data;
}

export async function updateTraining(id: number, data: Training) {
    const response = await http.put(`/trainings/${id}`, data);
    return response.data;
}

export async function removeTraining(id: number) {
    const response = await http.delete(`/trainings/${id}`);
    return response.data;
}