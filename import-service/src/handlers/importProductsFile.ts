import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import ImportServiceInterface  from '../controllers/importService';

import importServiceResponse from '../mock/response-mock';
import { CarItem } from '../models/CarItem';

export const importProductsFile =
  (importService: ImportServiceInterface<CarItem>) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Lambda invocation with event: ', JSON.stringify(event));

    const { name: fileName } = event.queryStringParameters || {};

    if (!fileName) {
      return importServiceResponse.importProductsFile.badRequest('Filename is not valid');
    }

    try {
      const uploadUrl = await importService.createUploadUrl(fileName);

      console.log('Upload url created successfully', uploadUrl);

      return importServiceResponse.importProductsFile.success(uploadUrl);
    } catch (e) {
      console.log('An error occured while creating upload url', e);

      return importServiceResponse.importProductsFile.failed(
        'Failed to create upload url'
      );
    }
  };