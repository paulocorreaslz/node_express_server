const express = require('express')
const servidor = express();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const dns = require('dns');
const { MongoClient } = require('mongodb');

const databaseUrl = "mongodb://localhost:27017";

var options = {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: 'http://petstore.swagger.io/v2/swagger.json',
          name: 'Spec1'
        },
        {
          url: 'http://petstore.swagger.io/v2/swagger.json',
          name: 'Spec2'
        }
      ]
    }
  }
   
  MongoClient.connect(databaseUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(client => {
    servidor.locals.db = client.db('dbshorter');
    console.log("conectado ao mongo.")
  })
  .catch(() => console.error('Failed to connect to the database'));

  servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

  servidor.use(bodyParser.json());

  servidor.get('/', (requisicao, resposta) => {
    return resposta.json({ 
        'data':{
            'message': 'sucesso'
        },
        'error': {
            'number': 0}
    });
  })

  servidor.post('/new', (requisicao, resposta) => {
    let originalUrl;
    try {
      originalUrl = new URL(requisicao.body.url);
    } catch (err) {
      return resposta.status(400).send({ error: 'invalid URL' });
    }
  
    dns.lookup(originalUrl.hostname, (erro) => {
      if (erro) {
        return resposta.status(404).send({ error: 'Address not found' });
      };
    });
  });

  const shortenURL = (db, url) => {
    const shortenedURLs = db.collection('shortenedURLs');
    return shortenedURLs.findOneAndUpdate({ original_url: url },
      {
        $setOnInsert: {
          original_url: url,
          short_id: nanoid(7),
        },
      },
      {
        returnOriginal: false,
        upsert: true,
      }
    );
  };

  servidor.get('/user/:id', (requisicao, resposta) => {
    
    const { id } = requisicao.params;
    
    return resposta.json({ 
        'data':{
            'message': 'sucesso'
        },
        'error': {
            'number': id}
    });
  })

servidor.listen(8000);

