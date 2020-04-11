function carregarTela() {
	//console.log(`Carregou a tela!!!`, Tela, JogoDaMemoria)
	//const pokemon = {
	//	//Sempre relativo ao index.html
	//	img: './image/batman.png',
	//	nome: 'batman'
	//}
	//const codigoHtml = Tela.obterCodigoHtml(pokemon)
	//console.log(codigoHtml)
	//Tela.alterarConteudoHTML(codigoHtml)

	//Tela.atualizarImagens([
	//	pokemon,
	//	pokemon,
	//	pokemon,
	//	pokemon
	//])

	const dependencias = {
		tela: Tela, //Classe Tela global.
		util: Util
	}
	//Inicializando o jogo da memória.
	const jogoDaMemoria = new JogoDaMemoria(dependencias)
	jogoDaMemoria.inicializar()

}
window.onload = carregarTela