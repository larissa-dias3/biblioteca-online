const listaLivros = document.querySelector('.lista-livros');
const destaque = document.querySelector('.livros-destaques');
const input = document.getElementById("pesquisar");
let todosLivros = [];

// Cria um regex array para substituir acentos em portugues pela letr correspondente sem acento


fetch('livros.json')
    .then((response) => response.json())
    .then((livros) => {
        todosLivros = livros;
        exibirLivros(todosLivros);

        const livrosEmDestaque = [
            livros[livros.length - 1],
            livros[livros.length - 2]
        ];// pega o ultimo e penultimo livro do array
        livrosEmDestaque.forEach((livro) => {
            const blocoDestaque = document.createElement('div');
            blocoDestaque.classList.add('livro-destaque');
            blocoDestaque.innerHTML = `
                <h2>${livro.titulo}</h2>
                <img src="${livro.imagem}" alt="${livro.alt}" class="livro">
                <p>${livro.autor}</p>
            `;
            destaque.appendChild(blocoDestaque);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar os livros:', error);
    });

function exibirLivros(livros) {
    livros.forEach(livro => {
        const livroItem = document.createElement('li');
        livroItem.classList.add('livro');
        livroItem.innerHTML = `
                    <h2>${livro.titulo}</h2>                    
                    <img src="${livro.imagem}" alt="${livro.alt}" class="livro">
                    <p>${livro.autor}</p>
                `;
        listaLivros.appendChild(livroItem);
    }); //forEach
}

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const termo = input.value.trim().toLowerCase();
        filtrarLivros(termo); // Chama a função de filtragem com o termo digitado
    }
});

input.addEventListener("input", () => {
    
    if (input.value === "") {
        filtrarLivros(input.value); // Chama a função de filtragem com o termo digitado
    }
});
function filtrarLivros(termo) {
    if (termo === "") {
        exibirLivros(todosLivros);
        return;
    }
    const livrosEncontrados=[];

    todosLivros.forEach(livro =>{

        if (removerAcentos(livro.autor.toLowerCase()).includes(removerAcentos(termo)) || removerAcentos(livro.titulo.toLowerCase()).includes(removerAcentos(termo))) {
            livrosEncontrados.push(livro);
        }
    });

    if (livrosEncontrados.length > 0) {
        listaLivros.innerHTML = ""; // Limpa a lista antes de exibir os resultados
        exibirLivros(livrosEncontrados);
    } else {
        alert("Livro não encontrado.");
        exibirLivros(todosLivros);
    }
}
function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

