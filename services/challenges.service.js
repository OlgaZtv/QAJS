import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';
import { loadApispec, validate } from '../lib/validator';

const Chanllenges = {
  get: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/challenges')
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApispec('./lib/Simple-Todo-List-swagger.json');
    const schema = apiSpec.paths['/challenges'].get.responses[200];
    validate(schema, response.body);
    return response;
  },
};

export default Chanllenges;
