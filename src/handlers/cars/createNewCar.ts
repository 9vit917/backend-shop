import carController from '../../controllers/car-controller';
import getCarResponse from '../../mock/response-mock';

module.exports.handler = async (event: any) => {
	const data =
		typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
	console.log("CrateNewCar data:", data)
	const { createNewCarResponse } = getCarResponse;
	if (!data?.title || (!data?.price || isNaN(+data?.price))) {
		return createNewCarResponse.validationFailed('The body is invalid');
	}
	try {
		console.log("Add car data: ", data);
		const newCar = await carController.createNewCar(data);
		if (newCar?.id) {
			return createNewCarResponse.success(`Car ${newCar.id} was created`);
		} else {
			return createNewCarResponse.failed("Something went wrong");
		}
	} catch (error) {
		return createNewCarResponse.failed(error.message);
	}
};
