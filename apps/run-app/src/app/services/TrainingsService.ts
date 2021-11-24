import http from "../http-common";
import { Training } from "../models/Training";

export const getAllTrainings = () => {
    return http.get("/trainings");
};

// export async function getAllTrainings() {
//     const { data } = await http.get(
//         "/trainings"
//     );
//     return data;
// };
 
export const createTraining = (data: Training) => {
    return http.post("/trainings", data);
};

export const updateTraining = (id: number, data: Training) => {
    return http.put(`/trainings/${id}`, data);
};
// export async function updateTraining(id: number, data: Training) {
//     const response = await http.put(`/trainings/${id}`, data);
//     return response;
// }

export const removeTraining = (id: number) => {
    return http.delete(`/trainings/${id}`);
};