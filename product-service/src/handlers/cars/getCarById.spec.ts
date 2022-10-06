import { API_URL } from '../../constants/http-constants';
import axios from 'axios';

describe('getCarById', () => {
	describe('Positive test with the right id', () => {
		test('should be return car with id = 1', () => {
			const id = '852f0597-ade4-4717-a027-6d8612f647d3';
			axios.get(`${API_URL}/cars/${id}`).then((response) => {
				expect(response.status).toBe(200);
			});
		});
	});
	describe('Negative test with incorrect id', () => {
		test('should be return 404', () => {
			axios.get(`${API_URL}/cars/id=1fd`).catch((error) => {
				expect(error.message).toBe(
					'Request failed with status code 404'
				);
			});
		});
	});
});
