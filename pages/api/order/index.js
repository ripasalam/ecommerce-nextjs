import prisma from "@/utils/prisma";
import authentication from "@/middleware/authentication";
import nc from "next-connect";
import authorization from "@/middleware/authorization";

async function handlerOrderListAll(req, res) {

    try {

        switch (req.method) {
            case "GET":

                try {
                    const { id } = req.userLogged

                    const { searchQuery, status } = req.query

                    // const where = {
                    //     userId: id
                    // }

                    // if (searchQuery) {
                    //     where.invoice_number = searchQuery
                    // }


                    // if (status !== "All") {

                    //     where.status = status
                    // }


                    const order = await prisma.order.findMany({
                        include: {
                            user: true
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }

                    })

                    return res.status(200).json({ data: order })
                } catch (error) {

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
    .get(authentication, authorization(['Admin']), handlerOrderListAll)


export default handlerRoute
