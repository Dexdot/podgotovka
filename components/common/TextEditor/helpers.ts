import { FilesAPI } from '@/api/common/upload';

import { showAlert } from '@/utils/network';

export interface UploadImageI {
  success: number;
  file: {
    url: string;
  };
}

export interface UploadFileI {
  success: number;
  file: {
    url: string;
    name?: string;
    size?: number;
    extension?: number;
  };
}

export async function uploadImage(file: File): Promise<UploadImageI> {
  try {
    const { data } = await FilesAPI.uploadImage(file);
    return {
      success: 1,
      file: {
        url: data.fullLink
      }
    };
  } catch (error) {
    showAlert({ error });
    return {
      success: 0,
      file: {
        url: ''
      }
    };
  }
}

export async function uploadFile(file: File): Promise<UploadFileI> {
  try {
    const { data } = await FilesAPI.uploadFile(file);
    return {
      success: 1,
      file: {
        url: data.file_link,
        size: data.size,
        name: data.name
      }
    };
  } catch (error) {
    showAlert({ error });
    return {
      success: 0,
      file: {
        url: ''
      }
    };
  }
}
