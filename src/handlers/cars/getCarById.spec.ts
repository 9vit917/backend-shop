import { API_URL } from '../../constants/http-constants';
import axios from 'axios'

describe('getCarById', () => {
    describe('Positive test with the right id', () => {
        test('should be return car with id = 1', () => {
            axios.get(`${API_URL}/cars/1`).then((response) => {
                expect(response.status).toBe(200)
            })
        })
    })
    describe('Negative test with incorrect id', () => {
        test('should be return 404', () => {
            axios.get(`${API_URL}/cars/id=1fd`).catch((error) => {
                expect(error.message).toBe("Request failed with status code 404")
            })
        })
    })
}) 