import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import ImportService from '../controllers/importService';

import importServiceResponse from '../mock/response-mock';

module.exports.handler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	console.log('Lambda invocation with event: ', JSON.stringify(event));

	const { name: fileName } = event.queryStringParameters || {};

	if (!fileName) {
		return importServiceResponse.importProductsFile.badRequest(
			'Filename is not valid'
		);
	}

	try {
		const uploadUrl = await ImportService.createUploadUrl(fileName);

		console.log('Upload url created successfully', uploadUrl);

		return importServiceResponse.importProductsFile.success(uploadUrl);
	} catch (e) {
		console.log('An error occured while creating upload url', e);

		return importServiceResponse.importProductsFile.failed(
			'Failed to create upload url'
		);
	}
};
