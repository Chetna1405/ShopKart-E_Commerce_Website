import uploadCloudinary from "../config/cloudinary.js";
import Product from "../model/ProductModel.js";


export const addProduct = async (req, res) => {
    try {
        let {
            name,
            description,
            price,
            category,
            subcategory,
            sizes,
            bestSeller
        } = req.body;


        let image1 = await uploadCloudinary(req.files.image1[0].path);
        let image2 = await uploadCloudinary(req.files.image2[0].path);
        let image3 = await uploadCloudinary(req.files.image3[0].path);
        let image4 = await uploadCloudinary(req.files.image4[0].path);

        let productData = {
            name,
            description,
            price :Number(price),
            category,
            subcategory,
            sizes : JSON.parse(sizes),
            bestSeller : bestSeller === "true" ? true : false,
            date : Date.now(), 
            image1,
            image2,
            image3,
            image4
        }


        const product = await Product.create(productData);

        res.status(201).json(product);
    } catch (error) {
        console.log("Add product error : ", error);
        res.status(500).json({ message: "Add product error" });
    }
}

export const listProduct = async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (error) {
        console.log("Product listing error ", error);
        res.status(500).json({ message: "Product List Error" });
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);
    } catch (error) {
        console.log("Product Remove error ", error);
        res.status(500).json({ message: "Product Remove Error" });
    }
}