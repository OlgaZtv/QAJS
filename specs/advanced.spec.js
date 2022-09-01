/* eslint-disable linebreak-style */
import chai from 'chai';
import { api } from '../services/index';
import { TodoBuilder } from '../fixtures/builder/index';

const { assert } = chai;

describe('Отправляем сетевые запросы', () => {
  let token;
  before('Получить токен', async () => {
    const response = await api().Chanllenger().post();
    token = response.headers['x-challenger'];
  });
  after('Посмотреть результат', async () => {
    console.log('Результаты смотреть здесь');
    console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
  });
  it('Выполнить GET запрос на `/todos` 200', async () => {
    const path = '/todos';
    const {body, statusCode} = await api().Todo().get(token, path);
    // eslint-disable-next-line no-unused-vars
    let count = 0;
    body.todos.forEach((element) => {
      // eslint-disable-next-line no-console
      if (element.title.lenght >= 5) { count += 1; }
    });
    body.todos.forEach((element, index, array) => {
      console.log(`${JSON.stringify(element)} имеет позицию ${index} в массиве ${array}`);
      console.log('***************');
      assert.strictEqual(element.doneStatus, false, 'Есть незакрытые задачи');
    });
    assert.isAbove(count, 4, 'Нет задач с именем >= 5 символов');
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  // eslint-disable-next-line linebreak-style
  });
  it('Выполнить GET запрос на `/todos` 200 и проверить, что они завершенные', async () => {
    const path = '/todos';
    const {body} = await api().Todo().get(token, path);
    // eslint-disable-next-line no-unused-vars
    body.todos.forEach((element) => {
      assert.strictEqual(element.doneStatus, false, 'Есть незакрытые задачи');
    });
  });
  it('Check Even numbers', () => {
    const numbers = [1, 3, 5, 7, 9, 11, 12];
    const hasEvenNumber = numbers.some((item) => item % 2 === 0);
    assert.strictEqual(hasEvenNumber, false, 'В массиве есть четные числа');
  });
  it('В челлендже нет 40 задачи', async () => {
    const {body} = await api().Chanllenges().get(token);
    const has40Number = body.challenges.some((item) => item.id === '40');
    assert.strictEqual(has40Number, false, 'Есть задача номер 40');
  });
  it.only('Pets', () => {
    const pets = ['dog','cat','snake','hedgehog', 'cow'];
    const n = pets.map(
      (item) => item.length,
    );
    const petsName = [
      {
        name: 'Gregory',
        id: 'dog'
      },
      {
        name: 'Nat',
        id: 'cat'
      },
      {
        name: 'Pete',
        id: 'snake'
      },
      {
        name: 'Bond',
        id: 'hedgehog'
      },
      {
        name: 'Belka',
        id: 'cow'
      },
    ];
    const m = petsName.map(
      (item) => item.name,
    );
    console.log(m);
    assert.strictEqual(1, 1, '1');
  });
});
