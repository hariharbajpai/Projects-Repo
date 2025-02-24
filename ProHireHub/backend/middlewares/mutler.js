import multer from "multer";

export const singleUpload = (req, res, next) => {
    multer({ storage: multer.memoryStorage() }).single("file")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: "File upload error", success: false });
        }
        next();
    });
};
