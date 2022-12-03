import { S3Event } from 'aws-lambda';

import ImportService from '../controllers/importService';
import { CarItem } from '../models/CarItem';

module.exports.handler = async (event: S3Event) => {
	console.log('Lambda invocation with event: ', JSON.stringify(event));

	try {
		await Promise.all(
			event.Records.map(async (record) => {
				const fileName = record.s3.object.key;

				console.log('Start file parsing: ', fileName);

				const parsed: CarItem[] = await ImportService.parseUploadedFile(
					fileName
				);

				console.log(
					'File parsed successfully: ',
					JSON.stringify(parsed)
				);
			})
		);
	} catch (e) {
		console.log('An error occured while parsing the file', e);
	}
};
