import supertest from 'supertest';
import urls from '../config/urls';

const Chanllenges = {
    get: async(token)=>{
        const response = await supertest(urls.challenge)
        .get('/challenges')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default Chanllenges;