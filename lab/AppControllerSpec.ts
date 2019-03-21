
import * as request from 'supertest';
import app from './App';



describe('Airship', () => {

    test('It should response the Get Method', async () => {
        const response: any = await request(app).get('/');
        await expect(response.statusCode).toBe(200);
    })

})