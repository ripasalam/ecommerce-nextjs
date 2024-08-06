import prisma from "@/utils/prisma";
const midtransClient = require('midtrans-client');
import nc from "next-connect";
import authentication from "@/middleware/authentication";

async function handlerUpdatePayment(req, res) {

    try {
        switch (req.method) {
            case "PUT":
                try {

                    const { orderId, status, total_price, invoice_number, transactionId, transaction_method, transaction_status } = req.body
                    // const { id } = req.query

                    // console.log(req.body)
                    // console.log(id)

                    const getOrder = await prisma.order.findUnique({
                        where: {
                            id: parseInt(orderId)
                        }
                    })


                    if (getOrder) {
                        const updateOrder = await prisma.order.update({
                            where: {
                                id: getOrder.id,
                            },
                            data: {
                                status,
                                total_price,
                                invoice_number,
                                payment_method: transaction_method,
                                transaction_status,
                                transactionId
                            }
                        })
                    } else {
                        return res
                            .status(404)
                            .json({ status: "error", message: "Order Not Found" });
                    }

                    const order = await prisma.order.findUnique({
                        where: {
                            id: getOrder.id
                        }
                    })


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
    .use(handlerUpdatePayment)

export default handlerRoute