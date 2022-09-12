import {headers} from  "../constants/http-constants";

const getCarResponse = {
	getListResponse: {
		"success": (cars) => ({
			statusCode: 200,
			body: JSON.stringify(cars),
			headers
		}),
		"notFound": () => ({
			statusCode: 404,
			body: {},
			headers
		}),
		"failed": (message) => ({
			statusCode: 500,
			message: message,
			headers
		})
	},
	getByIdResponse: {
		"success": (car) => ({
			statusCode: 200,
			body: JSON.stringify(car),
			headers
		}),
		"notFound": () => ({
			statusCode: 404,
			body: {},
			headers
		}),
		"failed": (message) => ({
			statusCode: 500,
			message: message,
			headers
		})
	}
}

export default getCarResponse