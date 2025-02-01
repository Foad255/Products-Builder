import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const createProducts = async (req, res) => {
    const product = req.body;
  
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ success: false, message: 'Please fill all the fields' }); // Updated status code to 400 (Bad Request) and added return statement
    }
  
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      return res.status(200).json({ success: true, message: 'Product saved successfully', data: newProduct });
    } catch (err) {
      console.error('Server Error:', err); // Log the error for debugging
      return res.status(500).json({ success: false, message: 'Server Error' });
    }
  };
  

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({success:true, message:products})
    } catch (err) {
        res.status(500).json({success:false, message:'Server Error'})
    }
}

export const updateProducts = async(req,res) => {
    const {id} = req.params
    const updateData = req.body
    // check that id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(404).json({success:false, message:'Not found'})
    }
    try {
       const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {new:true})
       // check that id is in the database
        if (!updatedProduct) {
            res.status(404).json({success:false, message:'Not found' })
        }
        res.status(200).json({success:true, message:'product has been updated', product:updatedProduct})
    } catch(err) {
            res.status(500).json({success:false, message:'Server Error'})
    }
}

export const deleteProducts = async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return  res.status(404).json({success:false, message:'Product not found'})
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id)
        // Ensure that product in the database
        if (!deletedProduct) {
            return res.status(404).json({success:false, message:'Not found'})
        }
        
        res.status(200).json({success:true, message:'product has been deleted'})
        
    } catch (err) {
        res.status(500).json({success:false, message:'Server Error'})
    }
}
