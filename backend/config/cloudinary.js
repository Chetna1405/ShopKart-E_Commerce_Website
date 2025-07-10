// import { v2 as cloudinary } from 'cloudinary'
// import fs from "fs"

// const uploadCloudinary = async (filePath) => {
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET
//     });
//     try {
//         if (!filePath) {
//             return null;
    
//         }
//         const uploadResult = await cloudinary.uploader.upload(filePath)
//         fs.unlinkSync(filePath)
//         return uploadResult.secure_url
//     } catch (error) {
//         fs.unlinkSync(filePath);
//         console.log("Cloudinary " , error);
//     }
// }

// export default uploadCloudinary;


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!filePath) return null;

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        return uploadResult.secure_url;
    } catch (error) {
        console.log('Cloudinary Upload Error:', error);
        return null;
    } finally {
        // Always attempt to delete file safely
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

export default uploadCloudinary;
