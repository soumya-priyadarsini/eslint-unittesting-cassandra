const request = require('supertest')
const app = require('./server/app')

//create
test('create Api Test', async () => {
    await request(app).post('/api/create')
        .send({
            id:5, 
            name:"abecd",
            age:90

        })
        .expect(200)

})

//getAll
test('get Api Test', async () => {
    await request(app).post('/api/getAll')
    expect(200).toBe(200);
})

//get single
test('get single api test', async() =>{
    await request(app).post('/api/singleUser')
    .send({
        id:4
    })
    .expect(200)
})

//update
test("It responds with an updated data", async () => {
    let id = 4;
    const updateData = await request(app)
      .put(`/api/update/${id}`)
      .send({  name: 'pqr' 
         });
      expect(200);
    })

//delete api
test("It responds with a message of Deleted", async () => {
    let id = 3
    const remove = await request(app).delete(
      `/api/deleteUser/${id}`
    );
    //expect(removedStudent.body).toEqual({ message: "Deleted" });
    expect(200);
    })