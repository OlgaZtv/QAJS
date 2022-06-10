import chai from 'chai';
import Chanllenger from '../services/challenger.service';
import Chanllenges from '../services/challenges.service';

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
    it ('Получить список заданий', async () => {
        const r = await Chanllenges.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
});