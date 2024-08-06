import prisma from "@/utils/prisma";
import authentication from "@/middleware/authentication";
import nc from "next-connect";

async function handlerOrderDetail(req, res) {

    try {

        switch (req.method) {
            case "GET":

                try {
                    const { id } = req.userLogged
                    const orderId = req.query.orderId
                    const order = await prisma.order.findFirst({
                        where: {
                            AND: [
                                {
                                    invoice_number: orderId,

                                },
                                {
                                    userId: id
                                }
                            ]


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
    .use(handlerOrderDetail)

export default handlerRoute