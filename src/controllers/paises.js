const apiKey = '2c250d33e77037638c500eb1db1e8b930b009'
var request = require("request");
export const buscarTodos = (req, res) => {
    const { body } = req.body;
    var options = {
        method: 'GET',
        url: 'https://paises-d827.restdb.io/rest/paises',
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': '2c250d33e77037638c500eb1db1e8b930b009'
        }
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log(err);
            res.status(400).send('error');

        }
        else {
            res.send(JSON.parse(response.body));
        }

    });


};
