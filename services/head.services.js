import supertest from 'supertest';
import urls from '../config/urls';

const Head = {
    head: async(token)=>{
        const response = await supertest(urls.challenge)
        .head('/todos')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default Head;