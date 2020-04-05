/**
 * Buscando CEP com API: https://docs.awesomeapi.com.br/api-cep
 */

const cidade = document.querySelector('.cidade');
const estado = document.querySelector('.estado');
const ddd = document.querySelector('.ddd');
const cepDigitado = document.querySelector('#cep');
const botao = document.querySelector('.btn');

botao.addEventListener('click', () => {
    if (cepDigitado.value && !isNaN(cepDigitado.value)) {
        axios.get(`https://cep.awesomeapi.com.br/${cepDigitado.value}`)
            .then(function (response) {
                cidade.innerText = `Cidade: ${response.data.city}`;
                estado.innerText = `Estado: ${response.data.state}`;
                ddd.innerText = `DDD: ${response.data.ddd}`;
                console.log(response);
            })
            .catch(function (error) {
                alert('Error, verifique os dados informados')
                console.warn('Erro na requisição.');
            })
    } else {
        alert('Preencha o campo somente com números');
    }
});
