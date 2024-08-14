const multer = require('multer');
const path = require('path');

//local
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, path.join(__dirname, '../../../../public/uploads/product'));
//     },
//     filename: (req, file, callback) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         callback(null, Date.now() + '-' + fileName);
//     },
// });

//vercel
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(process.cwd(), '/uploads/product'));
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, Date.now() + '-' + fileName);
    },
});


const productUpload = multer({ storage });

module.exports = productUpload
