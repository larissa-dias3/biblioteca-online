const listaLivros = document.querySelector('.lista-livros');
const destaque = document.querySelector('.livros-destaques');

fetch('https://larissa-dias3.github.io/biblioteca-online/livros.json')
    .then((response) => response.json())
    .then((livros) => {
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



