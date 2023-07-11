mongoexport -d cdDB -c  users -o  users.json


mongoimport --uri mongodb+srv://johntest:1234@filmdb.kwgqh67.mongodb.net/myFlixDB --collection movies --type json --file movies.json
mongoimport --uri mongodb+srv://johntest:1234@filmdb.kwgqh67.mongodb.net/myFlixDB --collection users --type json --file users.json


mongodb+srv://johntest:1234@filmdb.kwgqh67.mongodb.net/?retryWrites=true&w=majority