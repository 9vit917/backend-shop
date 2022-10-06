import { CartItem } from '../models/CartItem';
import { Dynamo } from '../config/dynamoDb';
import { v4 as uuidv4 } from 'uuid';

const carController = {
	getList: async () => {
		const carList = await Dynamo.getCarList();
		console.log('carList', carList);
		return carList;
	},

	getCarById: async (id: string) => {
		const carItem = await Dynamo.getCarById(id);
		console.log('carItem', carItem);
		return carItem;
	},
	createNewCar: async (newCarData) => {
		const newCar: CartItem = {
			id: uuidv4(),
			title: newCarData.title,
			description: newCarData.description || '',
			price: newCarData.price,
			count: newCarData.count || 0,
		};
		const data = await Dynamo.createNewCarItem(newCar);
		console.log('newCar', data);
		return data;
	},
};

export default carController;
