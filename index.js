const express = require("express");
const productController = require("./controllers/productController");
const { connectToDatabase } = require("./db/connection");

const app = express();
const SERVER_PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DressStore Application" });
});

// api product routes
app.post("/api/products", productController.createProduct);
app.get("/api/products", productController.getAllProducts);
app.get("/api/products/:id", productController.getProductById);
app.put("/api/products/:id", productController.updateProduct);
app.delete("/api/products/:id", productController.deleteProduct);
app.delete("/api/products", productController.deleteAllProducts);

// 404 route
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

connectToDatabase()
  .then(() => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
