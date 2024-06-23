import authentication from "@/middleware/authentication";
import prisma from "@/utils/prisma";
import nc from "next-connect";

async function handlerProfile(req, res) {

    try {
        switch (req.method) {
            case "GET":
                try {

                    const { id } = req.userLogged

                    const profile = await prisma.user.findUnique({
                        where: {
                            id: id,
                        },
                        include: {
                            addresses: true
                        }
                    })
                    return res.json({ profile })
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
    .use(handlerProfile)


export default handlerRoute;