import prisma from "@/utils/prisma";
const bcrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
export default async function handler(req, res) {

    try {

        switch (req.method) {
            case "POST":

                const { email, password } = req.body

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email,
                        }
                    })

                    if (!user) {
                        return res.status(400).json({ message: "Invalid credentials" });
                    }

                    const passwordMatch = await bcrpt.compare(password, user.hashedPassword)

                    if (!passwordMatch) {
                        return res.status(400).json({ message: "Invalid credentials" });
                    }

                    const token = jwt.sign(
                        {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    );
                    res.status(200).json({
                        token,
                        role: user.role,
                        id: user.id,
                    });
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({ message: 'Invalid credentials' })
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