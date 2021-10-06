import uploadConfig from '@config/upload';
import { deleteFile } from '@utils/file';
import fs from 'fs';
import { resolve } from 'path';
import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(`${uploadConfig.tmpFolder}/${folder}`, file)
    );
    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${uploadConfig.tmpFolder}/${folder}`, file);
    await deleteFile(filename);
  }
}

export { LocalStorageProvider };

