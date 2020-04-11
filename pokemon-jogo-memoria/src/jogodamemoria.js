class JogoDaMemoria {
	//Pegando a propriedade "tela".
	//Se mandar um objeto = {tela: 1, idade: 2, etc: 3}
	//Vai ignorar o resto das propriedades e pegar somente a propriedade
	//tela
	constructor({ tela, util}) {
		this.tela = tela
		this.util = util
		//Caminho do arquivo, sempre é relativo
		//ao index.html
		this.pokemonsIniciais = [
			{ img: './image/pikachu.png', nome: 'pikachu' },
			{ img: './image/bulbasaur.png', nome: 'bulbasaur' },
			{ img: './image/charmander.png', nome: 'charmander' },
			{ img: './image/squirtle.png', nome: 'squirtle' },
			{ img: './image/pokemon_egg.png', nome: 'pokemon_egg' },
			{ img: './image/pokeball.png', nome: 'pokeball' },
			{ img: './image/meowth.png', nome: 'meowth' },
			{ img: './image/psyduck.png', nome: 'psyduck' }
		]
		this.iconePadrao = './image/img-padrao.png'
		this.pokemonsEscondidos = []
		this.pokemonsSelecionados = []
	}
	inicializar() {
		//Pegar todas as funções da classe tela
		//Coloca todos os pokemons na tela.
		this.tela.atualizarImagens(this.pokemonsIniciais)

		//Força a tela usar o THIS do Jogo da Memória.
		this.tela.configurarBotaoJogar(this.jogar.bind(this))

		this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))

		this.tela.configurarBotaoMostrarTudo(this.mostrarPokemonsEscondidos.bind(this))

	}
	async embaralhar() {
		const copias = this.pokemonsIniciais
		//Duplicar os itens
		.concat(this.pokemonsIniciais)
		//Entrar em cada item e criar um id aleatório.
		.map(item => {
			return Object.assign({}, item, { id: Math.random() / 0.5 })
		})
		//Ordenar os itens de forma aleatória.
		.sort(() => Math.random() - 0.5)

		this.tela.atualizarImagens(copias)

		//Exibe a mensagem de carregamento.
		this.tela.exibirCarregando()

		const idDoIntervalo = this.tela.inicarContador()

		//Vamos esperar 5 segundo para atualizar a tela.
		await this.util.timeout(5000)

		this.tela.limparContador(idDoIntervalo)
		this.esconderPokemons(copias)
		//Em seguida esconde a mensagem de carregamento.
		this.tela.exibirCarregando(false)

	}
	esconderPokemons(pokemons) {
		//Troca a imagem de todos os heróis existentes.
		//Pelo icone padrão.
		//Como fizemos no construtor, vamos extrair somente o necessário.
		//Usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar
		//o que tiver dentro dos parenteses
		//Quando não usamos : (exemplo do id), o JS entende que o nome
		//é o mesmo do valor. EX: id: id, id.
		const pokemonsOcultos = pokemons.map(( { nome, id } ) => ({
			id,
			nome,
			img: this.iconePadrao
		}))
		//Atualizar a tela com os novos heróis ocultos.
		this.tela.atualizarImagens(pokemonsOcultos)

		//Guardando os pokemons ocultos para trabalhar com eles depois
		this.pokemonsEscondidos = pokemonsOcultos
	}
	exibirPokemons(nomeDoPokemon) {
		//Vamos procurar esse herói pelo nome em nossos pokemonsIniciais
		//Vamos obter somente a imagem dele.
		const { img } = this.pokemonsIniciais.find(({ nome }) => nomeDoPokemon === nome)

		//Função na tela para exibir somente o herói selecionado.
		this.tela.exibirPokemons(nomeDoPokemon, img)
	}
	verificarSelecao(id, nome) {
		const item = { id, nome }
		//Vamos verificar a quantidade de heróis selecionados
		//e tomar ação se escolheu certo ou errado
		const pokemonsSelecionados = this.pokemonsSelecionados.length

		switch (pokemonsSelecionados) {
			case 0:
				//Adiciona a escolha na lista, esperando pela próxima
				//clicada
				this.pokemonsSelecionados.push(item)
				break;
			case 1:
				//Se a quantidade de escolhidos for 1, significa
				//que o usuário só pode escolher mais um item
				//vamos obter o primeiro item da lista
				const [ opcao1 ] = this.pokemonsSelecionados

				//Zerar os itens da lista para selecionar mais outros dois
				this.pokemonsSelecionados = []

				//Confirir se o nome e ID são iguais
				if (opcao1.nome === item.nome &&
					//Aqui verificamos se são IDs diferentes para
					//o usuário não clicar duas vezes no mesmo
					opcao1.id !== item.id
					) {
						this.exibirPokemons(item.nome)
						
						//Como o padrão é TRUE, não precisa passar nada.
						this.tela.exibirMensagem()
						//Para a execução
						return;
				}
				this.tela.exibirMensagem(false)
				break;
		}
	}
	mostrarPokemonsEscondidos() {
		//Vamos pegar todos os heróis da tela e colocar seu
		//Respectivo valor correto.
		const pokemonsEscondidos = this.pokemonsEscondidos
		for(const pokemon of pokemonsEscondidos) {
			const { img } = this.pokemonsIniciais.find(item => item.nome === pokemon.nome)
			pokemon.img = img
		}
		this.tela.atualizarImagens(pokemonsEscondidos)
	}
	jogar() {
		this.embaralhar()
	}
}