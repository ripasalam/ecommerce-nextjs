import prisma from "@/utils/prisma";

export default async function handler(req, res) {

    try {
        switch (req.method) {
            case "GET":
                try {
                    const { categoryId, productId } = req.query

                    const take = +req.query.limit




                    const productCategory = await prisma.product.findMany({
                        where: {
                            categoryId: parseInt(categoryId),
                            ...(productId && {
                                NOT: {
                                    id: parseInt(productId),
                                },
                            }),

                        },
                        take,
                        include: {
                            category: true
                        }
                    })

                    const category = await prisma.category.findUnique({
                        where: {
                            id: parseInt(categoryId),
                        }
                    })

                    return res.json({ productCategory, category })
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