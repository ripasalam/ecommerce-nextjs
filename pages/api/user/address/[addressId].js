import authentication from "@/middleware/authentication";
import prisma from "@/utils/prisma";
import { input } from "@material-tailwind/react";
import nc from "next-connect";

async function handlerAddress(req, res) {

    try {
        switch (req.method) {
            case "GET":
                try {

                    const { id } = req.userLogged
                    const { addressId } = req.query


                    const address = await prisma.address.findUnique({
                        where: {
                            userId: id,
                        }
                    })
                    return res.json({ address })
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
    .use(handlerAddress)


export default handlerRoute;