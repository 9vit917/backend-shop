import { CarItem } from './../../models/CarItem';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
	S3,
	GetObjectCommand,
	PutObjectCommand,
	CopyObjectCommand,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

import FileParser from '../fileParser';

interface ImportServiceInterface {
	createUploadUrl(fileName: string): Promise<string>;
	parseUploadedFile(fileName: string);
	copyFile(fileName: string, targetFileName: string);
	deleteFile(fileName: string);
}

const UPLOADED_FOLDER_NAME = 'kavi-uploaded';
const PARSED_FOLDER_NAME = 'parsed';
const EXPIRATION_DEFAULT = 60;
const S3_REGION = new S3({
	region: 'eu-central-1',
});

const ImportService: ImportServiceInterface = {
	createUploadUrl(fileName: string): Promise<string> {
		const putObjectParams = {
			Bucket: UPLOADED_FOLDER_NAME,
			Key: `${UPLOADED_FOLDER_NAME}/${fileName}`,
		};
		console.log(fileName);
		console.log(putObjectParams);
		const command = new PutObjectCommand(putObjectParams);

		return getSignedUrl(S3_REGION, command, {
			expiresIn: EXPIRATION_DEFAULT,
		});
	},
	async parseUploadedFile(fileName: string) {
		const getObjectParams = {
			Bucket: UPLOADED_FOLDER_NAME,
			Key: fileName,
		};

		const command = new GetObjectCommand(getObjectParams);

		const response = await S3_REGION.send(command);
		const fileStream = response.Body as Readable | null;

		if (!fileStream) {
			return Promise.reject(`File not found: ${fileName}`);
		}

		const productFileParser = new FileParser<CarItem>();

		const parsedFile = await productFileParser.parseFileStream(fileStream);

		try {
			const targetFileName = fileName.replace(
				UPLOADED_FOLDER_NAME,
				PARSED_FOLDER_NAME
			);

			await ImportService.copyFile(fileName, targetFileName);
			await ImportService.deleteFile(fileName);
		} catch (e) {
			console.log('Failed to move file: ', fileName, e);
		}

		return parsedFile;
	},
	async copyFile(fileName: string, targetFileName: string): Promise<void> {
		const copyObjectParams = {
			Bucket: UPLOADED_FOLDER_NAME,
			CopySource: `${UPLOADED_FOLDER_NAME}/${fileName}`,
			Key: targetFileName,
		};

		const command = new CopyObjectCommand(copyObjectParams);

		await S3_REGION.send(command);

		console.log(`File moved succesfully: ${fileName} -> ${targetFileName}`);
	},
	async deleteFile(fileName: string): Promise<void> {
		const deleteObjectParams = {
			Bucket: UPLOADED_FOLDER_NAME,
			Key: fileName,
		};

		const command = new DeleteObjectCommand(deleteObjectParams);

		await S3_REGION.send(command);

		console.log(`File deleted succesfully: ${fileName}`);
	},
};

export default ImportService;
