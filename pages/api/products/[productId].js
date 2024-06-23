import authentication from "@/middleware/authentication";
import authorization from "@/middleware/authorization";
import prisma from "@/utils/prisma";
import nc from "next-connect";

async function handlerProductId(req, res) {

    try {
        switch (req.method) {
            case "GET":
                try {
                    const { productId } = req.query
                    // console.log(productId)
                    const product = await prisma.product.findUnique({
                        where: {
                            id: parseInt(productId),
                        },
                        include: {
                            category: true
                        }
                    })
                    return res.json({ product })
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'something wrong' })
                }
                break;
            case "PUT":
                try {
                    const { productId } = req.query
                    const { input, sizes } = req.body
                    console.log(productId)
                    console.log(input)

                    const findProduct = await prisma.product.findUnique({
                        where: {
                            id: parseInt(productId)
                        },
                    });

                    if (findProduct) {

                        const product = await prisma.product.update({
                            where: {
                                id: parseInt(productId),
                            },
                            data: {
                                name: input.nameProduct,
                                description: input.description,
                                sizes: JSON.parse(sizes),
                                quantity: parseInt(input.quantity),
                                price: parseInt(input.price),
                                categoryId: parseInt(input.category),
                            }
                        })

                        if (product) {
                            res.status(201).json({
                                ...product.dataValues,
                                message: 'Successfully create Product!',
                            });
                        } else {
                            throw { name: 'ValidationFailed' };
                        }

                    }

                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'something wrong' })
                }
                break;
            case "DELETE":
                try {
                    const { productId } = req.query

                    console.log(productId)


                    const findProduct = await prisma.product.findUnique({
                        where: {
                            id: parseInt(productId)
                        },
                    });

                    if (findProduct) {
                        const data = await prisma.product.delete({
                            where: {
                                id: parseInt(productId),

                            },
                        });
                        res.status(200).json({ message: 'Successfully delete product!' });
                    } else {
                        throw { name: 'ErrorNotFound' };
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
const handlerRoute = nc()
    .get(handlerProductId)
    .put(authentication, authorization(['Admin']), handlerProductId)
    .delete(authentication, authorization(['Admin']), handlerProductId)

export default handlerRoute

