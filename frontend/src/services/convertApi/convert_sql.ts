import { api } from "../api";
export const convertSql = async (data:any) => {
  try {
    const response = await api.post("/sqlconvertor/jobs/convert/", data);
    return response.data;
  } catch (error:any) {
    throw new Error(`Error converting SQL: ${error.message}`);
  }
};
