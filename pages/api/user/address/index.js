import authentication from "@/middleware/authentication";
import prisma from "@/utils/prisma";
import { input } from "@material-tailwind/react";
import nc from "next-connect";

async function handlerAddress(req, res) {

    try {
        switch (req.method) {
            case "POST":
                try {

                    const { id } = req.userLogged
                    const { street, country, province, city, district, subdistrict, postal, phone } = req.body

                    const address = await prisma.address.create({
                        data: {
                            userId: id,
                            street,
                            country,
                            province,
                            city,
                            district,
                            subdistrict,
                            postal,
                            phone
                        }
                    })
                    return res.json({ address })
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'something wrong' })
                }
                break;
            case "GET":
                try {

                    const { id } = req.userLogged
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
            case "PUT":
                try {
                    const { id } = req.userLogged
                    const { currentId, input } = req.body
                    const address = await prisma.address.update({
                        where: {
                            id: currentId,
                        },
                        data: {
                            street: input.street,
                            province: input.province,
                            city: input.city,
                            district: input.district,
                            subdistrict: input.subdistrict,
                            postal: input.postal,
                            phone: input.phone
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