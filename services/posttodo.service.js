import supertest from 'supertest';
import urls from '../config/urls';

const PostTodo = {
    post: async(token, path, body)=>{
        const response = await supertest(urls.challenge)
        .post(path)
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token)
        .send(body);
        return response;
    }
}; 

export default PostTodo;