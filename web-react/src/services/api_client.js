import axios from "axios";

// export default axios.create({
//   baseURL: "https://api.rawg.io/api",
//   params: {
//     key: "2c8655d687bf4cbf8d025b2756457524",
//   },
// });
export default axios.create({
  baseURL: "http://localhost:8088",
});
