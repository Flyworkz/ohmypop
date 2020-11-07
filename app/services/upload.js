const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, Date.now()+ '.' + extension);
    }
});

/*const upload = multer({
    storage : storage,
    limits: {
        fileSize : 20000000
    }
    }).single('image');*/

module.exports = multer({
    storage: storage, 
    limits: {
    fileSize : 20000000
    }
}).single('image');