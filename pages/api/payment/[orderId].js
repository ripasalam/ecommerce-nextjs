import prisma from "@/utils/prisma";
const midtransClient = require('midtrans-client');
import nc from "next-connect";
import authentication from "@/middleware/authentication";

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});
async function handlerPaymentStatus(req, res) {

    try {

        switch (req.method) {
            case "GET":
                try {


                    const orderId = req.query.orderId
                    console.log(req.query.transactionId)
                    const paymentStatus = await snap.transaction.status(orderId)

                    return res.status(200).json({ data: paymentStatus })

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
    .get(authentication, handlerPaymentStatus)

export default handlerRoute