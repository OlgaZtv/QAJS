import supertest from 'supertest';
import urls from '../config/urls';

const Todo = {
    get: async(token, path)=>{
        const response = await supertest(urls.challenge)
        .get(path)
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default Todo;