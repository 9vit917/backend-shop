import {cars} from "../mock/data";

const carController = {
    getList() {
        return cars
    },
    getCarById(id: string) {
        const carItem = cars.find(
            (item) => item.id.toString() === id
        );
        return carItem
    }
}

export default carController;