import { API_URL } from '../../constants/http-constants';
import axios from 'axios';

describe('Add new Car', () => {
	describe('Negative test with wrong price', () => {
		test('should be return status 400', () => {
			const body = {
				title: 'BMW X5',
				price: '23f000',
				description: 'not bit not painted',
			};
			axios.post(`${API_URL}/cars`, body).then((response) => {
				expect(response.status).toBe(400);
			}).catch((error) => {
                expect(error.message).toBe("The body is invalid")
            });
		});
	});
	describe('Negative test without price field', () => {
		test('should be return status 400', () => {
			const body = {
				title: 'BMW X5',
				description: 'not bit not painted',
			};
			axios.post(`${API_URL}/cars`, body).then((response) => {
				expect(response.status).toBe(400);
			}).catch((error) => {
                expect(error.message).toBe("The body is invalid")
            });
		});
	});
	describe('Positive test with correct body', () => {
		test('should be return 200', () => {
			const body = {
				title: 'BMW X5',
				price: '23000',
				description: 'not bit not painted',
			};
			axios.post(`${API_URL}/cars`, body).then((response) => {
				expect(response.status).toBe(200);
			});
		});
	});
});
