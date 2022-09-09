import supertest from 'supertest';
import { urls } from '../config/index';

const Todo = {
  get: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
  getId: async (token, id) => {
    const response = await supertest(urls.challenge)
      .get(`/todos/${id}`)
      .set('X-CHALLENGER', token);
    return response;
  },
  head: async (token) => {
    const response = await supertest(urls.challenge)
      .head('/todos')
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
  post: async (token, path, body) => {
    const response = await supertest(urls.challenge)
      .post(path)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token)
      .send(body);
    return response;
  },
  postId: async (token, body, id) => {
    const response = await supertest(urls.challenge)
      .post(`/todos/${id}`)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token)
      .send(body);
    return response;
  },
  delete: async (token, id) => {
    const response = await supertest(urls.challenge)
      .delete(`/todos/${id}`)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
  options: async (token, path) => {
    const response = await supertest(urls.challenge)
      .options(path)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
  getXML: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('Accept', 'application/xml')
      .set('X-CHALLENGER', token);
    return response;
  },
  getJSON: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
  getANY: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('Accept', '*/*')
      .set('X-CHALLENGER', token);
    return response;
  },
  getXMLpref: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('Accept', 'application/xml, application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
  getNoAccept: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('X-CHALLENGER', token);
    return response;
  },
  getGzip: async (token, path) => {
    const response = await supertest(urls.challenge)
      .get(path)
      .set('Accept', 'application/gzip')
      .set('X-CHALLENGER', token);
    return response;
  },
  postXML: async (token, path, body) => {
    const response = await supertest(urls.challenge)
      .post(path)
      .set('Accept', 'application/xml')
      .set('Content-Type', 'application/xml')
      .set('X-CHALLENGER', token)
      .send(body);
    return response;
  },
  postAny: async (token, path, body) => {
    const response = await supertest(urls.challenge)
      .post(path)
      .set('Accept', '*/*')
      .set('Content-Type', '*/*')
      .set('X-CHALLENGER', token)
      .send(body);
    return response;
  },
  postXMLJson: async (token, path, body) => {
    const response = await supertest(urls.challenge)
      .post(path)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/xml')
      .set('X-CHALLENGER', token)
      .send(body);
    return response;
  },
  postJsonXML: async (token, path, body) => {
    const response = await supertest(urls.challenge)
      .post(path)
      .set('Accept', 'application/xml')
      .set('Content-Type', 'application/json')
      .set('X-CHALLENGER', token)
      .send(body);
    return response;
  },
  deleteAll: async (id, token) => {
    const response = await supertest(urls.challenge)
      .delete(`/todos/${id}`)
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    return response;
  },
};

export default Todo;
