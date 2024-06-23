import prisma from "@/utils/prisma";
import { data } from "autoprefixer";
const midtransClient = require('midtrans-client');
import authentication from "@/middleware/authentication";
import nc from "next-connect";

async function handlerNotifPayment(req, res) {

    try {

        switch (req.method) {
            case "PUT":
                try {

                    // console.log(req.params.id)
                    const getOrder = await Order.findByPk(req.params.id);
                    if (!getOrder) {
                        return res
                            .status(404)
                            .json({ status: "error", message: "Order Not Found" });
                    }

                    await Order.update(req.body, {
                        where: {
                            id: getOrder.id,
                        },
                    });

                    const order = await Order.findByPk(getOrder.id);
                    return res.json({
                        status: "success",
                        data: order,
                    });
                } catch (error) {
                    return res.status(400).json({
                        status: "error",
                        message: error.message,
                    });
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
    .use(handlerNotifPayment)

export default handlerRoute