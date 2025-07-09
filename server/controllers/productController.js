import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
// function for add product
const addProduct = async(req,res)=>{
    try{
        const {name,description, price, category, subCategory, sizes, bestseller}=req.body;

        const image1 = req.files.image1 && req.files.image1[0]; //Nếu req.files.image1 tồn tại (không undefined), thì lấy phần tử đầu tiên [0], còn nếu không thì trả về undefined.
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images=[image1,image2,image3,image4].filter((item)=>item !== undefined); // lọc và loại bỏ các image bị undefined


        /*
        cloudinary.uploader.upload(...)	: Gọi API của Cloudinary để upload ảnh lên server của họ.
        item.path	                    : Đường dẫn (local path) tới file ảnh.
        { resource_type: 'image' }	    : Thông báo cho Cloudinary biết đây là file ảnh.
         result.secure_url	            : Sau khi upload, Cloudinary trả về object chứa nhiều thông tin, 
                                        trong đó secure_url là đường link ảnh được lưu trữ trên Cloudinary (dạng HTTPS).
        Promise.all([...])	            : Chờ tất cả các lệnh upload chạy song song hoàn tất.
        */
       let imageUrl = await Promise.all(
            images.map(async(item)=>{
                const result= await cloudinary.uploader.upload(item.path,{resource_type:'image'}); // resource type: loại tài nguyên
                return result.secure_url; //  secure: chắc chắn
            })
       )

        const productData={
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller:bestseller=== "true" ? true : false,
            sizes: JSON.parse(sizes), //chuyển đổi một chuỗi (string) ở dạng JSON thành một đối tượng JavaScript (object)
            image:imageUrl,
            date: Date.now()
        }
        const product = new productModel(productData);
        await product.save();
        res.json({success:true,message:"Product Added"});
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message});
    }
}

// function for list product
const listProducts= async(req,res)=>{
    try{
        const products= await productModel.find({});
        res.json({success:true, products});
    }   
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// function for removing product
const removeProduct = async(req,res)=>{
    try{
        const product = await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: 'Product removed' });
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

// function for signle product info
const singleProduct = async(req,res)=>{
    try{
        const {productId}=req.body;
        const product = await productModel.findById(productId);
        res.json({success:true,product});
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}


export {listProducts, addProduct, removeProduct,singleProduct};