import supertest from 'supertest';
import chai from 'chai';

const { assert } = chai;

describe('Это демо сьют', () => {
  it('Калькулятор', () => {
    // arrange
    const numberA = 1;

    // act + assert
    assert.strictEqual(numberA + 1, 2, 'a+1 не равно 2');
  });
});

describe('Отправляем сетевые запросы', () => {
  it('Получить список доступных книг get /booking 200', async () => {
    const response = await supertest('https://restful-booker.herokuapp.com')
      .get('/booking');

    assert.strictEqual(response.statusCode, 200, 'statusCode не 200');
  });
  it('Создать новую книгу post /booking 200', async () => {
    const bookNew = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01',
      },
      additionalneeds: 'Breakfast',
    };
    const response = await supertest('https://restful-booker.herokuapp.com')
      .post('/booking')
      .send(bookNew)
      .set('Accept', 'application/json');
    assert.strictEqual(response.statusCode, 200, 'statusCode не 200');
  });
});
