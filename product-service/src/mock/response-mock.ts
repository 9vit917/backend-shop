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
			body: JSON.stringify(message),
			headers
		})
	},
	getByIdResponse: {
		"success": (car) => ({
			statusCode: 200,
			body: JSON.stringify(car),
			headers
		}),
		"notFound": (message) => ({
			statusCode: 404,
			body: JSON.stringify(message),
			headers
		}),
		"failed": (message) => ({
			statusCode: 500,
			body: JSON.stringify(message),
			headers
		})
	},
	createNewCarResponse: {
		"success": (message) => ({
			statusCode: 200,
			body: JSON.stringify({message}),
			headers
		}),
		"failed": (message) => ({
			statusCode: 500,
			body: JSON.stringify({message}),
			headers
		}),
		"validationFailed": (message) => ({
			statusCode: 400,
			body: JSON.stringify({message}),
			headers
		})
	},
}

export default getCarResponse