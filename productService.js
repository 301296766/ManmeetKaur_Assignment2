const productModel = require("../models/productModel");

class ProductService {
  async create(productData) {
    try {
      return await productModel.createProduct(productData);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await productModel.getAllProducts();
    } catch (error) {
      throw error;
    }
  }
  async getById(productId) {
    try {
      return await productModel.getProductById(productId);
    } catch (error) {
      throw error;
    }
  }

  async getAllByName(keyword) {
    try {
      return await productModel.getProductsByName(keyword);
    } catch (error) {
      throw error;
    }
  }

  async updateById(productId, updateData) {
    try {
      return await productModel.updateProductById(productId, updateData);
    } catch (error) {
      throw error;
    }
  }

  async getByCategory(category) {
    try {
      return await productModel.getProductsByCategory(category);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(productId) {
    try {
      return await productModel.deleteProductById(productId);
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      return await productModel.deleteAllProducts();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
