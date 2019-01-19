import * as faker from "faker/locale/pl";


export class DataGenerator {
    public static generateData() {
        let listOfRandomData = [];
        let randomSize = faker.random.number({ min: 1, max: 10, precision: 1 });

        for (let i = 0; i < randomSize; i++) {
            listOfRandomData.push(this.randomObject)
        }

        return listOfRandomData;
    }

    private static get randomObject() {
        return {
            customer: {
                address: {
                    country: faker.address.country(),
                    city: faker.address.city(),
                    zipCode: faker.address.zipCode(),
                    street: faker.address.streetName(),
                    streetNumber: faker.random.number({ min: 1, max: 99, precision: 1 })
                },
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
            },
            title: faker.commerce.productName(),
            remarks: faker.random.words(faker.random.number({ min: 5, max: 20, precision: 1 })),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber("+48 ### ### ###"),
            date: faker.date.recent(),
            items: this.getRandomItems()
        }
    }

    private static getRandomItems() {
        let items = [];
        let randomSize = faker.random.number({ min: 2, max: 6, precision: 1 });
        for (let i = 0; i < randomSize; i++) {
            items.push({
                name: faker.random.words(3),
                quantity: faker.random.number(faker.random.number({ min: 10, max: 100 })),
                price: faker.random.number(faker.random.number({ min: 10, max: 9999 })),
            })
        }
        return items;
    }

    public static generateRandomItem() {
        return {
            "itemID": `I000${faker.random.number({ min: 10, max: 99, precision: 1 })}`,
            "description": faker.commerce.productName(),
            "onStock": faker.random.number({ min: 100, max: 999, precision: 1 }),
            "price": faker.random.number({ min: 1, max: 200, precision: 2 })
        }
    }
}
