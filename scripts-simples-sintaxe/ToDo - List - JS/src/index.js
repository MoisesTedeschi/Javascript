const inputElement = document.querySelector("input");
const buttonElement = document.querySelector("form button");
const ulElement = document.querySelector("ul");


buttonElement.onclick = ev => {
	ev.preventDefault();

	//Se tiver valor adiciona - Se não, o alerta é chamado.
	if (inputElement.value) {
		const textElement = document.createElement('span');
		textElement.innerHTML = inputElement.value;

		const btnElement = document.createElement('button');
		btnElement.innerHTML = "Remover";
		
		const liElement = document.createElement('li');
		//Criando um elemento novo.
		liElement.appendChild(textElement);
		liElement.appendChild(btnElement);

		//Remover Tarefa
		btnElement.onclick = () => {
			ulElement.removeChild(liElement);
		}

		//Adicionando elemento na DOM.
		ulElement.appendChild(liElement);
		//Limpando o input para evitar reenvio.
		inputElement.value = "";
	} else {
		alert("O campo é obrigatório. Preencha!");
	}
};