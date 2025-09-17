import { api } from "../api"

export const fetchJobs = async () => {
     try {
        const response = await api.get('/sqlconvertor/jobs/');
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching job data:", err);
        throw err;
    }
}