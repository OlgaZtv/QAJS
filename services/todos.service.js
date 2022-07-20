import supertest from 'supertest';
import {urls} from '../config/index';

const Todo = {
    get: async(token, path)=>{
        const response = await supertest(urls.challenge)
        .get(path)
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    },
    getId: async(token, id)=>{
        const response = await supertest(urls.challenge)
        .get(`/todos/${id}`)
        .set('X-CHALLENGER', token);
        return response;
    },
    head: async(token)=>{
        const response = await supertest(urls.challenge)
        .head('/todos')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    },
    post: async(token, path, body)=>{
        const response = await supertest(urls.challenge)
        .post(path)
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token)
        .send(body);
        return response;
    },
    postId: async(token, body, id)=>{
        const response = await supertest(urls.challenge)
        .post(`/todos/${id}`)
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token)
        .send(body);
        return response;
    }
}; 


export default Todo;