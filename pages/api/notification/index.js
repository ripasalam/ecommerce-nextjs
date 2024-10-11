import prisma from "@/utils/prisma";
import { data } from "autoprefixer";
const midtransClient = require('midtrans-client');
import authentication from "@/middleware/authentication";
import nc from "next-connect";
import { SHA512 } from "crypto-js";
// import { HmacSHA512 } from "crypto-js";
// const SHA512 = require('crypto-js/sha512')
// const SHA256 = require("crypto-js/sha256")

async function handlerNotifPayment(req, res) {

    try {

        switch (req.method) {
            case "PUT":
                try {

                    // console.log(req.params.id)
                    // const getOrder = await Order.findByPk(req.params.id);
                    // if (!getOrder) {
                    //     return res
                    //         .status(404)
                    //         .json({ status: "error", message: "Order Not Found" });
                    // }

                    // await Order.update(req.body, {
                    //     where: {
                    //         id: getOrder.id,
                    //     },
                    // });

                    // const order = await Order.findByPk(getOrder.id);
                    // return res.json({
                    //     status: "success",
                    //     data: order,
                    // });
                } catch (error) {
                    return res.status(400).json({
                        status: "error",
                        message: error.message,
                    });
                }
                break;
            case "POST":
                try {
                    const data = req.body

                    // console.log(data.transaction_id)

                    const transactionOrder = await prisma.order.findUnique({
                        where: {
                            transactionId: data.transaction_id
                        }

                    })



                    if (transactionOrder) {
                        // const hash = SHA512(`${data.transaction_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
                        // console.log(data.signature_key)
                        // console.log(hash)
                        // if (data.signature_key !== hash) {
                        //     return {
                        //         status: "error",
                        //         message: "Invalid Signature Key"
                        //     }
                        // }

                        let transaction_id = data.transaction_id;
                        let transactionStatus = data.transaction_status;
                        let fraudStatus = data.fraud_status;

                        // console.log(transaction_id)
                        // console.log(transactionStatus)
                        // console.log(fraudStatus)

                        if (transactionStatus == 'capture') {
                            if (fraudStatus == 'accept') {
                                // TODO set transaction status on your database to 'success'
                                // and response with 200 OK
                                const order = await prisma.order.update({
                                    where: {
                                        transactionId: transaction_id
                                    },
                                    data: {
                                        transaction_status: transactionStatus
                                    }
                                })

                                return res.status(200).json({
                                    status: "Success",
                                    message: "Ok",
                                });
                            }
                        } else if (transactionStatus == 'settlement') {
                            // TODO set transaction status on your database to 'success'
                            // and response with 200 OK
                            const order = await prisma.order.update({
                                where: {
                                    transactionId: transaction_id
                                },
                                data: {
                                    transaction_status: "Success"
                                }
                            })

                            return res.status(200).json({
                                status: "Success",
                                message: "Ok",
                            });
                        } else if (transactionStatus == 'cancel' ||
                            transactionStatus == 'deny' ||
                            transactionStatus == 'expire') {
                            // TODO set transaction status on your database to 'failure'
                            // and response with 200 OK
                            const order = await prisma.order.update({
                                where: {
                                    transactionId: transaction_id
                                },
                                data: {
                                    transaction_status: "Failure"
                                }
                            })

                            return res.status(200).json({
                                status: "Success",
                                message: "Ok",
                            });
                        } else if (transactionStatus == 'pending') {
                            // TODO set transaction status on your database to 'pending' / waiting payment
                            // and response with 200 OK
                            const order = await prisma.order.update({
                                where: {
                                    transactionId: transaction_id
                                },
                                data: {
                                    transaction_status: "Pending"
                                }
                            })

                            return res.status(200).json({
                                status: "Success",
                                message: "Ok",
                            });
                        }
                    }
                    // return res.status(200).json({
                    //     status: "Success",
                    //     message: "Ok",
                    // });

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
    .put(authentication)
    .post(handlerNotifPayment)

export default handlerRoute