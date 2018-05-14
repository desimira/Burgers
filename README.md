# Burgers

This is API project, it uses local MongoDB database and you need to download and run MongoDB on your computer if you don't have it.

## Start the project

```
git clone https://github.com/desimira/burgers.git
npm install
cd burgers
npm start
```

## Add new burger

Add a new burger to the DB by post request using Terminal or Postman.
Every burger has a model of properties - name, type, meat, bread, price, ingredients, created.
When making a request, it is required to fill unique "name" and "type" of burger ("vegetarian" or "non vevgetarian"). Other properties has specified types and ranges in between you have to choose. "Created" is a date and has default value at the time of adding the new data.

Via Terminal:
```
curl -d "name=New burger&type=non vegetarian&meat=beef&bread=oat&ingredients=["tomatoes", "cucumbers", "onion"]&price=11" -X POST http://localhost:3000/burgers
```
Via Postman:
```
    http://localhost:3000/burgers
    {
	"name": "New burgеr3",
	"type": "non vegetarian",
	"meat": "beef",
	"bread": "oat",
	"ingredients": ["tomatoes", "cucumbers", "onion"],
	"price": 11
    }
```

It returns:
```
{
    {
    "price": 11,
    "ingredients": [
        "tomatoes",
        "cucumbers",
        "onion"
    ],
    "created": "2018-05-14T08:54:59.069Z",
    "_id": "5af95321b0436f2f80046945",
    "name": "New burgеr3",
    "type": "non vegetarian",
    "meat": "beef",
    "bread": "oat",
    "__v": 0
}
}
```

## Get burgers

Gets burgers from the API. You can list all burgers or filter the list by specifying optional parameters.

```
curl http://localhost:3000/burgers
```

Available filter options:

Filter by name:
```
curl http://localhost:3000/burgers?name=New%20burger
```

Filter by type:
```
curl http://localhost:3000/burgers?type=non%20vegetarian
```

Filter by meat:
```
curl http://localhost:3000/burgers?meat=beef
```

Filter by bread:
```
curl http://localhost:3000/burgers?bread=oat
```

Filter by price, greater than:
```
curl http://localhost:3000/burgers?price_gt=10
```

Filter by price, lower than:
```
curl http://localhost:3000/burgers?price_lt=10
```

Filter by ingridients:
```
curl http://localhost:3000/burgers?ingredients=tomatoes,onion
```

Filter created before a date:
```
curl http://localhost:3000/burgers?created_bf=2018-05-12T15:25:44.669Z
```

Filter created after a date:
```
curl http://localhost:3000/burgers?created_af=2018-05-12T15:25:44.669Z
```




## Get burger by ID

Gets burger by its ID.

```
curl http://localhost:3000/burgers/5af321bb7c1beaf53e1dd7c6
```

## Test the project
```
npm test
```