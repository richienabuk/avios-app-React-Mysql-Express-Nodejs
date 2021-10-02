import multer from 'multer'

const storage = multer.diskStorage({
    // Destination to store image
    destination: (req, file, cb) => {
        cb(null, './assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
        /*cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))*/
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

export const imageUpload = multer({
    storage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Unsupported file format'), false)
        }
        cb(undefined, true)
    }
})
