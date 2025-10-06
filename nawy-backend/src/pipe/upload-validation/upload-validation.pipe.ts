import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import configuration from '../../config/configuration';

@Injectable()
export class UploadValidationPipe implements PipeTransform {
  private readonly allowedFormats = ['jpeg', 'jpg', 'png'];

  transform(files: Express.Multer.File[] | Express.Multer.File | undefined) {
    if (!files) {
      return [];
    }

    const fileArray = Array.isArray(files) ? files : [files];
    const appConfig = configuration();

    for (const file of fileArray) {
      // Validate image format
      const fileFormat = file.originalname.split('.').pop()?.toLowerCase();
      if (!fileFormat || !this.allowedFormats.includes(fileFormat)) {
        throw new BadRequestException(`Invalid image format: ${file.originalname}`);
      }

      // Validate file size
      if (file.size > appConfig.upload.maxFileSize) {
        throw new BadRequestException(`File too large: ${file.originalname}`);
      }
    }

    return fileArray;
  }
}
