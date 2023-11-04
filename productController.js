const productService = require("../services/productService");

class ProductController {
  async createProduct(req, res) {
    try {
      const productId = await productService.create(req.body);

      res.status(201).json({ message: "Product Created", productId });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Could not create product" });
    }
  }

  async getAllProducts(req, res) {
    try {
      let products;
      if (req.query.name) {
        products = await productService.getAllByName(req.query.name);
      } else {
        products = await productService.getAll();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve products" });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productService.getById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Could not retrieve product" });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateById(req.params.id, req.body);
      if (product) {
        res.status(200).json({ message: "Product updated", product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Could not update product" });
    }
  }

  async deleteProduct(req, res) {
    try {
      let results = await productService.deleteById(req.params.id);
      res
        .status(200)
        .json({ messages: `${results.deletedCount} Product(s) deleted` });
    } catch (error) {
      res.status(500).json({ error: "Could not delete product" });
    }
  }

  async deleteAllProducts(req, res) {
    try {
      const results = await productService.deleteAll();

      res
        .status(200)
        .json({ messages: `${results.deletedCount} Product(s) deleted` });
    } catch (error) {
      res.status(500).json({ error: "Could not delete products" });
    }
  }
}

module.exports = new ProductController();
