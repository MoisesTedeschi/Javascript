//Fazer a pergunta
const http = require('http');
let qs = require('querystring');

//Entrada de dados via terminal
dados = {
    'relaxation': process.argv[2],
    'tipoCEP': 'ALL',
    'semelhante': 'N'
}
//Parametros para acesso a API
let parametros = {
    'method': 'POST',
    'hostname': 'www.buscacep.correios.com.br',
    'path': '/sistemas/buscacep/resultadoBuscaCepEndereco.cfm',
    'headers': {
        'content-type': 'application/x-www-form-urlencoded'
    }
}
//Resposta da requisição
let req = http.request(parametros, function (httpResponse) {
    //Receber uma resposta (em pedaços)
    let pedacos = [];

    //Adicionando os pedados da resposta ao array
    httpResponse.on('data', function (pedaco) {
        pedacos.push(pedaco);
    });

    //Tratar o conteúdo
    httpResponse.on('end', function () {
        let body = Buffer.concat(pedacos);
        let html = body.toString('latin1');
        //Expressão regular para pegar os dados.
        //Primeiro grupo de dados, pega tudo que tem "TD" até terminar o "TD".
        let regularExpression = /(?:<td.*?>)(.*?)(?:<\/td>)/g

        let resultado;
        let resultadoFinal = [];

        //Enquanto não for nulo, o resultado será armazenado em "resultado"
        while ((resultado = regularExpression.exec(html)) !== null) {
            resultadoFinal.push(resultado[1].replace('&nbsp;', ""));
        }
        console.log(
            `Logradouro: ${resultadoFinal[0]}
Bairro: ${resultadoFinal[1]}
Cidade/UF: ${resultadoFinal[2]}
CEP: ${resultadoFinal[3]}`);
    });
});

req.write(qs.stringify(dados));
req.end();
