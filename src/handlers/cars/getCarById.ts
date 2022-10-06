import carController from '../../controllers/car-controller';
import getCarResponse from '../../mock/response-mock';

module.exports.handler = async (event: any) => {
	const { id } = event.pathParameters;
	const { getByIdResponse } = getCarResponse;
	try {
		console.log('GetCarById:', id);
		const car = await carController.getCarById(id);
		console.log('car:', car);
		if (car) {
			return getByIdResponse.success(car);
		} else {
			return getByIdResponse.notFound(`Car with id ${id} not found`);
		}
	} catch (error) {
		return getByIdResponse.failed(error.message);
	}
};
