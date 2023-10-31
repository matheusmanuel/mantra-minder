const express = require("express");
const mantraRoutes = require("./routes/mantraRoutes");
const cors = require("cors");
const app = express();
const port = 4350;

app.use(cors());
app.use(express.json());
app.use(mantraRoutes);

app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});

// A aplicação vai ficar escutando aqui essa porta.
app.listen(port, () => {
  console.log(`server runnig in ${port}`);
});
