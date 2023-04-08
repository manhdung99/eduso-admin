// fetch.js
import { ref } from "vue";
import axios from "axios";

export default function () {
  const data = ref([]);
  const error = ref(null);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (err) {
      throw new Error("Some thing went wrong");
    }
  };

  return { data, error, fetchData };
}
