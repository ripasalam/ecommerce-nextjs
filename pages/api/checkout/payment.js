import prisma from "@/utils/prisma";
const midtransClient = require('midtrans-client');
import authentication from "@/middleware/authentication";
import nc from "next-connect";


const getCurrentTimestamp = () => {
    return "" + Math.round(new Date().getTime() / 1000);
};

async function handlerPayment(req, res) {

    try {

        switch (req.method) {
            case "POST":
                try {
                    const { userId, total } = req.body


                    const { hashedPassword, ...user } = await prisma.user.findUnique({
                        where: {
                            id: parseInt(userId)
                        }
                    })

                    const snap = new midtransClient.Snap({
                        isProduction: false,
                        serverKey: process.env.MIDTRANS_SERVER_KEY,
                    });

                    const parameter = {
                        transaction_details: {
                            order_id: "chtm-" + getCurrentTimestamp(),
                            gross_amount: total
                        },
                        custommer_details: {
                            name: user.name
                        }
                    }

                    const transaction = await snap.createTransaction(parameter)

                    const transactionToken = transaction.token

                    res.status(200).json({ transactionToken })

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
    .use(handlerPayment)

export default handlerRoute
