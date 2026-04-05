

class Zelda {

    constructor() {

    }

    static async loadFormulario() {
       
        this.loadBotao();
        this.gerarPanel(); 
        const spanTipoItem = document.getElementsByClassName('tipo-item')[0];
        spanTipoItem.innerText = 'Jogo';
    }
    static loadBotao() {
        mainContent.innerHTML = '1';
        const divisao = document.createElement('div');
        divisao.setAttribute('id', 'tabs');
        divisao.innerHTML = `
        <button class="tab-button active" data-tab="Jogos" onclick="Zelda.exibeTab('Jogos')">Jogos</button>
        <button class="tab-button" data-tab="Funcionários" onclick="Zelda.exibeTab('Funcionários')">Funcionários</button>
        <button class="tab-button" data-tab="Personagens" onclick="Zelda.exibeTab('Personagens')">Personagens</button>
        <button class="tab-button" data-tab="Monstros" onclick="Zelda.exibeTab('Monstros')">Monstros</button>
        <button class="tab-button" data-tab="Chefes" onclick="Zelda.exibeTab('Chefes')">Chefes</button>
        <button class="tab-button" data-tab="Masmorras" onclick="Zelda.exibeTab('Masmorras')">Masmorras</button>
        <button class="tab-button" data-tab="Lugares" onclick="Zelda.exibeTab('Lugares')">Lugares</button>
        <button class="tab-button" data-tab="Itens" onclick="Zelda.exibeTab('Itens')">Itens</button>
        `
        //if (!document.getElementById('tabs')) {
        mainContent.innerHTML = ``;
        mainContent.appendChild(divisao);
        //}
    }
    static gerarPanel() {
        Jogos.gerarPanel();
    }

    static async buscarJogo() {
        const nameInput = document.getElementById('pesquisaTxt');
        const name = nameInput.value.trim();
        const radio_buttons = document.getElementsByName('Pesquisa');
        const buttonAbatida = document.querySelector('.tab-button.active').dataset.tab;
        const listaEmManutenção = ['Funcionários', 'Personagens', 'Monstros', 'Chefes', 'Masmorras', 'Lugares', 'Itens'];
        let searchType = null;

        for (var i = 0; i < radio_buttons.length; i++) {
            if (radio_buttons[i].checked) {
                searchType = radio_buttons[i].value;
                break;
            }
        }
        for (let i = 0; i < listaEmManutenção.length; i++) {
            if (buttonAbatida === listaEmManutenção[i]) {
                alert(`A funcionalidade de busca por "${buttonAbatida}" está em manutenção. Por favor, selecione a aba "Jogos" para realizar a busca.`);

                return;
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
        await this.exibeMelhorPesquisa(buttonAbatida, searchType, name);
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
    static exibeTab(tipo) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const ativo = document.querySelector('.tab-button.active');
        let nome = ativo.dataset.tab;

        for (let i = 0; i < tabButtons.length; i++) {
            if (nome === tipo) {
                return;
            }
            if (tabButtons[i].dataset.tab === tipo) {
                Zelda.removaAtivos();
                this.exibeFormulario(tipo);
                tabButtons[i].classList.add('active');
                break
            }
        }

    }
    static removaAtivos() {
        const tabButtons = document.querySelectorAll('.tab-button');
        for (let i = 0; i < tabButtons.length; i++) {
            if (tabButtons[i].classList.contains('active')) {
                tabButtons[i].classList.remove('active');
                break;
            }
        }
    }
    static exibeMelhorPesquisa(item, tipo, valor) {
        switch (item) {
            case 'Jogos':
                Jogos.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Funcionários':
                Funcionarios.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Personagens':
                Personagens.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Monstros':
                Monstros.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Chefes':
                Chefes.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Masmorras':
                Masmorras.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Lugares':
                Lugares.exibeMelhorPesquisa(tipo, valor);
                break;
            case 'Itens':
                Itens.exibeMelhorPesquisa(tipo, valor);
                break;
        }
    }
    static exibeFormulario(tipo) {
        const tipoItem = document.getElementsByClassName('tipo-item');
        const itemFormando = tipo.endsWith("es") && tipo!== "Chefes" ? tipo.slice(0, -2):
            tipo.endsWith("ns") ? tipo.slice(0, -2)+"m": 
            tipo.endsWith("s") ? tipo.slice(0, -1) : tipo;
        tipoItem[0].innerText = itemFormando;
        try {
            switch (tipo) {
                case 'Jogos':
                    Jogos.gerarPanel();
                    break;
                case 'Funcionários':
                    Funcionarios.gerarPanel();
                    break;
                case 'Personagens':
                    Personagens.gerarPanel();
                    break;
                case 'Monstros':
                    Monstros.gerarPanel();
                    break;
                case 'Chefes':
                    Chefes.gerarPanel();
                    break;
                case 'Masmorras':
                    Masmorras.gerarPanel();
                    break;
                case 'Lugares':
                    Lugares.gerarPanel();
                    break;
                case 'Itens':
                    Itens.gerarPanel();
                    this.tab = tipo;
                    break;

            }
        } finally {
            this.tab = tipo;
        }
    }


}


class Jogos extends Zelda {
    tab = 'Jogo';
    constructor(parameters) {

    }

    static gerarPanel() {

        const formulario = document.createElement('form');
        formulario.setAttribute('id', 'zelda-form');
        formulario.innerHTML = `
            <label for="pesquisaTxt">Pesquise o Nome ou ID do(a) <span class="tipo-item"></span>:</label>
            <input type="text" id="pesquisaTxt" name="PesquisaTXT" placeholder="Digite o nome ou ID">
            <label><input type="radio" name="Pesquisa" value="id">Por ID</label>
            <label><input type="radio" name="Pesquisa" value="name">Por Nome</label>
            <button id="buscar" type="button" class="menu-toggle" onclick="Zelda.buscarJogo()">Buscar</button>
            <button id="limpar" type="button" class="menu-toggle" onclick="Zelda.limpar()">Limpar os Campos</button>
        `;
        if (!document.getElementById('zelda-form')) {
            //mainContent.innerHTML = '';
            mainContent.appendChild(formulario);
        }
    
        this.tabelaJogoZelda();
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
        table.innerHTML = '<tr class="linha"><th class="coluna">ID Jogo</th><th class="coluna">Nome</th><th class="coluna">Descrição</th><th class="coluna">Desenvolvedora</th><th class="coluna">Editora</th><th class="coluna">Data de Lançamento</th></tr>';
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
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);
    }

    static async paragrafosJogoZelda(Jogo) {
        const jogosList = await Jogo;
        if (!jogosList || Object.keys(jogosList).length === 0) {
            resultsContainer.innerHTML = '<p>Jogo não encontrado. Por favor, tente novamente.</p>';
            return;
        }
        resultsContainer.innerHTML = `<p class="resposta"><strong>ID:</strong> ${jogosList.id}</p>`;
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

class Funcionarios {
    static url_Funcionario = 'https://zelda.fanapis.com/api/staff';
    static games = {};
    constructor(parameters) {

    }
    static gerarPanel() {
        this.tabelaFuncionarios();
    }

    static async getFuncionarioByName(id, name) {
        const url = `${this.url_Funcionario}?name=${encodeURIComponent(name)}`;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log("Dados recebidos:", responseJson);
            const data = responseJson.data[0];
            if (!data) {
                return [];
            }

            const jogos = await Promise.all(
                data.worked_on.map(async (gameUrl) => {
                    if (this.games[gameUrl]) {
                        return this.games[gameUrl];
                    }

                    try {
                        const gameResponse = await fetch(gameUrl);
                        if (!gameResponse.ok) {
                            throw new Error(`Erro HTTP: ${gameResponse.status}`);
                        }
                        const gameData = await gameResponse.json();
                        this.games[gameUrl] = gameData.data.name;
                        return this.games[gameUrl];
                    } catch (error) {
                        const trabalho = {
                            id: data.id,
                            name: data.name,
                            games: jogos.join(', ')
                        };

                        return trabalho;

                    }
                })
            );
            return {
                id: data.id,
                name: data.name,
                games: jogos.join(', ')
            };
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            return [];
        }
    }
    static async getFuncionarios() {
        const url = this.url_Funcionario;
        console.log("URL:", url);

        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log('Dados recebidos:', dados);

            const trabalhos = await Promise.all(
                // Resolve todos os funcionários em paralelo
                dados.map(async (funcionario) => {

                    const jogos = await Promise.all(
                        // Resolve todos os jogos de cada funcionário em paralelo
                        funcionario.worked_on.map(async (gameUrl) => {
                            // Cache pelo gameUrl completo
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            }

                            try {
                                // Busca o jogo usando a URL completa (que já inclui o ID)
                                const gameResponse = await fetch(gameUrl); // URL já vem pronta!
                                if (!gameResponse.ok) {
                                    throw new Error(`Erro HTTP: ${gameResponse.status}`);
                                }

                                const gameData = await gameResponse.json();
                                this.games[gameUrl] = gameData.data.name; // "Breath of the Wild", etc.
                                return this.games[gameUrl];
                            } catch (error) {
                                console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                return gameUrl; // fallback com a URL
                            }
                        })
                    );

                    return {
                        id: funcionario.id,
                        name: funcionario.name,
                        games: jogos.join(', ')
                    };
                })
            );

            console.log('Funcionários e seus jogos:', trabalhos);
            return trabalhos;

        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
            return [];
        }
    }
    static async tabelaFuncionarios() {
        const funcionarios = await this.getFuncionarios();
        const table = document.createElement('table');
        table.classList.add('tabela');
        table.innerHTML = '<tr class="linha"><th class="coluna">ID Funcionario</th><th class="coluna">Nome</th><th class="coluna">trabalhou no(s) Jogo(s)</th></tr>';

        funcionarios.forEach((funcionario) => {
            table.innerHTML += `<tr class="linha">
            <td class="coluna">${funcionario.id}</td>
            <td class="coluna">${funcionario.name}</td>
            <td class="coluna">${funcionario.games}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);
    }
}

class Personagens {
    static url_Personagens = 'https://zelda.fanapis.com/api/characters';
    static games = {};
    constructor(parameters) {

    }
    static gerarPanel() {

        this.tabelaPersonagens();
    }
    static async getPersonagens() {
        const url = this.url_Personagens;
        console.log("URL:", url)
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log("Dados Recebidos: ", dados);

            const personagens = await Promise.all(
                dados.map(async (personagem) => {
                    const jogos = await Promise.all(
                        personagem.appearances.map(async (gameUrl) => {
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            }
                            try {
                                const gameResponse = await fetch(gameUrl);
                                if (!gameResponse.ok) {
                                    throw new Error(`Erro HTTP: ${gameResponse.status}`);
                                }
                                const gameData = await gameResponse.json();
                                this.games[gameUrl] = gameData.data.name;
                                return this.games[gameUrl];

                            } catch (error) {
                                console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                return gameUrl;
                            }
                        })
                    );
                    return {
                        id: personagem.id,
                        name: personagem.name,
                        description: personagem.description,
                        gender: personagem.gender,
                        race: personagem.race,
                        games: jogos.join(', ')
                    }
                })
            );
            console.log('Personagens e seus jogos:', Personagens);
            return personagens;

        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
            return [];
        }

    }

    static async tabelaPersonagens() {
        const personagens = await this.getPersonagens();
        const table = document.createElement('table');
        table.classList.add('tabela');
        table.innerHTML = `<tr class="linha">
        <th class="coluna">ID Personagem</th>
        <th class="coluna">Nome</th>
        <th class="coluna">Descrição</th>
        <th class="coluna">Genero(M/F)</th>
        <th class="coluna">Corrida</th>
        <th class="coluna">Apareceu no(s) Jogo(s)</th>
        </tr>`;
        personagens.forEach((personagem) => {
            table.innerHTML += `<tr class="linha">
            <td class="coluna">${personagem.id}</td>
            <td class="coluna">${personagem.name}</td>
            <td class="coluna">${personagem.description && personagem.description.length > 100 ? personagem.description.substring(0, 100) + '...' : personagem.description || ''}</td>
            <td class="coluna">${personagem.gender === null ? '' : personagem.gender === 'Male' ? 'Masculino' : 'Feminino'}</td>
            <td class="coluna">${personagem.race === null ? '' : personagem.race}</td>
            <td class="coluna">${personagem.games}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);

    }



}

class Monstros {
    static url_Monstros = 'https://zelda.fanapis.com/api/monsters';
    static games = {};
    constructor(parameters) {

    }
    static gerarPanel() {
        this.tabelaMonstros();
    }
    static async getMonstros() {
        const url = this.url_Monstros;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log("Dados Recebidos: ", dados);
            const monstros = await Promise.all(
                dados.map(async (monstro) => {
                    const jogos = await Promise.all(
                        monstro.appearances.map(async (gameUrl) => {
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            }
                            try {
                                const gameResponse = await fetch(gameUrl);
                                if (!gameResponse.ok) {
                                    throw new Error(`Erro HTTP: ${gameResponse.status}`);
                                }
                                const gameData = await gameResponse.json();
                                this.games[gameUrl] = gameData.data.name;
                                return this.games[gameUrl];
                            } catch (error) {
                                console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                return gameUrl;

                            }
                        })
                    );
                    return {
                        id: monstro.id,
                        name: monstro.name,
                        description: monstro.description,
                        games: jogos.join(', ')

                    }
                })
            )
            console.log('Monstros e seus jogos:', monstros);
            return monstros;

        } catch (error) {
            console.error('Erro ao buscar monstros:', error);
            return [];
        };
    }

    static async tabelaMonstros() {
        const monstros = await this.getMonstros();
        const tabela = document.createElement('table');
        tabela.classList.add('tabela');
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID Monstro</th>
        <th class="coluna">Nome</th>
        <th class="coluna">Descrição</th>
        <th class="coluna">Apareceu no(s) Jogo(s)</th>
        </tr>`;
        monstros.forEach((monstro) => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${monstro.id}</td>
            <td class="coluna">${monstro.name}</td>
            <td class="coluna">${monstro.description && monstro.description.length > 100 ? monstro.description.substring(0, 100) + '...' : monstro.description || ''}</td>
            <td class="coluna">${monstro.games}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(tabela);
    }


}

class Chefes {
    static url_Chefes = 'https://zelda.fanapis.com/api/bosses';
    static games = {};
    static monsters = {};
    constructor(parameters) {

    }
    static gerarPanel() {
        this.tabelaChefes();
    }
    static async getChefes() {
        const url = this.url_Chefes;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log("Dados Recebidos: ", dados);
            const chefes = await Promise.all(
                dados.map(async (chefe) => {
                    const jogos = await Promise.all(
                        chefe.appearances.map(async (gameUrl) => {
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            }
                            try {
                                const gameResponse = await fetch(gameUrl);
                                if (!gameResponse.ok) {
                                    throw new Error(`Erro HTTP: ${gameResponse.status}`);
                                }
                                const gameData = await gameResponse.json();
                                this.games[gameUrl] = gameData.data.name;
                                return this.games[gameUrl];
                            } catch (error) {
                                console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                return gameUrl;
                            }
                        })
                    );
                    const dungeons = await Promise.all(
                        chefe.dungeons.map(async (dungeonUrl) => {
                            if (this.monsters[dungeonUrl]) {
                                return this.monsters[dungeonUrl];
                            }
                            try {
                                const dungeonResponse = await fetch(dungeonUrl);
                                if (!dungeonResponse.ok) {
                                    throw new Error(`Erro HTTP: ${dungeonResponse.status}`);
                                }
                                const dungeonData = await dungeonResponse.json();
                                this.monsters[dungeonUrl] = dungeonData.data.name;
                                return this.monsters[dungeonUrl];
                            } catch (error) {
                                console.error(`Erro ao buscar masmorra ${dungeonUrl}:`, error);
                                return dungeonUrl;
                            }
                        })
                    );
                    return {
                        id: chefe.id,
                        name: chefe.name,
                        description: chefe.description,
                        games: jogos.join(', '),
                        dungeons: dungeons.join(', ')
                    }
                })
            );
            console.log('Chefes, seus jogos e masmorras associadas:', chefes);
            return chefes;
        } catch (error) {
            console.error('Erro ao buscar chefes:', error);
            return [];
        }


    }
    static async tabelaChefes() {
        const chefes = await this.getChefes();
        const tabela = document.createElement('table');
        tabela.classList.add('tabela');
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID Chefe</th>
        <th class="coluna">Nome do Chefe</th>
        <th class="coluna">Nome do Mostro</th>
        <th class="coluna">Descrição</th>
        <th class="coluna">Apareceu no(s) Jogo(s)</th>
        </tr>`;
        chefes.forEach((chefe) => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${chefe.id}</td>
            <td class="coluna">${chefe.name}</td>
            <td class="coluna">${chefe.dungeons}</td>
            <td class="coluna">${chefe.description && chefe.description.length > 100 ? chefe.description.substring(0, 100) + "..." : chefe.description || ''}</td>
            <td class="coluna">${chefe.games}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(tabela);
    }

}

class Masmorras {
    static url_Masmorras = 'https://zelda.fanapis.com/api/dungeons';
    static games = {};
    constructor(parameters) {

    }
    static gerarPanel() {
        this.tabelaMasmorras();
    }
    static async getMasmorras() {
        const url = this.url_Masmorras;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log("Dados Recebidos: ", dados);
            const masmorras = await Promise.all(
                dados.map(async (masmorra) => {
                    const jogos = await Promise.all(
                        masmorra.appearances.map(async (gameUrl) => {
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            }
                            try {
                                const gameResponse = await fetch(gameUrl);
                                const gameData = await gameResponse.json();
                                this.games[gameUrl] = gameData.data.name;
                                return this.games[gameUrl];
                            } catch (error) {
                                console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                return gameUrl;
                            }
                        })
                    );
                    return {
                        id: masmorra.id,
                        name: masmorra.name,
                        description: masmorra.description,
                        games: jogos.join(', ')
                    }
                })

            );
            console.log('Masmorras e seus jogos:', masmorras);
            return masmorras;

        } catch (error) {
            console.error('Erro ao buscar masmorras:', error);
            return [];
        }
    }
    static async tabelaMasmorras() {
        const masmorras = await this.getMasmorras();
        const tabela = document.createElement('table');
        tabela.classList.add('tabela');
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID Masmorra</th>
        <th class="coluna">Nome da Masmorra</th>
        <th class="coluna">Descrição</th>
        <th class="coluna">Apareceu no(s) Jogo(s)</th>
        </tr>`;
        masmorras.forEach((masmorra) => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${masmorra.id}</td>
            <td class="coluna">${masmorra.name}</td>
            <td class="coluna">${masmorra.description && masmorra.description.length > 100 ? masmorra.description.substring(0, 100) + " ..." : masmorra.description}</td>
            <td class="coluna">${masmorra.games}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(tabela);
    }
}

class Lugares {
    static url_Lugares = 'https://zelda.fanapis.com/api/places';
    static games = {};
    static inhabitants = {};
    constructor(parameters) {

    }
    static gerarPanel() {
        this.tabelaLugares();
    }
    static async getLugares() {
        const url = this.url_Lugares;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log("Dados Recebidos: ", dados);
            const lugares = await Promise.all(
                dados.map(async (lugar) => {
                    const jogos = await Promise.all(
                        lugar.appearances.map(async (gameUrl) => {
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            } else {
                                try {
                                    const gameResponse = await fetch(gameUrl);
                                    const gameData = await gameResponse.json();
                                    this.games[gameUrl] = gameData.data.name;
                                    return gameData.data.name;
                                } catch (error) {
                                    console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                    return gameUrl;
                                }
                            }
                        })
                    );
                    const inhabitants = await Promise.all(
                        lugar.inhabitants.map(async (inhabitantUrl) => {
                            if (this.inhabitants[inhabitantUrl]) {
                                return this.inhabitants[inhabitantUrl];
                            } else {
                                try {
                                    const inhabitantResponse = await fetch(inhabitantUrl);
                                    const inhabitantData = await inhabitantResponse.json();
                                    this.inhabitants[inhabitantUrl] = inhabitantData.data.name;
                                    return this.inhabitants[inhabitantUrl];
                                } catch (error) {
                                    console.error(`Erro ao buscar habitante ${inhabitantUrl}:`, error);
                                    return inhabitantUrl;
                                }
                            }
                        })
                    );
                    return {
                        id: lugar.id,
                        name: lugar.name,
                        description: lugar.description,
                        games: jogos.join(', '),
                        inhabitants: inhabitants.join(', ')
                    }
                })
            );
            console.log('Lugares e seus jogos:', lugares);
            return lugares;

        } catch (error) {
            console.error('Erro ao buscar lugares:', error);
            return [];
        }
    }
    static async tabelaLugares() {
        const lugares = await this.getLugares();
        const tabela = document.createElement('table');
        tabela.classList.add('tabela');
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID Lugar</th>
        <th class="coluna">Nome do Lugar</th>
        <th class="coluna">Descrição</th>
        <th class="coluna">Apareceu no(s) Jogo(s)</th>
        <th class="coluna">Quem são os habitantes</th>
        </tr>`;
        lugares.forEach((lugar) => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${lugar.id}</td>
            <td class="coluna">${lugar.name}</td>
            <td class="coluna">${lugar.description && lugar.description.length > 100 ? lugar.description.substring(0, 100) + " ..." : lugar.description}</td>
            <td class="coluna">${lugar.games}</td>
            <td class="coluna">${lugar.inhabitants}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(tabela);
    }
}

class Itens {
    static url_Itens = 'https://zelda.fanapis.com/api/items';
    static games = {};
    constructor(parameters) {

    }
    static gerarPanel() {
        this.tabelaItens();
    }
    static async getItens() {
        const url = this.url_Itens;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const dados = data.data;
            console.log('Dados recebidos:', dados);
            const itens = await Promise.all(
                dados.map(async (item) => {
                    const jogos = await Promise.all(
                        item.games.map(async (gameUrl) => {
                            if (this.games[gameUrl]) {
                                return this.games[gameUrl];
                            }
                            try {
                                const gameResponse = await fetch(gameUrl);
                                if (!gameResponse.ok) {
                                    throw new Error(`Erro HTTP: ${gameResponse.status}`);
                                }
                                const gameData = await gameResponse.json();
                                this.games[gameUrl] = gameData.data.name;
                                return this.games[gameUrl];
                            } catch (error) {
                                console.error(`Erro ao buscar jogo ${gameUrl}:`, error);
                                return gameUrl;
                            }
                        })
                    );
                    return {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        games: jogos.join(', ')
                    }
                })
            );
            console.log('Itens e seus jogos:', itens);
            return itens;

        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            return [];
        }
    }
    static async tabelaItens() {
        const itens = await this.getItens();
        const tabela = document.createElement('table');
        tabela.classList.add('tabela');
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID Item</th>
        <th class="coluna">Nome do Item</th>
        <th class="coluna">Descrição</th>
        <th class="coluna">Apareceu no(s) Jogo(s)</th>
        </tr>`;
        itens.forEach((item) => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${item.id}</td>
            <td class="coluna">${item.name}</td>
            <td class="coluna">${item.description && item.description.length > 100 ? item.description.substring(0, 100) : item.description}</td>
            <td class="coluna">${item.games}</td>
            </tr>`;
        });
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(tabela);

    }

}