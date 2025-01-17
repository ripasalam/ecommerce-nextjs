import authentication from "@/middleware/authentication";
import authorization from "@/middleware/authorization";
import productUpload from "@/middleware/multerProduct";
import prisma from "@/utils/prisma";
import nc from "next-connect";
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});


async function handlerProduct(req, res) {

    try {

        switch (req.method) {

            case "GET":


                try {

                    const { search } = req.query

                    const where = {};


                    if (search) {
                        where.name = { contains: `${search}`, mode: 'insensitive' }
                    }




                    const take = +req.query.perPage || 6
                    const page = +req.query.currentPage || 1
                    const skip = (page - 1) * take



                    const products = await prisma.product.findMany({
                        where,
                        take,
                        skip,
                        orderBy: {
                            createdAt: 'desc',
                        },

                    })

                    const totalProduct = await prisma.product.count({
                        where
                    })

                    return res.json({
                        products,
                        totalPages: Math.ceil(totalProduct / take)
                    })
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'something wrong' })
                }
                break;
            case "POST":
                try {

                    const { nameProduct, description, price, size, quantity, categoryId } = req.body


                    const uploadCloudinary = await cloudinary.uploader
                        .upload(
                            req.file.path, {
                            use_filename: true,
                            unique_filename: false,
                        }
                        )
                        .catch((error) => {
                            console.log(error);
                        });

                    console.log(uploadCloudinary);


                    const products = await prisma.product.create({
                        data: {
                            name: nameProduct,
                            description: description,
                            sizes: JSON.parse(size),
                            quantity: parseInt(quantity),
                            price: parseInt(price),
                            categoryId: parseInt(categoryId),
                            image: uploadCloudinary.public_id
                        }
                    })

                    if (products) {
                        res.status(201).json({
                            ...products.dataValues,
                            message: 'Successfully create Product!',
                        });
                    } else {
                        throw { name: 'ValidationFailed' };
                    }


                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'something wrong' })
                }
                break;

            default:
                res.status(400).json({ message: "Invalid request method" });
        }
    } catch (error) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
    }

}

export const config = {
    api: {
        bodyParser: false,
    }
}


const handlerRoute = nc()
    .get(handlerProduct)
    .post(authentication, authorization(['Admin']), productUpload.single('photo'), handlerProduct)


export default handlerRoute