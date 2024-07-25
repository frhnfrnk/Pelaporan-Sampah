import axiosInstance from "@/lib/axios";
import { AddReport } from "@/utils/types/addReport";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAllReports = async () => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/reports`);
  return response.data;
};

const addReport = async (report: AddReport) => {
  const response = await axiosInstance.post(`${LOCAL_API_URL}/reports`, report);
  return response.data;
};

const proceedReport = async (id: string, status: string) => {
  const response = await axiosInstance.put(
    `${LOCAL_API_URL}/reports/${id}/status`,
    {
      status,
    }
  );
  return response.data;
};

const getHistoryReport = async () => {
  const response = await axiosInstance.get(`${LOCAL_API_URL}/reports/history`);
  return response.data;
};

const doneReport = async (id: string, imageDone: string[]) => {
  const response = await axiosInstance.put(
    `${LOCAL_API_URL}/reports/done/${id}`,
    { imageDone }
  );
  return response.data;
};

const reportService = {
  fetchAllReports,
  addReport,
  proceedReport,
  getHistoryReport,
  doneReport,
};

export default reportService;
