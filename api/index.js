// 47.22

import express from "express";

const app = express();
let PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}!!`);
});
