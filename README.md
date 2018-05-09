# Burgers

The project uses local MongoDB database.

## Start the project

```
git clone https://github.com/desimira/burgers.git
npm install
npm start
```

## Add new burger

Add a new burger to the DB by post request using [Postmen](https://www.getpostman.com/apps).
Every burger has a model of properties - type, meat, bread, price, ingredients.
When making a request, it is required to fill "type" of burger ("vegetarian" or "non vevgetarian"). Other properties has default values and are optional, excluding "meat", wich is still optional, but has some validation (e.g. minimum length).

```
http://localhost:3000/burgers
{
	"type": "vegeterian",
	"bread": "whole wheat",
	"price": 8
}
```

It returns:
```
{
        "price": 8,
        "ingrediants": "",
        "_id": "5af2c62fed1b28f260727e37",
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
http://localhost:3000/burgers/5af1defa92cdb8ea01b94058
```