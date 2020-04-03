require('dotenv').config()

const axios = require('axios');

(async function () {
    const sms = await axios({
        url: 'https://api.totalvoice.com.br/sms',
        method: 'post',
        headers: {
            'Access-Token': process.env.TOTALVOICE_API_KEY
        },
        data: {
            'numero_destino': process.env.FONE_TEST,
            'mensagem': 'Te amo, Lindeza <3 :D'
        }
    });
    console.log(sms.data);
})();