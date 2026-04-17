let Raizes = {};
const url_base = 'https://swapi.dev/api/';
const btn_Pesquisar = document.getElementById('search-button');
const btn_Limpar = document.getElementById('clear-button');
const btn_Schema = document.getElementById('schema-button');

class StarWars {
    constructor() {

    }
    static loadFormulario() {
        this.loadBotao();
        Raiz.exibeRaiz();
    }
    static exibeFormulario() {
        if (!document.querySelector('.titulo1')) {
            mainContent.innerHTML += `
        <h1 class="titulo1">Star Wars API</h1>`
        }
        if (!document.getElementById('search-form')) {
            const form = document.createElement('form');
            form.setAttribute('id', 'search-form');
            form.innerHTML = `
            <label for="search">Pesquisar:</label>
            <input type="text" id="search" placeholder="Digite sua pesquisa...">
            <button type="button" id="search-button" class="menu-toggle">Pesquisar</button>
            <button type="button" id="clear-button" class="menu-toggle">Limpar</button>
            <button type="button" id="schema-button" class="menu-toggle" onclick="StarWars.exibirSchema()">Exibir Schema</button>
        `;
            mainContent.appendChild(form);
        }



    }
    static exibirMelhorPesquisa() {
        const ativo = document.querySelector('.tab-button.active');

    }
    static exibirSchema() {
        const ativo = document.querySelector('.tab-button.active').dataset.tab;
        switch (ativo) {
            case 'Pessoas':
                Pessoas.getSchema();
                break;
            // Adicione cases para outros tipos de entidades conforme necessário
        }

    }
    static loadBotao() {
        mainContent.innerHTML = '1';
        const divisao = document.createElement('div');
        divisao.setAttribute('id', 'tabs');
        divisao.innerHTML = `
        <button class="tab-button active" data-tab="Raiz" onclick="StarWars.exibeTab('Raiz')">Raiz</button>
        <button class="tab-button" data-tab="Pessoas" onclick="StarWars.exibeTab('Pessoas')">Pessoas</button>
        <button class="tab-button" data-tab="Filmes" onclick="StarWars.exibeTab('Filmes')">Filmes</button>
        <button class="tab-button" data-tab="Naves Espaciais" onclick="StarWars.exibeTab('Naves Espaciais')">Naves Espaciais</button>
        <button class="tab-button" data-tab="Veículos" onclick="StarWars.exibeTab('Veículos')">Veículos</button>
        <button class="tab-button" data-tab="Espécies" onclick="StarWars.exibeTab('Espécies')">Espécies</button>
        <button class="tab-button" data-tab="Planetas" onclick="StarWars.exibeTab('Planetas')">Planetas</button>
        <button class="tab-button" data-tab="Documentacao" onclick="StarWars.exibeTab('Documentacao')">Documentação</button>`
        mainContent.innerHTML = ``;
        mainContent.appendChild(divisao);
    }

    static async exibeTab(tab) {
        Comum.exibeTab(this, tab);
        switch (tab) {
            case 'Raiz':
                Raiz.exibeRaiz();
                break;
            case 'Pessoas':
                Pessoas.exibePessoas();
                break;
            case 'Filmes':
                Filmes.exibeFilmes();
                break;
            case 'Naves Espaciais':
                NavesEspaciais.exibeNavesEspaciais();
                break;
            case 'Veículos':
                Veiculos.exibeVeiculos();
                break;
            case 'Espécies':
                Especies.exibeEspecies();
                break;
            case 'Planetas':
                Planetas.exibePlanetas();
                break;
            case 'Documentacao':
                Documentacao.exibeDocumentacao();
                break;
        }
    }
    static removaAtivos() {
        Comum.removaAtivos();
    }
    static limpar() {

    }
}
class Raiz {
    constructor() { }
    static async exibeRaiz() {
        this.exibirParagrafodaRaiz(await this.getRaizes());
    }
    static async getRaizes() {
        const url = url_base;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJSon = await response.json();
            const raiz = {
                pessoas: responseJSon.people,
                filmes: responseJSon.films,
                naves_espaciais: responseJSon.starships,
                veiculos: responseJSon.vehicles,
                especies: responseJSon.species,
                planetas: responseJSon.planets
            }
            Raizes = raiz
            console.log("Dados da Raiz: ", raiz);
            return raiz;
        } catch (error) {
            console.error("Erro no Metodo GetRaizes(): ", error);
            return {}
        }
    }
    static async exibirParagrafodaRaiz(raizes) {
        if (Array(raizes).length === 0) {
            resultsContainer.innerHTML = "<p><strong>End-Point não foi encontrado !!!</strong></p>"
        }
        resultsContainer.innerHTML = `<p class="resultado"><strong>End-Point de Pessoas: </strong> ${raizes.pessoas}`;
        resultsContainer.innerHTML += `<p class="resultado"><strong>End-Point de Filmes: </strong>${raizes.filmes}`;
        resultsContainer.innerHTML += `<p class="resultado"><strong>End-Point de Naves Espaciais: </strong> ${raizes.naves_espaciais}`;
        resultsContainer.innerHTML += `<p class="resultado"><strong>End-Point de Veículos: </strong> ${raizes.veiculos}`;
        resultsContainer.innerHTML += `<p class="resultado"><strong>End-Point de Espécies: </strong> ${raizes.especies}`;
        resultsContainer.innerHTML += `<p class="resultado"><strong>End-Point de Planetas: </strong> ${raizes.planetas}`;
    }
}
class Pessoas {
    static async exibePessoas() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Pessoas</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.pessoas}" target="_blank">End-Point de Pessoas</a></li>
        </ul>
        `;
        this.exibeTabelaPessoas(await this.getPessoas());
        Comum.colacaremManutencao();
    }
    static async getPessoas() {
        const url = Raizes.pessoas;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                new Error("Erro na requisição no Metodo Pessoas.getPessoas()");
                return;
            }
            const data = await response.json();
            const results = data.results;
            console.log("Responda: ", response, "\nDados: ", data);
            const pessoasEscolhidas = await Promise.all(
                results.map(pessoa => {
                try {
                    const filmes = await Promise.all(
                        pessoa.films.map(async filme => {
                        try {
                            const responseFilme = await fetch(filme);
                            if (!responseFilme.ok) {
                                throw new Error(`Erro HTTP ao buscar filme: ${responseFilme.status}`);
                            }
                            const dataFilme = await responseFilme.json();
                            return dataFilme.title; // Retorna o título do filme
                        } catch (error) {
                            console.error("Erro ao buscar filme: ", error);
                            return "Título do filme não disponível";
                        }
                    }));
                    const veiculos = await Promise.all(pessoa.vehicles.map(async veiculo => {
                        try {
                            const responseVeiculo = await fetch(veiculo);
                            if (!responseVeiculo.ok) {
                                throw new Error(`Erro HTTP ao buscar veiculo: ${responseVeiculo.status}`);
                            }
                            const dataVeiculo = await responseVeiculo.json();
                            return dataVeiculo.name; // Retorna o nome do veiculo
                        } catch (error) {
                            console.error("Erro ao buscar veiculo: ", error);
                            return "Veiculo não disponível";
                        }
                    }));

                    return {
                        nome: pessoa.name,
                        altura: pessoa.height,
                        peso: pessoa.mass,
                        cor_cabelo: pessoa.hair_color,
                        cor_pele: pessoa.skin_color,
                        cor_olhos: pessoa.eye_color,
                        ano_nascimento: pessoa.birth_year,
                        genero: pessoa.gender === "N/A" ? "" : pessoa.gender === "male" ? "Masculino" : "Feminino",
                        url: pessoa.url,
                        filmes = filmes.join(" | "),
                        veiculos =veiculos.join(" | ")
                    };

                    console.log("Pessoas Escolhidas: ", pessoasEscolhidas);
                    return { results: pessoasEscolhidas };
                } catch (error) {
                    console.error("Erro no Metodo Pessoas.getPessoas().pessoasEscolhidas: ", error);
                }
            }
            ));
            return pessoasEscolhidas;
        } catch (error) {
            console.error("Erro no Metodo Pessoas.getPessoas(): ", error);
        }
    }

    /** Com defeito */
    static async getSchema() {
        const url = Raizes.pessoas + "schema";
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                new Error("Erro na requisição no Metodo Pessoas.getSchema()")
                return;
            }
            const data = await response.json();
            console.log("Responda: ", response, "\nDados: ", data);
            return data;
        } catch (error) {
            console.error("Erro no Metodo Pessoas.getSchema(): ", error);
        }
    }
    static async exibeTabelaPessoas(Pessoas) {
        if (!Pessoas || Pessoas.length === 0) {

        }
        //resultsContainer.innerHTML ="";
        const tabela = document.createElement("table");
        tabela.classList.add("tabela");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">Nome</th>
        <th class="coluna">Altura</th>
        <th class="coluna">Peso</th>
        <th class="coluna">Cor do Cabelo</th>
        <th class="coluna">Cor da Pele</th>
        <th class="coluna">Cor dos Olhos</th>
        <th class="coluna">Ano de Nascimento</th>
        <th class="coluna">Gênero</th>
        <th class="coluna">Planeta Natal</th>
        <th class="coluna">URL</th>
        </tr>
        `;
        let resultadosPessoas = Pessoas.results;

        resultadosPessoas.forEach(pessoa => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${pessoa.nome}</td>
            <td class="coluna">${pessoa.altura}</td>
            <td class="coluna">${pessoa.peso}</td>
            <td class="coluna">${pessoa.cor_cabelo}</td>
            <td class="coluna">${pessoa.cor_pele}</td>
            <td class="coluna">${pessoa.cor_olhos}</td>
            <td class="coluna">${pessoa.ano_nascimento}</td>
            <td class="coluna">${pessoa.genero}</td>
            <td class="coluna">${pessoa.planeta_natal}</td>
            <td class="coluna"><a href="${pessoa.url}" target="_blank">Ver Detalhes</a></td>
            </tr>`;
        });
        resultsContainer.appendChild(tabela);
    }
}
class Filmes {
    static exibeFilmes() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Filmes</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.filmes}" target="_blank">End-Point de Filmes</a></li>
        </ul>
        `;
        Comum.colacaremManutencao();
    }
}
class NavesEspaciais {
    static exibeNavesEspaciais() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Naves Espaciais</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.naves_espaciais}" target="_blank">End-Point de Naves Espaciais</a></li>
        </ul>
        `;
        Comum.colacaremManutencao();
    }
}
class Veiculos {
    static exibeVeiculos() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Veículos</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.veiculos}" target="_blank">End-Point de Veículos</a></li>
        </ul>
        `;
        Comum.colacaremManutencao();
    }
}
class Especies {
    static exibeEspecies() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Espécies</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.especies}" target="_blank">End-Point de Espécies</a></li>
        </ul>
        `;
        Comum.colacaremManutencao();
    }
}
class Planetas {
    static exibePlanetas() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Planetas</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.planetas}" target="_blank">End-Point de Planetas</a></li>
        </ul>
        `;
        Comum.colacaremManutencao();
    }
}

class Documentacao {
    constructor() { }
    static exibeDocumentacao() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Documentação</p>
        <ul>
        <li><a class="ZeldaLink" href="https://github.com/carloseduardonit/Treinamento-em-Teste-de-API" target="_blank">Documentação do principal do repositorio</a></li>
        <li><a class="ZeldaLink" href="https://github.com/carloseduardonit/Treinamento-em-Teste-de-API/blob/master/postman/collections/Star_Wars/Star_Wars_API.MD" target="_blank">Documentação do Star_Wars.MD</a></li>
        <li><a class="ZeldaLink" href="https://swapi.dev/documentation" target="_blank">Documentação Oficial da Star_Wars API</a></li>
        </ul>
        `;
    }
}