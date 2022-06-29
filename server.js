import express from "express";
import router from "./app/routes.js";
import fileUpload from "express-fileupload";
const app = express();
const port = 3000;
app.use(fileUpload({ limits: { fileSize: 10485760 } }));
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
