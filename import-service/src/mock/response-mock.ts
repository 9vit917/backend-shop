import {headers} from  "../constants/http-constants";

const importServiceResponse = {
	importProductsFile: {
		"success": (url) => ({
			statusCode: 200,
			body: JSON.stringify(url),
			headers
		}),
		"badRequest": (message) => ({
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
}

export default importServiceResponse