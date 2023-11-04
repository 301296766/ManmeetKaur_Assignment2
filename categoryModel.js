const { ObjectId } = require("mongodb");
const { getDb } = require("../db/connection");

class CategoryModel {
  constructor() {
    this.collectionName = "categories";
  }

  // create new category
  async createProduct(name) {
    const db = await getDb();
    const category = {
      name,
    };

    await db.collection(this.collectionName).insertOne(category);
  }

  async getAllCategories() {
    const db = await getDb();
    return db.collection(this.collectionName).find().toArray();
  }

  async getCategoryById(categoryId) {
    const db = await getDb();
    return db
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(categoryId) });
  }
  async updateCategory(categoryId, name) {
    const db = await getDb();
    const filter = { _id: new ObjectId(categoryId) };
    const update = { $set: name };
    return db.collection(this.collectionName).updateOne(filter, update);
  }

  async deleteCategoryById(categoryId) {
    const db = await getDb();
    return db
      .collection(this.collectionName)
      .deleteOne({ _id: new ObjectId(categoryId) });
  }

  async deleteAllCategories() {
    const db = await getDb();
    return db.collection(this.collectionName).deleteMany({});
  }
}

module.exports = new CategoryModel();
