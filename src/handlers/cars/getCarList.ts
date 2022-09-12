import getCarResponse from '../../mock/response-mock';
import carController from '../../controllers/car-controller';

module.exports.handler = async () => {
	const {getListResponse} = getCarResponse;
    try {
        const carsList = carController.getList()
        if (carsList) {
			return getListResponse.success(carsList)
        } else {
            return getListResponse.notFound();
        }
    } catch (error) {
        return getListResponse.failed(error.message);
    }
};