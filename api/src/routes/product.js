import express from 'express';
import { imageUpload } from "../services/multer";
import Product from '../controllers/ProductController'

const router = express.Router();

router.get('/products', Product.index);
router.get('/products/:id', Product.show);
router.post('/products', imageUpload.array('images'), Product.create);
router.put('/products/:id', Product.update);
router.delete('/products/:id', Product.delete);

export default router;
