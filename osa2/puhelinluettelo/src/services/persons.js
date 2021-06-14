import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getData = () => axios.get(baseUrl).then((response) => response.data);

const addData = (newData) =>
  axios.post(baseUrl, newData).then((response) => response.data);

const updateData = (id, newData) =>
  axios.put(`${baseUrl}/${id}`, newData).then((response) => response.data);

const removeData = (id) => axios.delete(`${baseUrl}/${id}`).then(() => true);

const personsService = {
  getData: getData,
  addData: addData,
  updateData: updateData,
  removeData: removeData,
};
export default personsService;
