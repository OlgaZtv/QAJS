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
  it('Получить список заданий get /challenges', async () => {
    const r = await api().Chanllenges().get(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('Выполнить GET запрос на `/todos` 200', async () => {
    const path = '/todos';
    const r = await api().Todo().get(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('Не получить список задач с некорреткного эндпоинта get /todo', async () => {
    const path = '/todo';
    const r = await api().Todo().get(token, path);
    assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
  });

  it('Выполнить GET запрос на `/todos/{id}` 200', async () => {
    const path = '/todos';
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    let r = await api().Todo().post(token, path, body);
    r = await api().Todo().getId(token, r.body.id);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  it('Просмотреть несуществующую задачу get /todo/{id} 404', async () => {
    const path = '/todos/0';
    const r = await api().Todo().get(token, path);
    assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
  });

  it('Выполнить HEAD запрос на `/todos` 200', async () => {
    const r = await api().Todo().head(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  it('Выполнить POST запрос на создание TODO `/todos` 201', async () => {
    const body = {
      title: 'create new todo',
      doneStatus: true,
      description: 'some description',
    };
    const path = '/todos';
    const r = await api().Todo().post(token, path, body);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  it('Выполнить POST запрос на создание TODO, не пройти проверку в поле doneStatus `/todos` 400', async () => {
    const body = {
      title: 'create new todo',
      doneStatus: 'some',
      description: 'some description',
    };
    const path = '/todos';
    const r = await api().Todo().post(token, path, body);
    assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
  });

  it('Выполнить POST запрос на обновление TODO `/todos/{id}` 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    const path = '/todos';
    let r = await api().Todo().post(token, path, body);
    const newBody = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    r = await api().Todo().postId(token, newBody, r.body.id);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  it('Выполнить GET запрос на `/todos` с фильтром запроса для вывода задач в статусе сделаны 200', async () => {
    const path = '/todos?doneStatus=true';
    const r = await api().Todo().get(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  // eslint-disable-next-line mocha/no-exclusive-tests
  it('Выполнить DELETE запрос на `/todos`', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    const path = '/todos';
    let r = await api().Todo().post(token, path, body);
    r = await api().Todo().delete(token, r.body.id);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('Выполнить OPTIONS запрос на `/todos`', async () => {
    const path = '/todos';
    const r = await api().Todo().options(token, path);
    assert.strictEqual(r.headers.allow, 'OPTIONS, GET, HEAD, POST', 'header is not Allow');
  });
  it('GET /todos (200) XML', async () => {
    const path = '/todos';
    const r = await api().Todo().getXML(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('GET /todos (200) JSON', async () => {
    const path = '/todos';
    const r = await api().Todo().getJSON(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('GET /todos (200) ANY', async () => {
    const path = '/todos';
    const r = await api().Todo().getANY(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('GET /todos (200) XML pref', async () => {
    const path = '/todos';
    const r = await api().Todo().getXMLpref(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('GET /todos (200) no accept', async () => {
    const path = '/todos';
    const r = await api().Todo().getNoAccept(token, path);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });
  it('GET /todos (406)', async () => {
    const path = '/todos';
    const r = await api().Todo().getGzip(token, path);
    assert.strictEqual(r.statusCode, 406, 'statusCode не 406');
  });
  it('POST /todos XML', async () => {
    const body = '<todo><doneStatus>true</doneStatus> <title>file paperwork today</title></todo>';
    const path = '/todos';
    const r = await api().Todo().postXML(token, path, body);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });
  it('POST /todos (415)', async () => {
    const body = '<todo><doneStatus>true</doneStatus> <title>file paperwork today</title></todo>';
    const path = '/todos';
    const r = await api().Todo().postAny(token, path, body);
    assert.strictEqual(r.statusCode, 415, 'statusCode не 415');
  });
  it('POST /todos XML to JSON', async () => {
    const body = '<todo><doneStatus>true</doneStatus> <title>file paperwork today</title></todo>';
    const path = '/todos';
    const r = await api().Todo().postXMLJson(token, path, body);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });
  it('POST /todos JSON to XML', async () => {
    const body = {
      title: 'create new todo',
      doneStatus: true,
      description: 'some description',
    };
    const path = '/todos';
    const r = await api().Todo().postJsonXML(token, path, body);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });
  it('DELETE /heartbeat (405)', async () => {
    const r = await api().Heartbeat().delete(token);
    assert.strictEqual(r.statusCode, 405, 'statusCode не 405');
  });
  it('PATCH /heartbeat (500)', async () => {
    const r = await api().Heartbeat().patch(token);
    assert.strictEqual(r.statusCode, 500, 'statusCode не 500');
  });
  it('TRACE /heartbeat (501)', async () => {
    const r = await api().Heartbeat().trace(token);
    assert.strictEqual(r.statusCode, 501, 'statusCode не 501');
  });
  it('GET /heartbeat (204)', async () => {
    const r = await api().Heartbeat().get(token);
    assert.strictEqual(r.statusCode, 204, 'statusCode не 204');
  });
  it('POST /secret/token (401)', async () => {
    const r = await api().Secret().postUn(token);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 204');
  });
  it('POST /secret/token (201)', async () => {
    const r = await api().Secret().postGood(token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });
  it('GET /secret/note (403)', async () => {
    const r = await api().Secret().get403(token);
    assert.strictEqual(r.statusCode, 403, 'statusCode не 403');
  });
  it('GET /secret/note (401)', async () => {
    const r = await api().Secret().get401(token);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 401');
  });
  it('GET /secret/note (200)', async () => {
    const r = await api().Secret().postGood(token);
    const authToken = r.headers['x-auth-token'];
    const newR = await api().Secret().get200(token, authToken);
    assert.strictEqual(newR.statusCode, 200, 'statusCode не 200');
  });
  it('POST /secret/note (200)', async () => {
    const r = await api().Secret().postGood(token);
    const authToken = r.headers['x-auth-token'];
    const body = {
      note: 'my note',
    };
    const newR = await api().Secret().post(token, body, authToken);
    assert.strictEqual(newR.statusCode, 200, 'statusCode не 200');
  });
  it('POST /secret/note (401)', async () => {
    const body = {
      note: 'my note',
    };
    const r = await api().Secret().post401(token, body);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 401');
  });
  it('POST /secret/note (403)', async () => {
    const body = {
      note: 'my note',
    };
    const r = await api().Secret().post403(token, body);
    assert.strictEqual(r.statusCode, 403, 'statusCode не 403');
  });
  it('GET /secret/note (Bearer)', async () => {
    const r = await api().Secret().postGood(token);
    const authToken = r.headers['x-auth-token'];
    const newR = await api().Secret().getBearer(token, authToken);
    assert.strictEqual(newR.statusCode, 200, 'statusCode не 200');
  });
  it('POST /secret/note (Bearer)', async () => {
    const r = await api().Secret().postGood(token);
    const authToken = r.headers['x-auth-token'];
    const body = {
      note: 'my note',
    };
    const newR = await api().Secret().postBearer(token, body, authToken);
    assert.strictEqual(newR.statusCode, 200, 'statusCode не 200');
  });
  it('DELETE /todos/{id} (200) all', async () => {
    const path = '/todos';
    let r = await api().Todo().get(token, path);
    r.body.todos.forEach((item) => {
      api().Todo().deleteAll(item.id, token);
    });
    r = await api().Todo().get(token, path);
    assert.isEmpty(r.body.todos, 'Есть неудалённые todo');
  });
});
