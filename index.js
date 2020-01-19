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

