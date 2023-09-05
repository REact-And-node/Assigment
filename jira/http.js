import axios from "axios";
const baseURL="http://localhost:2410";
function get(url) { return axios.get(baseURL + url);
}

export default {
get,


}