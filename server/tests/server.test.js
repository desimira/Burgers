const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

let {app} = require('./../server');
let {Burger} = require('../../models/burger');


const burgers = [{
      "price": 9,
      "ingredients": [
          "tomatoes",
          "cucumbers",
          "onion"
      ],
      "created": "2018-05-12T15:26:44.669Z",
      "_id": new ObjectID,
      "name": "New burgеr",
      "type": "non vegetarian",
      "meat": "beef",
      "bread": "oat",
}, {
      "price": 11,
      "ingredients": [
          "lettuce",
          "cucumbers",
          "onion"
      ],
      "created": "2018-05-12T15:20:44.669Z",
      "_id": new ObjectID,
      "name": "New burgеr2",
      "type": "vegetarian",
      "bread": "white"
}];

beforeEach(async() => {
  await Burger.remove({});
  return await Burger.insertMany(burgers);
});

describe('Post /burgers', () => {
  it('should create new burger', async() => {
    let burg = {
      "price": 11,
      "ingredients": [
          "cheese",
          "ququmbers",
          "onion"
      ],
      "meat": "chicken",
      "name": "New burgеr5",
      "type": "vegetarian",
      "bread": "rye",
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(burg.name);

    let newBurg = await Burger.find({name:burg.name});
    expect(newBurg[0].name).toBe(burg.name);
  });

  it('should not allow to create new burger without name', async() => {
    let burg = {
      "type": "vegetarian",
      "bread": "white",
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should not allow to create new burger with existing name', async() => {
      let burg = {
        "name": "New burgеr",
        "type": "vegetarian"
      }
  
      let response = await request(app).post('/burgers').send(burg);
      expect(response.statusCode).toBe(400);
  })

  it('should allow only specific types of burger', async() => {
    let burg = {
      "name": "New burgеr4",
      "type": "with meat"
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should allow only specific types of meat', async() => {
    let burg = {
      "name": "New burgеr4",
      "meat": "duck",
      "type": "non vegetarian"
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should allow only specific types of bread', async() => {
    let burg = {
      "name": "New burgеr4",
      "type": "vegetarian",
      "bread": "toast"
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should not allow price under 8', async() => {
    let burg = {
      "name": "New burgеr4",
      "type": "vegetarian",
      "price": 5
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should not allow price over 20', async() => {
    let burg = {
      "name": "New burgеr4",
      "type": "vegetarian",
      "price": 22
    }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should not allow digits in ingredients', async() => {
    let burg = {
      "name": "New burgеr4",
      "type": "vegetarian",
      "ingredients":[11, "tomatoes"]
   }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

  it('should allow ingredients with specific length', async() => {
    let burg = {
      "name": "New burgеr4",
      "type": "vegetarian",
      "ingredients":["tom"]
   }

    let response = await request(app).post('/burgers').send(burg);
    expect(response.statusCode).toBe(400);
  })

})

describe('Get /burgers', () => {
  it('should get all burgers', async() => {
    const response = await request(app).get('/burgers');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should get burger by name', async() => {
    const response = await request(app).get(`/burgers?name=${encodeURI(burgers[0].name)}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(burgers[0].name);
  })
  
  it('should get burger by type', async() => {
    const response = await request(app).get(`/burgers?type=${encodeURI(burgers[0].type)}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].type).toBe(burgers[0].type);
  })

  it('should get burger by meat', async() => {
    const response = await request(app).get(`/burgers?meat=${encodeURI(burgers[0].meat)}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].meat).toBe(burgers[0].meat);
  })

  it('should get burger by bread', async() => {
    const response = await request(app).get(`/burgers?bread=${encodeURI(burgers[1].bread)}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].bread).toBe(burgers[1].bread);
  })

  it('should get burger by price greater than 10', async() => {
    const response = await request(app).get(`/burgers?price_gt=10`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(burgers[1].name);
  })

  it('should get burger by price lower than 10', async() => {
    const response = await request(app).get('/burgers?price_lt=10');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(burgers[0].name);
  })

  it('should get burger by ingredients', async() => {
    const response = await request(app).get('/burgers?ingredients=cucumbers,onion');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  })

  it('should get burger created before certain date', async() => {
    const response = await request(app).get('/burgers?created_bf=2018-05-12T15:25:44.669Z');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(burgers[1].name);
  })

  it('should get burger created after certain date', async() => {
    const response = await request(app).get('/burgers?created_af=2018-05-12T15:25:44.669Z');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(burgers[0].name);
  })
  
})

describe('Get /burgers/:id', () => {
  it('should get burger by id', async () => {
    const response = await request(app).get(`/burgers/${burgers[0]._id.toHexString()}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(burgers[0].name);
  })
})