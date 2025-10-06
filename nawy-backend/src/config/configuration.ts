import { config } from 'dotenv';
import { join } from 'path';

// Load environment variables from root .env file
config({ path: join(process.cwd(), '.env') });

export default () => ({
  port: Number(process.env.PORT) || 3000,
  app_prefix: process.env.APP_PREFIX || 'api',
  database: {
    url:
      process.env.DATABASE_URL,
  },
  pagination: {
    defaultPage: Number(process.env.DEFAULT_PAGE) || 1,
    defaultPageSize: Number(process.env.DEFAULT_PAGE_SIZE) || 10,
  },
  upload: {
    maxFileSize: Number(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    maxFilesPerEntity: Number(process.env.MAX_FILES_PER_ENTITY) || 10,
    uploadPath: process.env.UPLOAD_PATH || './uploads',
    allowedMimeTypes: ['image/jpeg', 'image/png'],
  },
});
