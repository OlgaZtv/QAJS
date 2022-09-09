import supertest from 'supertest';
import { urls } from '../config/index';

const Secret = {
  postUn: async (token) => {
    const response = await supertest(urls.challenge)
      .post('/secret/token')
      .set('Authorization', 'Basic YWRtaW46MTIzNA==')
      .set('Accept', '*/*')
      .set('X-CHALLENGER', token);
    return response;
  },
  postGood: async (token) => {
    const response = await supertest(urls.challenge)
      .post('/secret/token')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .set('Accept', '*/*')
      .set('X-CHALLENGER', token);
    return response;
  },
  get403: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .set('x-auth-token', 'test')
      .set('Accept', '*/*')
      .set('X-CHALLENGER', token);
    return response;
  },
  get401: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .set('Accept', '*/*')
      .set('X-CHALLENGER', token);
    return response;
  },
  get200: async (token, authToken) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .set('Accept', '*/*')
      .set('x-auth-token', authToken)
      .set('X-CHALLENGER', token);
    return response;
  },
  post: async (token, body, authToken) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .set('Accept', '*/*')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send(body)
      .set('x-auth-token', authToken)
      .set('X-CHALLENGER', token);
    return response;
  },
  post401: async (token, body) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .set('Accept', '*/*')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send(body)
      .set('X-CHALLENGER', token);
    return response;
  },
  post403: async (token, body) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .set('x-auth-token', 'test')
      .set('Accept', '*/*')
      .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
      .send(body)
      .set('X-CHALLENGER', token);
    return response;
  },
  getBearer: async (token, authToken) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', '*/*')
      .set('X-CHALLENGER', token);
    return response;
  },
  postBearer: async (token, body, authToken) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', '*/*')
      .send(body)
      .set('X-CHALLENGER', token);
    return response;
  },
};

export default Secret;