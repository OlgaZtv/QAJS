import chai from 'chai';
import Chanllenger from '../services/challenger.service';
import Chanllenges from '../services/challenges.service';
import Todo from '../services/todos.service';
import TodoBuilder from '../fixtures/builder/todo';

const assert = chai.assert;

describe ('Отправляем сетевые запросы', () => {
    let token;
    before ('Получить токен', async () => {
       const response = await Chanllenger.post();
       token = response.headers['x-challenger'];
    });
    after ('Посмотреть результат', async () => {
        console.log('Результаты смотреть здесь');
     console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
     });
    it ('Получить список заданий get /challenges', async () => {
        const r = await Chanllenges.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Выполнить GET запрос на `/todos` 200', async () => {
        const path = '/todos';
        const r = await Todo.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Не получить список задач с некорреткного эндпоинта get /todo', async () => {
        const path = '/todo';
        const r = await Todo.get(token, path);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });

    it ('Выполнить GET запрос на `/todos/{id}` 200', async () => {
        const path = '/todos';
        const body = new TodoBuilder().setName().setDescription().setDoneStatus(false).build();
        let r = await Todo.post(token, path, body);
        r = await Todo.getId(token, r.body.id);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Просмотреть несуществующую задачу get /todo/{id} 404', async () => {
        const path = '/todos/0';
        const r = await Todo.get(token, path);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });

    it ('Выполнить HEAD запрос на `/todos` 200', async () => {
        const r = await Todo.head(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Выполнить POST запрос на создание TODO `/todos` 201', async () => {
        const body = {
             "title": "create new todo",
             "doneStatus": true, 
             "description": "some description"
            };
        const path = '/todos';
        const r = await Todo.post(token, path, body);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });

    it ('Выполнить POST запрос на создание TODO, не пройти проверку в поле doneStatus `/todos` 400', async () => {
        const body = {
             "title": "create new todo",
             "doneStatus": 'some', 
             "description": "some description"
            };
        const path = '/todos';
        const r = await Todo.post(token, path, body);
        assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
    });
    
    it ('Выполнить POST запрос на обновление TODO `/todos/{id}` 200', async () => {
        const body = new TodoBuilder().setName().setDescription().setDoneStatus(false).build();
        const path = '/todos';
        let r = await Todo.post(token, path, body);
        const newBody = new TodoBuilder().setName().setDescription().setDoneStatus(false).build();
        r = await Todo.postId(token, newBody, r.body.id);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Выполнить GET запрос на `/todos` с фильтром запроса для вывода задач в статусе сделаны 200', async () => {
        const path = '/todos?doneStatus=true';
        const r = await Todo.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
}); 