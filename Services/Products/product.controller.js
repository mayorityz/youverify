import prodModel from "./product.model.js";

export const newProduct = async(req, res)=>{
    const {productId, title, amount, desc} = req.body;
    const product = new prodModel({productId, title, amount, desc});
    product.save((er, prod_)=>{
        
    })
}