import carController from '../../controllers/car-controller';
import getCarResponse from '../../mock/response-mock';

module.exports.handler = async (event: any) => {
	const { id } = event.pathParameters;
	const {getByIdResponse} = getCarResponse;
	try {
        const car = carController.getCarById(id)
        if (car) {
			return getByIdResponse.success(car);
        } else {
            return getByIdResponse.notFound();
        }
    } catch (error) {
        return getByIdResponse.failed(error.message);
    }
};