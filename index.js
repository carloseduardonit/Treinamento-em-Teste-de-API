const btn_starWars = document.getElementById('StarWars');
const btn_zelda = document.getElementById('Zelda');
const btn_clear = document.getElementById('clear');
const title = document.querySelector('title');
const mainContent = document.querySelector('main');

btn_starWars.addEventListener('click', (event) => {
    event.preventDefault();
    title.innerText = 'Star Wars';
    console.log('Star Wars');
    mainContent.innerHTML = '<h2>Star Wars</h2><p>Bem-vindo ao universo de Star Wars!</p>';
    teste();
});

btn_zelda.addEventListener('click', async (event) => {
    event.preventDefault();
    title.innerText = 'Zelda';
    var JogoID = "5f6ce9d805615a85623ec2b9";
    const name = "The Legend of Zelda: Majora's Mask";
    paragrafosJogoZelda(jogos.getJogoByName(name));
    
});
btn_clear.addEventListener('click', (event) => {
    event.preventDefault();
    title.innerText = 'Treinamento em Teste de API';
    clearMainContent();
});
async function paragrafosJogoZelda(Jogo) {
    const jogosList = await Jogo;
    mainContent.innerHTML = '<h2>Zelda</h2><p>Bem-vindo ao universo de Zelda!</p>' 
    mainContent.innerHTML += `<p class="resposta"><strong>ID:</strong> ${jogosList.id}</p>`;
    mainContent.innerHTML += `<p class="resposta"><strong>Nome:</strong> ${jogosList.name}</p>`;
    if (jogosList.description !== "" && jogosList.description.length > 0) {
        mainContent.innerHTML += `<p class="resposta"><strong>Descrição:</strong> ${jogosList.description}</p>`;
    }
    mainContent.innerHTML += `<p class="resposta"><strong>Desenvolvedora:</strong> ${jogosList.developer}</p>`; 
    if (jogosList.publisher !== "" && jogosList.publisher.length > 0) {
        mainContent.innerHTML += `<p class="resposta"><strong>Editora:</strong> ${jogosList.publisher}</p>`;
    }
    mainContent.innerHTML += `<p class="resposta"><strong>Data de Lançamento:</strong> ${jogosList.released_date}</p>`;
}

async function tabelaJogoZelda() {
    const jogosList = await jogos.getJogos();
    mainContent.innerHTML = '<h2>Zelda</h2><p>Bem-vindo ao universo de Zelda!</p>';
    const table = document.createElement('table');
    table.classList.add('tabela');
    table.innerHTML = '<tr class="linha"><th class="coluna">ID</th><th class="coluna">Nome</th><th class="coluna">Descrição</th><th class="coluna">Desenvolvedora</th><th class="coluna">Editora</th><th class="coluna">Data de Lançamento</th></tr>';
    jogosList.forEach((jogo) => {
        table.innerHTML += `<tr class="linha">
            <td class="coluna">${jogo.id}</td>
            <td class="coluna">${jogo.name}</td>
            <td class="coluna">${jogo.description && jogo.description.length > 100 ? jogo.description.substring(0, 100) + '...' : jogo.description || ''}</td>
            <td class="coluna">${jogo.developer}</td>
            <td class="coluna">${jogo.publisher || ''}</td>
            <td class="coluna">${jogo.released_date}</td>
            </tr>`;
    });
    mainContent.appendChild(table);

}
function clearMainContent() {
    mainContent.innerHTML = '';
}
async function teste() {
    try {
        
        const response = await jogos.getJogoByName(name);
        console.log("Dados recebidos:", response);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
}