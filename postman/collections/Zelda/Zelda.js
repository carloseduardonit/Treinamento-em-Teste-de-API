

class Zelda {
    constructor() {

    }
    static async loadFormulario() {
        const formulario = document.createElement('form');
        formulario.setAttribute('id', 'zelda-form');
        formulario.innerHTML = `
            <label for="pesquisaTxt">Pesquise o Nome ou ID do Jogo:</label>
            <input type="text" id="pesquisaTxt" name="PesquisaTXT" placeholder="Digite o nome ou ID do jogo">
            <label><input type="radio" name="Pesquisa" value="id">Por ID</label>
            <label><input type="radio" name="Pesquisa" value="name">Por Nome</label>
            <button id="buscar" type="button" class="menu-toggle" onclick="Zelda.buscarJogo()">Buscar</button>
            <button id="limpar" type="button" class="menu-toggle" onclick="Zelda.limpar()">Limpar</button>
        `;
        if (!document.getElementById('zelda-form')) {
            mainContent.innerHTML = '<h2>Zelda</h2><p>Bem-vindo ao universo de Zelda!</p>';
            mainContent.appendChild(formulario);
        }
        Jogos.tabelaJogoZelda();
    }
    static async buscarJogo() {
        const nameInput = document.getElementById('pesquisaTxt');
        const name = nameInput.value.trim();
        const radio_buttons = document.getElementsByName('Pesquisa');
        let searchType = null;
        for (var i = 0; i < radio_buttons.length; i++) {
            if (radio_buttons[i].checked) {
                searchType = radio_buttons[i].value;
                break;
            }
        }
        if (!searchType && name.length === 0) {
            alert('Por favor, \n- Preencha o campo de pesquisa  \n- Selecione o tipo de pesquisa (ID ou Nome).');
            return;
        } else if (name.length === 0) {
            alert('Por favor, preencha o campo de pesquisa.');
            return;
        } else if (!searchType) {
            alert('Por favor, selecione o tipo de pesquisa (ID ou Nome).');
            return;
        }
        await Jogos.exibeMelhorPesquisa(searchType, name);
    }
    static limpar() {
        const nameInput = document.getElementById('pesquisaTxt');
        nameInput.value = '';
        const radio_buttons = document.getElementsByName('Pesquisa');
        for (var i = 0; i < radio_buttons.length; i++) {
            if (radio_buttons[i].checked) {
                radio_buttons[i].checked = false;
            }
        }
        if (!document.getElementsByClassName('tabela')[0]) {
            resultsContainer.innerHTML = '';
            Jogos.tabelaJogoZelda();
        }
    }
}


class Jogos {

    constructor(parameters) {

    }

    static async getJogoByName(name) {
        return fetch(`https://zelda.fanapis.com/api/games?name=${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos:", data.data[0]);

                return data.data[0];
            })
            .catch(error => {
                console.error("Erro ao buscar jogos:", error);
                return [];
            });
    }

    static async getJogoByID(id) {
        const url = `https://zelda.fanapis.com/api/games/${encodeURIComponent(id)}`;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log("Dados recebidos:", responseJson);
            const data = responseJson.data;
            return data;
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
            return [];
        }
    }

    static async getJogos() {
        const url = 'https://zelda.fanapis.com/api/games';
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log("Dados recebidos:", responseJson);
            const data = responseJson.data;
            return data;
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
            return [];
        }
    }

    static async tabelaJogoZelda() {
        const jogosList = await this.getJogos();
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
        resultsContainer.appendChild(table);
    }

    static async paragrafosJogoZelda(Jogo) {
        const jogosList = await Jogo;
        if (!jogosList || Object.keys(jogosList).length === 0) {
            resultsContainer.innerHTML = '<p>Jogo não encontrado. Por favor, tente novamente.</p>';
            return;
        }
        resultsContainer.innerHTML = '<h2>Zelda</h2><p>Bem-vindo ao universo de Zelda!</p>'
        resultsContainer.innerHTML += `<p class="resposta"><strong>ID:</strong> ${jogosList.id}</p>`;
        resultsContainer.innerHTML += `<p class="resposta"><strong>Nome:</strong> ${jogosList.name}</p>`;
        if (jogosList.description !== "" && jogosList.description.length > 0) {
            resultsContainer.innerHTML += `<p class="resposta"><strong>Descrição:</strong> ${jogosList.description}</p>`;
        }
        resultsContainer.innerHTML += `<p class="resposta"><strong>Desenvolvedora:</strong> ${jogosList.developer}</p>`;
        if (jogosList.publisher !== "" && jogosList.publisher.length > 0) {
            resultsContainer.innerHTML += `<p class="resposta"><strong>Editora:</strong> ${jogosList.publisher}</p>`;
        }
        resultsContainer.innerHTML += `<p class="resposta"><strong>Data de Lançamento:</strong> ${jogosList.released_date}</p>`;
    }

    static async exibeMelhorPesquisa(tipo, valor) {
        switch (tipo) {
            case 'id':
                this.paragrafosJogoZelda(await this.getJogoByID(valor));
                break;
            case 'name':
                this.paragrafosJogoZelda(await this.getJogoByName(valor));
                break;
            default:
                alert('Tipo de pesquisa inválido. Por favor, selecione "ID" ou "Nome".');
        }
    }

}