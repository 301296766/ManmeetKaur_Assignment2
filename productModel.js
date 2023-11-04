const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

class ProductModel {
  constructor() {
    this.collectionName = "product";
  }

  // create new product
  async createProduct(productData) {
    const db = await getDb();
    const product = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      quantity: productData.quantity,
      category: productData.category,
    };

    const result = await db.collection(this.collectionName).insertOne(product);

    return result.insertedId;
  }

  async getAllProducts() {
    const db = await getDb();
    return db.collection(this.collectionName).find().toArray();
  }

  async getProductById(productId) {
    const db = await getDb();
    return db
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(productId) });
  }

  async getProductsByName(keyword) {
    const db = await getDb();
    return db
      .collection(this.collectionName)
      .find({ name: { $regex: keyword, $options: "i" } })
      .toArray();
  }

  async updateProductById(productId, updateData) {
    const db = await getDb();
    const filter = { _id: new ObjectId(productId) };
    const update = { $set: updateData };
    const result = await db
      .collection(this.collectionName)
      .updateOne(filter, update);

    if (result.matchedCount === 1) {
      return db.collection(this.collectionName).findOne(filter);
    } else {
      return null;
    }
  }

  async getProductsByCategory(category) {
    const db = await getDb();
    return db.collection(this.collectionName).find({ category }).toArray();
  }

  async deleteProductById(productId) {
    const db = await getDb();
    return db
      .collection(this.collectionName)
      .deleteOne({ _id: new ObjectId(productId) });
  }

  async deleteAllProducts() {
    const db = await getDb();
    return db.collection(this.collectionName).deleteMany({});
  }
}

module.exports = new ProductModel();
