import { CartItem } from '../models/CartItem';
import * as AWS from 'aws-sdk';

let options = {};

if (process.env.IS_OFFLINE) {
	options = {
		region: 'localhost',
		endpoint: 'http://localhost:8000',
	};
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);
const CARS_TABLE_NAME = process.env.CARS_TABLE_NAME;

export const Dynamo = {
	async getCarById(id) {
		const params = {
			TableName: CARS_TABLE_NAME,
			Key: {
				id,
			},
		};

		try {
			const res = await documentClient.get(params).promise();
			return res.Item;
		} catch (err) {
			console.log(err);
			console.log(
				`There was an error fetching the data from table name ${CARS_TABLE_NAME}`
			);
		}
	},

	async getCarList() {
		const params = {
			TableName: CARS_TABLE_NAME,
			KeyConditionExpression: "PK = :pk and Sk = :sk"
		};
		try {
			const res = await documentClient.scan(params).promise();
			return res.Items;
		} catch (err) {
			console.log(err);
			console.log(
				`There was an error fetching the data from table name ${CARS_TABLE_NAME}`
			);
		}
	},

	async createNewCarItem(newCarData: CartItem) {
		const params = {
			TableName: CARS_TABLE_NAME,
			Item: {
				"PK": newCarData.id,
				"SK": "car",
				"id": newCarData.id,
				"title": newCarData.title,
				"price": newCarData.price,
				"description": newCarData.description
			},
		};
		try {
			const res = await documentClient.put(params).promise().then(async () => {
				const stockParams = {
					TableName: CARS_TABLE_NAME,
					Item: {
						"PK": newCarData.id,
						"SK": "stock",
						"count": newCarData.count || 1,
					}
				};
				await documentClient.put(stockParams)
			});
		} catch (err) {
			console.log(err);
			console.log(`There was an error adding new item to table`);
		}
		return newCarData;
	},
};
