import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
function uploadMiddleware(folderName) {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: (_, file) => {
            const folderPath = `${folderName.trim()}`;
            const fileExtension = path.extname(file.originalname).substring(1);
            const publicId = `${file.fieldname}-${Date.now()}`;
            const isPDF = file.mimetype === "application/pdf";
            return {
                folder: folderPath,
                public_id: publicId,
                format: fileExtension,
                resource_type: isPDF ? "raw" : "image",
                access_control: [
                    {
                        access_type: "anonymous",
                    },
                ],
            };
        },
    });
    return multer({
        storage,
        limits: {
            fileSize: 15 * 1024 * 1024,
        },
        fileFilter: (_, file, cb) => {
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
                "application/pdf",
            ];
            if (!allowedTypes.includes(file.mimetype)) {
                const err = new Error("Only JPEG, PNG, JPG, WebP images, and PDF files are allowed");
                return cb(err, false);
            }
            cb(null, true);
        },
    });
}
export default uploadMiddleware;
