import authentication from "@/middleware/authentication";
import authorization from "@/middleware/authorization";
import productUpload from "@/middleware/multerProduct";
import prisma from "@/utils/prisma";
import nc from "next-connect";


async function handlerUserSummary(req, res) {

    try {

        switch (req.method) {

            case "GET":


                try {

                    // const { search } = req.query

                    // const where = {};


                    // if (search) {
                    //     where.name = { contains: `${search}`, mode: 'insensitive' }
                    // }

                    // console.log(where)


                    // const take = +req.query.perPage || 6
                    // const page = +req.query.currentPage || 1
                    // const skip = (page - 1) * take



                    // const products = await prisma.user.findMany({
                    //     where,
                    //     take,
                    //     skip,
                    //     orderBy: {
                    //         createdAt: 'desc',
                    //     },

                    // })

                    const totalProduct = await prisma.user.count({
                        where: {
                            role: 'User'
                        }
                    })


                    return res.json({
                        totalProduct
                    })
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

export const config = {
    api: {
        bodyParser: false,
    }
}


const handlerRoute = nc()
    .get(authentication, authorization(['Admin']), handlerUserSummary)


export default handlerRoute