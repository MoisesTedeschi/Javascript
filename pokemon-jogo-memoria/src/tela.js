//Nossos métodos são estáticos e não podem acessar o "this"
//Por isso, não vamos colocar o util no construtor.
const util = Util

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"

const MENSAGENS = {
	sucesso: {
		texto: 'Combinação Correta!',
		classe: 'alert-success'
	},
	erro: {
		texto: 'Combinação Incorreta!',
		classe: 'alert-danger'
	}
}

class Tela {
	static obterCodigoHtml(item) {
		return `
		<div class="col-sm-3">
			<div class="card" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
			  <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
			</div>
			<br />
		</div>
		`
	}
	static configurarBotaoVerificarSelecao(funcaoOnClick) {
		window.verificarSelecao = funcaoOnClick
	}

	static alterarConteudoHTML(codigoHtml) {
		const conteudo = document.getElementById(ID_CONTEUDO)
		conteudo.innerHTML = codigoHtml

	}

	static gerarStringHTMLPelaImagem(itens) {
		//Para cada item da lista, o código vai executar a função obterCodigoHtml
		//Ao final, vai concatenar tudo em uma única String
		//Muda de Array para String
		return itens.map(Tela.obterCodigoHtml).join('')
	}

	static atualizarImagens(itens) {
		//Pega todo o código HTML - String gerada.
		const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
		//Altera na tela os elementos.
		Tela.alterarConteudoHTML(codigoHtml)
	}

	static configurarBotaoJogar(funcaoOnClick){
		const btnJogar = document.getElementById(ID_BTN_JOGAR)
		btnJogar.onclick = funcaoOnClick
	}

	static exibirPokemons(nomeDoPokemon, img) {
		const elementosHtml = document.getElementsByName(nomeDoPokemon)

		//Para cada elemento encontrado na tela, vamos alterar a imagem
		//para a imagem inicial dele
		// com o forEach, para cada item, dentro dos () setamos o valor de
		//imagem
		elementosHtml.forEach(item => (item.src = img))
	}

	static async exibirMensagem(sucesso = true) {
		const elemento = document.getElementById(ID_MENSAGEM)

		if(sucesso) {
			elemento.classList.remove(MENSAGENS.erro.classe)
			elemento.classList.add(MENSAGENS.sucesso.classe)

			elemento.innerHTML = MENSAGENS.sucesso.texto
		} else {
			elemento.classList.remove(MENSAGENS.sucesso.classe)
			elemento.classList.add(MENSAGENS.erro.classe)

			elemento.innerHTML = MENSAGENS.erro.texto
		}
		elemento.classList.remove(CLASSE_INVISIVEL)
		//Texto aparecer e depois sumir com o tempo.
		await util.timeout(1000)
		elemento.classList.add(CLASSE_INVISIVEL)
	}

	static exibirCarregando(mostrar = true) {
		const carregando = document.getElementById(ID_CARREGANDO)

		if(mostrar) {
			carregando.classList.remove(CLASSE_INVISIVEL)
			return;
		}
		carregando.classList.add(CLASSE_INVISIVEL)

	}
	static inicarContador() {
		let contarAte = 5
		const elementoContador = document.getElementById(ID_CONTADOR)
		//Vamos substituir o texto começando $$contador segundos
		//onde está o $$contador adicionaremos o valor.
		const identificadorNoTexto = '$$contador'

		const textoPadrao = `Começando em: ${identificadorNoTexto} segundos...`

		//Vamos criar uma função em linha para atualizar o texto a cada segundo
		const atualizarTexto = () => (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

		atualizarTexto()
		//A cada segundo, vai chamar a função de atualizar o texto.
		//Essa função vai substituir o $$contador pelo 'contarAte' diminuindo
		//retornamos o idDoIntervalo para parar ele mais tarde.
		const idDoIntervalo = setInterval(atualizarTexto, 1000)
		return idDoIntervalo
	}
	static limparContador(idDoIntervalo) {
		clearInterval(idDoIntervalo)
		document.getElementById(ID_CONTADOR).innerHTML = ""
	}
	static configurarBotaoMostrarTudo(funcaoOnClick) {
		const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
		btnMostrarTudo.onclick = funcaoOnClick
	}

}