import axios from "axios";

export default function getProducts(url) {
  return axios.action(url);
}
