import prisma from "@/utils/prisma";
import authentication from "@/middleware/authentication";
import nc from "next-connect";


async function handlerCheckoutOrder(req, res) {

    try {
        switch (req.method) {
            case "POST":
                try {

                    const { product, userId, status, paymentId, transaction_status } = req.body



                    const order = await prisma.order.create({
                        data: {
                            userId: parseInt(userId),
                            status,
                            paymentId,
                            transaction_status
                        }
                    })

                    if (order) {
                        const orderItem = await prisma.orderItem.createMany({
                            data: product.map((item) => ({
                                productId: item.product,
                                orderId: order.id,
                                size: item.size,
                                quantity: item.quantity,
                                item_price: item.price

                            }))
                        })
                    }
                    return res.json({ order })
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
    .use(authentication)
    .use(handlerCheckoutOrder)

export default handlerRoute