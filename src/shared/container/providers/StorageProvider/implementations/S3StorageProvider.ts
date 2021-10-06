import uploadConfig from '@config/upload';
import { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';
import { IStorageProvider } from '../IStorageProvider';


class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalFileName = resolve(uploadConfig.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalFileName);

    const ContentType = mime.getType(originalFileName);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalFileName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };

