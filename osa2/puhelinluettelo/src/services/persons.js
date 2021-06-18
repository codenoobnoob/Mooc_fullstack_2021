import axios from "axios";
const baseUrl = "/api/persons";

const getData = () => axios.get(baseUrl).then((response) => response.data);

const addData = (newData) =>
  axios.post(baseUrl, newData).then((response) => {
    console.log(response.data);
    return response.data;
  });

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
