import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { FileI, UploadedFileI } from '@/types/common';
import { getFormData } from '@/utils/network';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/fstorage/v1/files';

function uploadFile(file: File): Promise<AxiosResponse<FileI>> {
  const { name, size } = file;

  return axios.post(`${SERVICE_PATH}/documents/upload`, getFormData({ file }), {
    transformResponse: [
      (data) => {
        const uploadedFile: UploadedFileI = JSON.parse(data);

        return {
          file_link: uploadedFile.fullLink,
          name,
          size
        };
      }
    ]
  });
}

// function uploadFile(file: File): Promise<AxiosResponse<UploadedFileI>> {
//   return axios.post<UploadedFileI>(
//     `${SERVICE_PATH}/documents/upload`,
//     getFormData({ file })
//   );
// }

function uploadImage(file: File): Promise<AxiosResponse<UploadedFileI>> {
  return axios.post<UploadedFileI>(
    `${SERVICE_PATH}/images/upload`,
    getFormData({ file })
  );
}

export const FilesAPI = { uploadFile, uploadImage };
