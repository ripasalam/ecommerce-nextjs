const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// const initProducts = [
//     {
//         name: "Air Jordan 1 Retro Low Travis Scott Reverse Mocha",
//         image: "/images/product/air-jordan-mocha.png",
//         description:
//             "Nodding to the Air Jordan 1 High Travis Scott Mocha, the Air Jordan 1 Low Travis Scott Reverse Mocha offers a similar Mocha and off-white palette but in a reverse-style color blocking. Its upper is constructed with a Mocha Durabuck base, white leather overlays, and signature reverse Swooshes. Hits of red on the Wings logo heel embroidery and woven tongue label gives a sharp contrast to the design's neutral look. From there, a yellowed Air sole adds a vintage feel.",
//         sizes: [
//             3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
//             12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
//         ],
//         quantity: 93,
//         price: 1300000,
//         categoryId: 4,
//     },
//     {
//         name: "SB Dunk Low Concepts Orange Lobster",
//         image: "/images/product/dunk-orange-lobster.png",
//         description:
//             "The Concepts x Nike Dunk Low SB 'Orange Lobster' continues a collaborative series that originally kicked off in 2008. In crafting the shoe's design, the Boston-based shop looks to the rare orange lobster for inspiration. Varying shades of orange are applied to the nubuck upper, featuring lightly speckled overlays and a tonal Swoosh outlined in white. A woven Nike SB tag embellishes the white mesh tongue, while a bib-themed pattern decorates the interior lining. The sneaker sits atop a traditional cupsole, featuring black sidewalls and a grippy orange rubber outsole.",
//         sizes: [
//             3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
//             12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
//         ],
//         quantity: 297,
//         price: 2000000,
//         categoryId: 2,
//     },
//     {
//         name: "Jordan 1 Retro High OG SP Fragment x Travis Scott",
//         image: "/images/product/air-jordan-travis-high.png",
//         description:
//             "The Air Jordan 1 High OG SP Fragment Design x Travis Scott fragment draws inspiration from a Jordan 1 Royal press sample from 1985 with its white and blue tumbled leather upper. Similar to previous Travis Scott Jordan 1s, signature reverse Swooshes and hidden stash pockets in the collar add on to the classic design. From there, both Travis Scott's Cactus Jack and Fragment logos are debossed in black on the heel wrap.",
//         sizes: [
//             3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
//             12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
//         ],
//         quantity: 290,
//         price: 1200000,
//         categoryId: 4,
//     },
//     {
//         name: "SB Dunk Low Concepts Purple Lobster",
//         image: "/images/product/dunk-purple-lobster.png",
//         description:
//             "NOTE: Due to limited availability during the release, we cannot guarantee that the blue laces will be included. It's not often that people find purple lobsters, it's also not often that people wear the rare Nike SB Dunk Low Concepts Purple Lobster. This Nike SB Dunk low comes with a purple upper with a white accent, purple Nike 'Swoosh', black midsole, and purple sole. These sneakers released in December 2018 and retailed for $130. Add some rare heat to the sneaker collection and Buy these now on StockX.",
//         sizes: [
//             3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
//             12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
//         ],
//         quantity: 295,
//         price: 1500000,
//         categoryId: 2,
//     },
// ];

const Products = [
    {
        name: "Air Jordan 1 Retro Low ",
        image: "/images/product/air-jordan-1-low-shoes-aquamarine-black-concord.png",
        description:
            "Inspired by the original that debuted in 1985, the Air Jordan 1 Low offers a clean, classic look that's familiar yet always fresh. With an iconic design that pairs perfectly with any 'fit, these kicks ensure you'll always be on point.",
        sizes: [
            3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
            12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
        ],
        quantity: 93,
        price: 1468,
        categoryId: 4,
    },
    {
        name: "Air Max 97 Triple Black",
        image: "/images/product/air-max-97.webp",
        description:
            "Air Max 97 ''Triple Black'' sneakers Released in 1997, Nike's signature Air Max 97 low-top sneakers have quickly paved the ways we see footwear, offering an iconic and instantly recognisable silhouette for years to come. Originally inspired by the notion of having the inner workings visible, this low-top pair features the signature visible Air Max sole to offer comfort to the lifestyle walking shoe.",
        sizes: [
            3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
            12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
        ],
        quantity: 297,
        price: 2500,
        categoryId: 3,
    },
    {
        name: "Air Max 90",
        image: "/images/product/air-max-90-shoes.png",
        description:
            "Nothing as fly, nothing as comfortable, nothing as proven.The Nike Air Max 90 stays true to its OG running roots with the iconic Waffle sole, stitched overlays and classic TPU details.Classic colours celebrate your fresh look while Max Air cushioning adds comfort to the journey.",
        sizes: [
            3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
            12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
        ],
        quantity: 290,
        price: 1799,
        categoryId: 3,
    },
    {
        name: "Nike Air Max 97 - Midnight Navy",
        image: "/images/product/nike-air-max-97-midnight-navy.jpg",
        description:
            "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead. Taking the revolutionary full-length Nike Air unit that shook up the running world and adding fresh colors and crisp details, it lets you ride in first-class comfort.",
        sizes: [
            3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9.5, 10, 10.5, 11, 11.5, 12,
            12.5, 13, 13.5, 14, 14.5, 15, 16, 17, 18,
        ],
        quantity: 295,
        price: 2389,
        categoryId: 3,
    },
];

// const initCategories = [
//     {
//         id: 1,
//         name: "Air Force",
//         image: "/images/categories/air-force.webp",
//         description:
//             "The Nike Air Force 1 was designed by Bruce Kilgore. It was Kilgore's first attempt at designing a basketball shoe. The now iconic Air Force 1 debuted on shelves in 1982. Nike Air Force 1 was named after the Air Force One plane that the President of the United States travels in.",
//     },
//     {
//         id: 2,
//         name: "Dunks",
//         image: "/images/categories/dunks.webp",
//         description:
//             "The Nike Dunk High was released in 1985. It was originally crafted as a high top basketball sneaker. The Nike Dunk High was similar to other Nike designs of the era – like the Air Force 1 and the Air Jordan 1.",
//     },
//     {
//         id: 3,
//         name: "Air Max",
//         image: "/images/categories/airmax.png",
//         description:
//             "The breadth of the Air Max series, including innovations, collaborations and cultural moments, has given rise to legions of dedicated collectors around the world, and Air Max means something different everywhere you go.",
//     },
//     {
//         id: 4,
//         name: "Air Jordan",
//         image: "/images/categories/jordan.png",
//         description:
//             "The first Air Jordan shoe was produced for Hall of Fame former basketball player Michael Jordan during his time with the Chicago Bulls in late 1984 and released to the public on April 1, 1985.",
//     },
// ];



// const initUser = [
//     {
//         id: 2,
//         name: "Rafi",
//         email: "rifsalam@mail.com",
//         emailVerified: "rifsalam@mail.com",
//         image: "/image/profile/ripa.jpg",
//         hashedPassword: "aingnusaha",
//         role: 'User'
//     },


// ];




async function main() {
    console.log(`Start seeding ...`)
    // for (const c of initCategories) {
    //     const category = await prisma.category.create({
    //         data: c,
    //     })
    //     console.log(`Created user with id: ${category.id}`)
    // }
    // console.log(`Seeding Category finished.`)
    // for (const p of initProducts) {
    //     const product = await prisma.product.create({
    //         data: p,
    //     })
    //     console.log(`Created user with id: ${product.id}`)
    // }
    // console.log(`Seeding Product finished.`)
    for (const p of Products) {
        const product = await prisma.product.create({
            data: p,
        })
        console.log(`Created user with id: ${product.id}`)
    }
    console.log(`Seeding Product finished.`)

    // for (const u of initUser) {
    //     const user = await prisma.user.create({
    //         data: u,
    //     })
    //     console.log(`Created user with id: ${user.id}`)
    // }
    // console.log(`Seeding User finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
