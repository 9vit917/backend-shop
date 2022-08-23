interface ICarItem {
	id: string | number,
	title: string,
	description?: string,
	price: string,
	image?: string,
  };

export const cars: ICarItem[] = [{
	"id": 1,
	"title": "Nissan Xterra",
	"price": "12 000",
	"description": "not bit not painted"
  }, {
	"id": 2,
	"title": "Buick Regal",
	"price": "5 000",
	"description": "not bit not painted"
  }, {
	"id": 3,
	"title": "Dodge Sprinter",
	"price": "23 000",
	"description": "not bit not painted"
  }, {
	"id": 4,
	"title": "Mazda B2500",
	"price": "13 500",
	"description": "not bit not painted"
  }, {
	"id": 5,
	"title": "Dodge Dakota",
	"price": "21 000",
	"description": "not bit not painted"
  }, {
	"id": 6,
	"title": "Mitsubishi Outlander",
	"price": "11 700",
	"description": "not bit not painted"
  }, {
	"id": 7,
	"title": "Volkswagen Touareg",
	"price": "7 800",
	"description": "not bit not painted"
  }, {
	"id": 8,
	"title": "Honda Accord",
	"price": "5 600",
	"description": "not bit not painted"
  }, {
	"id": 9,
	"title": "Chevrolet 2500",
	"price": "18111",
	"description": "not bit not painted"
  }, {
	"id": 10,
	"title": "Audi S5",
	"price": "12 300",
	"description": "not bit not painted"
  }
]