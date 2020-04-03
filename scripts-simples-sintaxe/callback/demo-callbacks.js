//Script de CallBack para gravação de arquivos
const fs = require('fs')

fs.readFile('./ar1.txt', (errorArq1, respostaArq1) => {
    if (errorArq1) {
        console.error('Deu ruim no arquivo!', errorArq1.stack)
        return
    }
    fs.readFile('./ar2.txt', (errorArq2, respostaArq2) => {
        if (errorArq2) {
            console.error('Deu ruim no arquivo!', errorArq2.stack)
            return
        }
        fs.readFile('./ar3.txt', (errorArq3, respostaArq3) => {
            if (errorArq3) {
                console.error('Deu ruim no arquivo!', errorArq3.stack)
                return
            }

            const conteudo = `${respostaArq1}\n${respostaArq2}\n${respostaArq3}`
            console.log(conteudo)

            fs.writeFile('./resultadofinal.txt', conteudo, (erroWrite, respostaWrite) => {
                if (erroWrite) {
                    console.error('Deu ruim na gravação do arquivo!', erroWrite)
                    return
                }
                console.log('Arquivo gravado com sucesso!!!')
            })
        })
    })
})