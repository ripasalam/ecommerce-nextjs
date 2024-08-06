import prisma from "@/utils/prisma";
import authentication from "@/middleware/authentication";
import nc from "next-connect";
import authorization from "@/middleware/authorization";

async function handlerOrderDetail(req, res) {

    try {
        console.log(req.method)
        switch (req.method) {

            case "GET":

                try {

                    const orderId = req.query.orderId
                    const order = await prisma.order.findUnique({
                        where: {
                            invoice_number: orderId,

                        },
                        include: {
                            orderItems: true,
                        }
                    })
                    return res.json({ data: order })
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'something wrong' })
                }
                break;
            case "PUT":

                try {

                    const orderId = req.query.orderId

                    const { id } = req.userLogged
                    const { status } = req.body

                    // console.log(orderId)
                    // console.log(req.body)

                    const order = await prisma.order.findUnique({
                        where: {
                            invoice_number: orderId,


                        },
                        include: {
                            orderItems: true,
                        }
                    })

                    if (order) {
                        const orderUpdate = await prisma.order.update({
                            where: {
                                invoice_number: orderId,


                            },

                            data: {
                                status: status
                            },
                            include: {
                                orderItems: true,
                            },
                        })
                        return res.json({ data: orderUpdate })
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
    .get(authentication, authorization(['Admin']), handlerOrderDetail)
    .put(authentication, authorization(['Admin']), handlerOrderDetail)

export default handlerRoute