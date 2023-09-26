
import { BadRequestException} from '@nestjs/common';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';


export const multerImgOpt: MulterOptions = {
    // Limit file size
    limits: {
      fileSize: process.env.UPLOAD_MAX_FILE_SIZE ? +process.env.UPLOAD_MAX_FILE_SIZE : 5242880,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      // Check the mimetypes to allow for upload
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        // Allow storage of file
        cb(null, true);
      } else {
        // Reject file
        cb(new BadRequestException(`Unsupported file type ${extname(file.originalname)}`), false);
      }
    },
    storage: diskStorage({
      destination: (req: any, file: any, cb: any) => {
        const uploadPath = join(__dirname, '../../..', process.env.STATIC_DIRNAME!, 'images');
        // Create folder if doesn't exist
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
      },
      filename: (req: any, file: any, cb: any) => {
        // Calling the callback passing the random name generated with the original extension name
        cb(null, `${randomUUID()}${extname(file.originalname)}`);
      },
    }),
};
