import supertest from 'supertest';
import { urls } from '../config/index';

const Heartbeat = {
  delete: async (token) => {
    const response = await supertest(urls.challenge)
      .delete('/heartbeat')
      .set('X-CHALLENGER', token)
      .set('Accept', 'application/json');
    return response;
  },
  patch: async (token) => {
    const response = await supertest(urls.challenge)
      .patch('/heartbeat')
      .set('X-CHALLENGER', token)
      .set('Accept', 'application/json');
    return response;
  },
  trace: async (token) => {
    const response = await supertest(urls.challenge)
      .trace('/heartbeat')
      .set('X-CHALLENGER', token)
      .set('Accept', 'application/json');
    return response;
  },
  get: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/heartbeat')
      .set('X-CHALLENGER', token)
      .set('Accept', 'application/json');
    return response;
  },
};

export default Heartbeat;
