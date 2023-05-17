import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';
import { UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true
});

export const uploadImage = async (
  filePath: string
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: 'image',
    folder: 'Apollofy',
    height: 300,
    width: 300,
    crop: 'scale',
    overwrite: true
  });
};

export const uploadTrack = async (
  filePath: string
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: 'video',
    folder: 'Apollofy-Track'
  });
};
