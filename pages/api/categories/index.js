import prisma from "@/utils/prisma";

export default async function handler(req, res) {

    try {
        switch (req.method) {
            case "GET":
                try {
                    const categories = await prisma.category.findMany()
                    return res.json({ categories })
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