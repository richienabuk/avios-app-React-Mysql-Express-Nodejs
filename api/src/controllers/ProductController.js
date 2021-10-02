import model from '../models';
import {imageUpload} from "../services/multer";

const { Product } = model;

export default {
  async index(req, res) {
    try {
      const products = await Product.findAll({})
      return res.status(200).send({ message: 'Success', data: products });
    } catch (e) {
      console.error(e);
      return res.status(500)
          .send({message: 'Could not perform operation at this time, kindly try again later.'});
    }
  },

  async create(req, res) {
    const { name, description, varieties } = req.body;
    console.log(req.files, req.body)
    try {
      const images = req.files?.map(file => file.path);
      const product = await Product.create({ name, description, varieties, images });
      return res.status(201).send({ message: 'Product added successfully', data: product });
    } catch(e) {
      console.error(e);
      return res.status(500)
          .send({message: 'Could not perform operation at this time, kindly try again later.'});
    }
  },

  async show(req, res) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } })

      if (!product) return res.status(404)
          .send({message: 'The product you are looking for does not exist.'});

      return res.status(200).send({ message: 'Success', data: product });
    } catch (e) {
      console.error(e);
      return res.status(500)
          .send({message: 'Could not perform operation at this time, kindly try again later.'});
    }
  },

  async update(req, res) {
    try {
      const images = req.files?.map(file => file.path);
      const { name, description, varieties } = req.body;
      const product = await Product.findOne({ where: { id: req.params.id } })

      if (!product) return res.status(404)
          .send({message: 'The product you are trying to update does not exist.'});

      await product.update({ name, description, varieties, images })

      return res.status(200).send({message: 'Product updated successfully', data: product});
    } catch (e) {
      console.error(e);
      return res.status(500)
          .send({message: 'Could not perform operation at this time, kindly try again later.'});
    }
  },

  async delete(req, res) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } })

      if (!product) return res.status(404)
          .send({message: 'The product you are trying to delete does not exist.'});

      await product.destroy()

      return res.status(204);
    } catch (e) {
      console.error(e);
      return res.status(500)
          .send({message: 'Could not perform operation at this time, kindly try again later.'});
    }
  }
}
