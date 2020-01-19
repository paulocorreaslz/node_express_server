const express = require('express')

const servidor = express();

servidor.get('/', (requisicao, resposta) => {
    return resposta.json({ 
        'data':{
            'message': 'sucesso'
        },
        'error': {
            'number': 0}
    });
})

servidor.listen(9000);

