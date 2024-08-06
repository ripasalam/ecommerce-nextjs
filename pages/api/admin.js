import authentication from "@/middleware/authentication";
import authorization from "@/middleware/authorization";
import prisma from "@/utils/prisma";
import nc from "next-connect";


export default async function handlerStats(req, res) {

    try {

        switch (req.method) {
            case "GET":



                try {

                    const user = await prisma.user.count()

                    const product = await prisma.product.count()

                    const order = await prisma.order.count()

                    const paidOrder = await prisma.order.count({
                        where: {
                            transaction_status: "Success"
                        }
                    })

                    const unpaidOrder = await prisma.order.count({
                        where: {
                            OR: [
                                {
                                    transaction_status: "Pending"
                                }, {
                                    transaction_status: "Failure"
                                }
                            ]
                        }
                    })

                    const price = await prisma.order.findMany({
                        where: {
                            transaction_status: "Success"
                        },
                        select: {
                            total_price: true
                        }
                    })

                    let totalSale = 0

                    if (price) {
                        const sale = price.map(x => x.total_price)

                        for (let i = 0; i < sale.length; i++) {
                            totalSale += parseInt(sale[i])
                        }

                    }



                    return res.status(200).json({ user, product, order, paidOrder, unpaidOrder, price, totalSale })

                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'Invalid credentials' })
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
    .get(authentication, authorization["Admin"], handlerStats)