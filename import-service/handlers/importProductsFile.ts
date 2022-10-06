import { APIGatewayProxyEvent, APIGatewayProxyResult } from './node_modules/aws-lambda';

import { ImportServiceInterface } from './node_modules/@/services/importService';

import { HttpResponse } from './node_modules/@/utils';
import { StatusCode } from './node_modules/@/consts';
import { Product } from './node_modules/@/types/products';

export const importProductsFile =
  (importService: ImportServiceInterface<Product>) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Lambda invocation with event: ', JSON.stringify(event));

    const { name: fileName } = event.queryStringParameters || {};

    if (!fileName) {
      return HttpResponse.createErrorResponse(StatusCode.BadRequest, 'Filename is not valid');
    }

    try {
      const uploadUrl = await importService.createUploadUrl(fileName);

      console.log('Upload url created successfully', uploadUrl);

      return HttpResponse.createSuccessResponse(uploadUrl);
    } catch (e) {
      console.log('An error occured while creating upload url', e);

      return HttpResponse.createErrorResponse(
        StatusCode.ServerError,
        'Failed to create upload url'
      );
    }
  };