const express = require('express')
const servidor = express();
const swaggerUi = require('swagger-ui-express');
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
   
  servidor.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'dbuser',
      password : 'dbpass',
      database : 'dbdatabase'
    }
  });

servidor.get('/', (requisicao, resposta) => {
    return resposta.json({ 
        'data':{
            'message': 'sucesso'
        },
        'error': {
            'number': 0}
    });
})

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


servidor.listen(9000);

