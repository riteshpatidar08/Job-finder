import pkg from 'cloudinary';

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
const { v2: cloudinary } = pkg;
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Resume',
    format: async (req, file) => 'pdf',
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

const upload = multer({ storage: storage });

export default upload;
