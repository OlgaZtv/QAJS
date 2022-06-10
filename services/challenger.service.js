import supertest from 'supertest';
import urls from '../config/urls';

const Chanllenger = {
    post: async() => {
        const response = await supertest(urls.challenge)
        .post('/challenger')
        .set('Accept', 'application/json');
        return response;
    }
}; 

export default Chanllenger;