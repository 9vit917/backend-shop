import { v4 } from 'uuid';

import productService from '../../controllers/car-controller';
import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';

import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import getCarResponse from '../../mock/response-mock';

const snsClient = new SNSClient({ region: 'eu-central-1' });

export const catalogBatchProcessHandler = async (
	event: SQSEvent
): Promise<APIGatewayProxyResult> => {
	const {catalogBatchProcess } = getCarResponse;
	console.log('Incoming Event', event);
	try {
		console.log("event Recoeds", event.Records)
		const newProducts = JSON.parse(event);
		for (const newProduct of newProducts) {
			const id = v4();
			// @ts-ignore
			const { title, description, count, price } = newProduct;

			if (!title || !description || !count || !price) {
				catalogBatchProcess.validationFailed('Invalid post data')
			}

			const product = await productService.createNewCar({
				id,
				title,
				description,
				count: +count,
				price: +price,
			});
			console.log('Created Product', product);
			const params = {
				Message: JSON.stringify(product),
				TopicArn: process.env.SNS_ARN,
				Subject: 'Hello',
			};

			snsClient.send(new PublishCommand(params), (err) =>
				console.log(err)
			);
		}

		return catalogBatchProcess.success();
	} catch (e) {
		console.log('Error', e);

		return catalogBatchProcess.failed(e);
	}
};

module.exports.handler = catalogBatchProcessHandler;
