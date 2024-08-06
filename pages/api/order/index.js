import prisma from "@/utils/prisma";
import authentication from "@/middleware/authentication";
import nc from "next-connect";
import authorization from "@/middleware/authorization";

async function handlerOrderListAll(req, res) {

    try {

        switch (req.method) {
            case "GET":

                try {
                    // const { id } = req.userLogged

                    const { orderStatus } = req.query

                    const where = {}



                    if (orderStatus) {
                        where.status = orderStatus
                    }

                    const take = +req.query.perPage || 6
                    const page = +req.query.currentPage || 1
                    const skip = (page - 1) * take

                    const order = await prisma.order.findMany({
                        where,
                        take,
                        skip,
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }

                    })

                    const totalOrder = await prisma.order.count({
                        where
                    })

                    return res.status(200).json({
                        data: order,
                        totalOrder

                    })
                } catch (error) {

                    return res.status(400).json({ message: "Something went wrong" })

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
    .get(handlerOrderListAll)


export default handlerRoute
