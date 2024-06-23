import prisma from "@/utils/prisma";

const bcrypt = require('bcrypt')

export default async function handler(req, res) {

    try {
        switch (req.method) {
            case "POST":
                try {
                    const { name, email, emailVerified, password } = req.body


                    const uniqueEmail = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })


                    if (!uniqueEmail) {
                        const hashPassword = await bcrypt.hash(password, 10)

                        const { hashedPassword, ...user } = await prisma.user.create({
                            data: {
                                name,
                                email,
                                emailVerified,
                                hashedPassword: hashPassword,
                                role: 'User'
                            },
                        })

                        res.status(201).json({ user, message: "Successfully Register!" })

                    } else {

                        return res.status(400).json({ message: 'User Already Exist' })
                    }



                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'User Already Exist' })
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