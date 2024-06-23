import prisma from "@/utils/prisma";

export default async function handler(req, res) {

    try {

        switch (req.method) {
            case "GET":

                try {
                    const { productId } = req.query

                    // console.log(productId)

                    if (Array.isArray(productId)) {
                        const productIdInt = productId.map(Number)



                        const product = await prisma.product.findMany({
                            where: {
                                id: { in: productIdInt },
                            },
                            include: {
                                category: true
                            }
                        })
                        return res.json({ product })
                    } else {

                        const productIdInt = parseInt(productId)

                        // console.log(productIdInt)



                        const product = await prisma.product.findMany({
                            where: {
                                id: productIdInt,
                            },
                            include: {
                                category: true
                            }
                        })
                        return res.json({ product })

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