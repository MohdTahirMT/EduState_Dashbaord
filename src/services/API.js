import axios from "axios";

const baseUrl = "http://54.243.64.190:3060/admin";

export const adminRegistrationAPI = async (data) => {
  let response = await axios.post(`${baseUrl}/adminRegistration`, data);
  return response;
};

export const adminTeacherloginAPI = async (data) => {
  let response = await axios.post(`${baseUrl}/adminTeacherlogin`, data);
  return response;
};

export const updateAdminProfileAPI = async (data) => {
  const token = localStorage.getItem("accessToken");
  let response = await axios.post(`${baseUrl}/updateAdminProfile`, data, {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const adminAcountDeactivateAPI = async (data) => {
  const token = localStorage.getItem("accessToken");
  let response = await axios.post(`${baseUrl}/adminAcountDeactivate`, data, {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const deleteAdminAPI = async (data) => {
  const token = localStorage.getItem("accessToken");
  let bodyData = {
    id: data
  }
  let response = await axios.post(`${baseUrl}/deleteAdmin`, bodyData, {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const forgetpasswordAdminAPI = async (data) => {
  let response = await axios.post(`${baseUrl}/forgetpasswordAdmin`, data);
  return response;
};

export const ChangePasswordAdminAPI = async (data) => {
  let response = await axios.post(`${baseUrl}/ChangePasswordAdmin`, data);
  return response;
};

export const fetchAllAdminAPI = async () => {
  const token = localStorage.getItem("accessToken");
  let response = await axios.get(baseUrl + "/fetchAllAdmin", {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};

export const fetchAdminByIdAPI = async (id) => {
  const token = localStorage.getItem("accessToken");
  let response = await axios.get(`${baseUrl}/fetchAdminById?id=${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
  return response;
};
