const express = require("express");
const { sequelize } = require("./models");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT}`)
  );
});
