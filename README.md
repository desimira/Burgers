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

Add a new burger to the DB by post request.
Every burger has a model of properties - type, meat, bread, price, ingredients.
When making a request, it is required to fill "type" of burger ("vegetarian" or "non vevgetarian"). Other properties has default values and are optional, excluding "meat", wich is still optional, but has some validation (e.g. minimum length).

```
curl -d "type=vegeterian&bread=whole wheat&price=8" -X POST http://localhost:3000/burgers
```

It returns:
```
{
    "price": 8,
    "ingredients": "",
    "_id": "5af31d3f7c1beaf53e1dd7c4",
    "type": "vegeterian",
    "bread": "whole wheat",
    "__v": 0
}
```

## Get burgers

Gets burgers from the API. You can list all burgers or filter the list by specifying optional parameters.

```
http://localhost:3000/burgers
```

Available filter options:
Filter by meat:
```
http://localhost:3000/burgers?meat=beef
```

more to be added...



## Get burger by ID

Gets burger by its ID.

```
http://localhost:3000/burgers/5af321bb7c1beaf53e1dd7c6
```