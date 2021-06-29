import { AxiosResponse } from 'axios';

import { PodgotovkaAPI } from '@/api/instance';
import { FileI } from '@/types/common';
import { getFormData } from '@/utils/network';

const { axios } = PodgotovkaAPI;
const SERVICE_PATH = '/fstorage/v1/files';

// TODO
function uploadFile(file: File): Promise<AxiosResponse<FileI>> {
  return axios.post<FileI>(
    `${SERVICE_PATH}/documents/upload`,
    getFormData({ file })
  );
}

export const FilesAPI = { uploadFile };
