let cardContainer = document.querySelector(".card-container");
let dados = [];

async function iniciarBusca() {
    let termoBusca = document.querySelector("#busca")?.value?.toLowerCase() || "";

    // Carrega dados apenas uma vez
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Filtra resultados
    let resultados = dados.filter(dado => {
        return (
            dado.nome.toLowerCase().includes(termoBusca) ||
            dado.desenvolvedora.toLowerCase().includes(termoBusca) ||
            dado.consoles.toLowerCase().includes(termoBusca) ||
            dado.descricao.toLowerCase().includes(termoBusca)
        );
    });

    // Limpa os cards anteriores
    cardContainer.innerHTML = "";

    // Se houver resultados, renderiza-os
    if (resultados.length > 0) {
        renderizarCards(resultados);
    } else {
        cardContainer.innerHTML = `<p>Nenhum resultado encontrado para "<strong>${termoBusca}</strong>".</p>`;
    }
}

function renderizarCards(dados) {
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <img src="${dado.imagem}" alt="${dado.nome}" class="img-jogo">
            <h2>${dado.nome}</h2>
            <p><strong>Data de lançamento:</strong> ${dado.data}</p>
            <p><strong>Desenvolvedora:</strong> ${dado.desenvolvedora}</p>
            <p><strong>Consoles:</strong> ${dado.consoles}</p>
            <p><strong>Descrição:</strong>${dado.descricao}</p>
        `;
        cardContainer.appendChild(article);
    }
}

function copiarEmail(elemento) {
    const email = elemento.id;
    navigator.clipboard.writeText(email).then(() => {
        alert('E-mail "' + email + '" copiado para a área de transferência!');
    }).catch(err => {
        console.error('Falha ao copiar o e-mail: ', err);
        alert('Não foi possível copiar o e-mail.');
    });
}

function alternarModo() {
  const body = document.body;
  const botao = document.getElementById("modo-noturno");

  body.classList.toggle("modo-escuro");

  if (body.classList.contains("modo-escuro")) {
    botao.textContent = "Modo Pastel";
  } else {
    botao.textContent = "Modo Noturno Retrô";
  }
}

// Exibe automaticamente os jogos ao abrir a página
window.addEventListener("DOMContentLoaded", () => {
  iniciarBusca();
});
