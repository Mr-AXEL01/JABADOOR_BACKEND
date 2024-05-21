import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    
    async uploadImage(imageUrl: string ,  folderName: string): Promise<UploadApiResponse> {
        return cloudinary.uploader.upload(imageUrl, {
            folder: folderName 
          });
    }
}
