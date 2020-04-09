/**
 * Referência - Canal CodarMe
 * Link: https://bit.ly/3a3bo6t
 */

//Pacote padrão do NodeJS
const http = require('http')
const { parse } = require('url')

const getUsers = (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/json',
	})

	res.write(JSON.stringify([{ id: 1 }]))
	res.end()
}

const createUser = (req, res) => {
	const boby = []

	//Recebendo dados em pedados (chunck) do cliente
	req.on('data', (chunck) => {
		//console.log(chunck)
		//Juntando os pedaços recebidos
		boby.push(chunck)
	})

	req.on('end', () => {
		//Trasnformando dados recebidos em um array.
		const parsedBody = Buffer
			.concat(boby)
			.toString()
			.split('&')
			.map((item) => item.split('='))
			.reduce(
				(memo, current) => ({
					...memo,
					[current[0]]: current[1],
				}),
				{}
			)
		//Salvando no banco
		//Por exemplo:
		// db.save(parsedBody)
		res.writeHead(200, {
			'Content-Type': 'application/json',
		})

		res.write(JSON.stringify(parsedBody))
		res.end()
	})
}

//Gerencia de Rotas
const routes = {
	'/users': {
		GET: getUsers,
		POST: createUser
	}
}

const server = http.createServer((req, res) => {
	const url = parse(req.url)

	if (routes[url.pathname] && routes[url.pathname][req.method]) {
		routes[url.pathname][req.method](req, res)
	}
	/* 	//Gerencia de rotas
		if (url.pathname === '/abc' && req.method === 'GET') {
			//Criando cabeçalho de resposta
			res.writeHead(200, {
				'Content-Type': 'application/json',
			})
			res.write(JSON.stringify({ message: 'Hello World, ABC!' }))
			res.end()
		}
		if (url.pathname === '/abc' && req.method === 'POST') {
			//Criando cabeçalho de resposta
			res.writeHead(200, {
				'Content-Type': 'application/json',
			})
			res.write(JSON.stringify({ message: 'Create ABC' }))
			res.end()
		}
		//Gerencia de rotas
		if (url.pathname === '/') {
			//Criando cabeçalho de resposta
			res.writeHead(200, {
				'Content-Type': 'text/plain',
			})
			res.write('Hello World, The MOA!')
			res.end()
		} */
})
server.listen(3000)