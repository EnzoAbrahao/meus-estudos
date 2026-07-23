
const botao = document.getElementById("adicionar");

const listaProdutos = document.getElementById("listaProdutos");

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let produtoEditando = null;
let cardEditando = null;

function criarCardProduto(produtoSalvo) {

    const produto = document.createElement("div");

    produto.classList.add("produto");

    produto.dataset.categoria = produtoSalvo.categoria;

    produto.dataset.id = produtoSalvo.id;


    produto.innerHTML = `
        <h3>${produtoSalvo.nome}</h3>
        <p>Quantidade: ${produtoSalvo.quantidade}</p>
        <p>Categoria: ${produtoSalvo.categoria}</p>

        <button class="editar">Editar</button>
        <button class="excluir">Excluir</button>


    `;


    const botaoExcluir = produto.querySelector(".excluir");
    const botaoEditar = produto.querySelector(".editar");

    botaoEditar.addEventListener("click", function(){

    produtoEditando = produtoSalvo.id;
    cardEditando = produto;

    document.getElementById("nomeProduto").value = produtoSalvo.nome;

    document.getElementById("quantidadeProduto").value = produtoSalvo.quantidade;

    document.getElementById("categoriaProduto").value = produtoSalvo.categoria;

    botao.textContent = "Salvar Alterações";
    botao.classList.add("editando");

});


    botaoExcluir.addEventListener("click", function(){

        const idProduto = produto.dataset.id;

        const novaLista = produtos.filter(function(item){

            return item.id != idProduto;

        });


        produtos.length = 0;

        produtos.push(...novaLista);


        localStorage.setItem("produtos", JSON.stringify(produtos));


        produto.remove();

    });


    listaProdutos.appendChild(produto);

}

function mostrarProdutos() {

    for (const produtoSalvo of produtos) {

        criarCardProduto(produtoSalvo);

    }

}

function mostrarNotificacao(texto, tipo) {

    const area = document.getElementById("notificacoes");

    const card = document.createElement("div");

    let icone = "";

    if (tipo === "sucesso") {

    icone = "✅";

} else if (tipo === "atualizado") {

    icone = "✏️";

} else if (tipo === "erro") {

    icone = "❌";

}

    card.classList.add("notificacao");
    card.classList.add(tipo);

    card.innerHTML = `
    <div class="conteudo-notificacao">

        <div class="icone-notificacao">
            ${icone}
        </div>

        <div class="texto-notificacao">
            ${texto}
        </div>

    </div>
`;

    const barra = document.createElement("div");

barra.classList.add("barra-tempo");

card.appendChild(barra);

    const som = new Audio("sons/notificacao.mp3");

    som.play();

    area.appendChild(card);

    setTimeout(function(){

    card.classList.add("saindo");

    setTimeout(function(){

        card.remove();

    }, 500);

}, 2000);
}

botao.addEventListener("click", function () {

    const nome = document.getElementById("nomeProduto").value;

    const quantidade = document.getElementById("quantidadeProduto").value;

    const categoria = document.getElementById("categoriaProduto").value;

    if (nome.trim() === "") {
    mostrarNotificacao("Digite o nome do produto!", "erro");
    return;
} 
    


if (quantidade.trim() === "") {

    mostrarNotificacao("Digite a quantidade do produto!", "erro");

    return;

}

    const produtoSalvo = {
    id: Date.now(),
    nome: nome,
    quantidade: quantidade,
    categoria: categoria
};

if (produtoEditando === null) {

    produtos.push(produtoSalvo);

    criarCardProduto(produtoSalvo);

    mostrarNotificacao("Produto adicionado com sucesso!", "sucesso");
} else {

    const produto = produtos.find(function(item){

        return item.id === produtoEditando;

    });


    produto.nome = nome;
    produto.quantidade = quantidade;
    produto.categoria = categoria;


    cardEditando.remove();

    criarCardProduto(produto);

    mostrarNotificacao("Produto atualizado com sucesso!", "atualizado");
    mensagem.classList.remove("erro");
    mensagem.classList.add("sucesso");

    produtoEditando = null;
    cardEditando = null;

    botao.textContent = "Adicionar Produto";
    botao.classList.remove("editando");
    
    

}


localStorage.setItem("produtos", JSON.stringify(produtos));

    



    // limpar campos

document.getElementById("nomeProduto").value = "";

document.getElementById("quantidadeProduto").value = "";



});

// AQUI EMBAIXO começa o botão Alimentos

function filtrarProdutos(categoria) {

    const cardsProdutos = document.querySelectorAll(".produto");

    for (const produto of cardsProdutos) {

       

        if (produto.dataset.categoria === categoria) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    }

}


const botaoAlimentos = document.getElementById("alimentos");

botaoAlimentos.addEventListener("click", function () {

    filtrarProdutos("Alimentos");

});

const botaoLimpeza = document.getElementById("limpeza");


botaoLimpeza.addEventListener("click", function () {

    filtrarProdutos("Limpeza");

});
const botaoHigiene = document.getElementById("higiene");


botaoHigiene.addEventListener("click", function () {

    filtrarProdutos("Higiene");

});

const botaoBebidas = document.getElementById("bebidas");


botaoBebidas.addEventListener("click", function () {
    
    filtrarProdutos("Bebidas");
    
});
const botaoOutros = document.getElementById("outros");


botaoOutros.addEventListener("click", function () {

    filtrarProdutos("Outros");

});


const botaoTodos = document.getElementById("todos");


botaoTodos.addEventListener("click", function () {

    const produtos = document.querySelectorAll(".produto");

    for (const produto of produtos) {

        produto.style.display = "block";

    }

});

mostrarProdutos();