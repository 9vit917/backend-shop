import axios from 'axios'
import { API_URL } from '../../constants/http-constants';

describe('getCarList', () => {
    describe('When getCarList had been called', () => {
        test('getCarById should return 200 OK', () => {
            axios.get(`${API_URL}/cars`).then((response) => {
                expect(response.status).toBe(200)
            })
        })
    })
}) 