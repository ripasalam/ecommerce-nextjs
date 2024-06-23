import prisma from "@/utils/prisma";
const midtransClient = require('midtrans-client');
import nc from "next-connect";
import authentication from "@/middleware/authentication";

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});
export default async function handlerPaymentStatus(req, res) {

    try {

        switch (req.method) {
            case "GET":
                try {



                    console.log(req.query)

                    // if (Array.isArray(transactionId)) {

                    //     const result = []

                    //     for (let i = 0; i < transactionId.length; i++) {

                    //         // console.log(transactionId[i])

                    //         const paymentStatus = await snap.transaction.status(transactionId[i])

                    //         result.push(paymentStatus)

                    //     }

                    //     return res.status(200).json({ data: result })

                    // }


                    // const result = await snap.transaction.status(transactionId)
                    // return res.status(200).json({ data: result })



                } catch (error) {
                    console.log(error)
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