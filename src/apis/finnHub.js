import axios from "axios";

const TOKEN = "coqjkk1r01qmi0t8ju5gcoqjkk1r01qmi0t8ju60";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
