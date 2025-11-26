const cardContainer = document.getElementById("card-container");
const mensagem = document.getElementById("mensagem");
let dados = [];
let debounceTimer = null;

// Função principal de busca
async function iniciarBusca() {
  const termoBusca =
    document.querySelector("#busca")?.value?.toLowerCase().trim() || "";

  mensagem.textContent = "Carregando...";
  cardContainer.innerHTML = "";

  // Carrega dados apenas uma vez
  if (dados.length === 0) {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
  }

  // Filtra resultados
  const resultados = dados.filter((dado) =>
    ["nome", "desenvolvedora", "consoles", "descricao"].some((campo) =>
      dado[campo].toLowerCase().includes(termoBusca)
    )
  );

  // Renderiza resultados
  mensagem.textContent = "";
  cardContainer.innerHTML = "";

  if (resultados.length > 0) {
    renderizarCards(resultados);
  } else {
    mensagem.innerHTML = `Nenhum resultado encontrado para "<strong>${termoBusca}</strong>".`;
  }
}

// Debounce para busca suave
function iniciarBuscaDebounced() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(iniciarBusca, 300);
}

// Renderiza os cards
function renderizarCards(dados) {
  dados.forEach((dado) => {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = dado.imagem;
    img.alt = dado.nome;
    img.classList.add("img-jogo");

    const h2 = document.createElement("h2");
    h2.textContent = dado.nome;

    const data = document.createElement("p");
    data.innerHTML = `<strong>Data de lançamento:</strong> ${dado.data}`;

    const dev = document.createElement("p");
    dev.innerHTML = `<strong>Desenvolvedora:</strong> ${dado.desenvolvedora}`;

    const consoles = document.createElement("p");
    consoles.innerHTML = `<strong>Consoles:</strong> ${dado.consoles}`;

    const desc = document.createElement("p");
    desc.innerHTML = `<strong>Descrição:</strong> ${dado.descricao}`;

    article.append(img, h2, data, dev, consoles, desc);
    cardContainer.appendChild(article);
  });
}

// Copiar e-mail com feedback
function copiarEmail(elemento) {
  const email = elemento.dataset.email;
  navigator.clipboard
    .writeText(email)
    .then(() => alert(`E-mail "${email}" copiado para a área de transferência!`))
    .catch(() => alert("Não foi possível copiar o e-mail."));
}

// Alternar modo escuro
function alternarModo() {
  const body = document.body;
  const botao = document.getElementById("modo-noturno");

  body.classList.toggle("modo-escuro");
  botao.textContent = body.classList.contains("modo-escuro")
    ? "Modo Claro"
    : "Modo Noturno";
}

// Exibe automaticamente os jogos ao abrir a página
window.addEventListener("DOMContentLoaded", iniciarBusca);
