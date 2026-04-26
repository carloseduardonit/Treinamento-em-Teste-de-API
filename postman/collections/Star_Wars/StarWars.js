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
        console.log("Raix",Raizes);
        this.LiberarOUBloquearBotao();
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
    static LiberarOUBloquearBotao(){
        const tabs = document.querySelectorAll('.tab-button').values;
        console.log(tabs);
        const tabsLiberado = ['Raiz', "Documentacao"];
        let bloqueado=  [];
        let nomeTab
        for(const tab of tabs){
            nomeTab = tab.data.tab;
            for (const liberado of tabsLiberado) {
                if (tab === liberado && Raizes.length === 0) {
                    return;  
                }
            }
            bloqueado.push(tab);
            console.log(bloqueado);
        };
    }
    static removeFormulario(){
        const  ativo = document.querySelector('.tab-button.active').dataset.tab;
        const form = document.getElementById("search-form");
        const titulo1 = document.querySelector(".titulo1");

        if(ativo ==='Raiz' || ativo === 'Documentacao'){
            form.remove();
            titulo1.remove();
        }
    }
    static exibirMelhorPesquisa() {
        const ativo = document.querySelector('.tab-button.active');

    }
    static exibirSchema() {
        const ativo = document.querySelector('.tab-button.active').dataset.tab;
        alert(`Exibindo schema para a aba: ${ativo} esta em manutenção !!!`);
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
        this.removeFormulario();
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
                return [];
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
            Raizes = raiz;
            console.log("Dados da Raiz: ", raiz, "Raizes: ", Raizes);
            return raiz;
        } catch (error) {
            console.error("Erro no Metodo GetRaizes(): ", error);
            return [];
        }
    }
    static async exibirParagrafodaRaiz(raizes) {
        if (!raizes || raizes.length === 0 || Array(raizes).length === 0) {
            resultsContainer.innerHTML = "<p><strong>End-Points não foram encontrados, por isso as demais abas será bloqueadas!!!</strong></p>"
            Comum.colacaremManutencao();
            return;
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
    }
    static async getPessoas() {
        const url = Raizes.pessoas;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição no Metodo Pessoas.getPessoas()")
                return [];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (pessoa) => {
                let planetaResponse = "Desconecido";
                return {
                    nome: pessoa.name,
                    altura: pessoa.height + " cm",
                    peso: pessoa.mass + " kg",
                    cor_cabelo: pessoa.hair_color === "n/a" || pessoa.hair_color === "none" ? "" : pessoa.hair_color,
                    cor_pele: pessoa.skin_color === "n/a" || pessoa.skin_color === "none" ? "" : pessoa.skin_color,
                    cor_olhos: pessoa.eye_color,
                    ano_nascimento: pessoa.birth_year === "unknown" ? "Desconhecido" : pessoa.birth_year.replace("BBY", " Anos"),
                    genero: pessoa.gender === "N/A" ? "" : pessoa.gender === "male" ? "Masculino" : "Feminino",
                    planeta_natal: planetaResponse || "Desconecido",
                    url: pessoa.url
                };
            }));
            console.log("Responda: ", response, "\nDados: ", results);
            return { results: results };
        } catch (error) {
            console.error("Erro no Metodo Pessoas.getPessoas(): ", error);
            return [];
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
            return [];
        }
    }
    static async exibeTabelaPessoas(Pessoas) {
        if (!Pessoas || Pessoas.length === 0) {
            resultsContainer.innerHTML += "<p><strong>End-Point não foi encontrado !!!</strong></p>"
            Comum.colacaremManutencao();
            return;
        }
        //resultsContainer.innerHTML ="";
        const tabela = document.createElement("table");
        tabela.classList.add("tabela");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID</th>
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
        let id = 1;
        resultadosPessoas.forEach(pessoa => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${id++}</td>
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
    static async exibeFilmes() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Filmes</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.filmes}" target="_blank">End-Point de Filmes</a></li>
        </ul>
        `;
        this.exibeTabelaFilmes(await this.getFilmes());
    }
    static async getFilmes() {
        const url = Raizes.filmes;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição no Metodo Filmes.getFilmes()")
                return [];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (filme) => {
                return {
                    titulo: filme.title,
                    episodio: filme.episode_id,
                    diretor: filme.director,
                    produtor: filme.producer,
                    abertura_rascunho: filme.opening_crawl.length > 150 ? filme.opening_crawl.substring(0, 150) + "..." : filme.opening_crawl,
                    data_lancamento: filme.release_date
                };
            })
            );

            console.log("Responda: ", response, "\nDados: ", data);

            return { "results": results };
        } catch (error) {
            console.error("Erro no Metodo Filmes.getFilmes(): ", error);
            return [];
        }
    }
    static async exibeTabelaFilmes(Filmes) {
        if(!Filmes || Filmes.length === 0){
            resultsContainer.innerHTML += "<p><strong>End-Point não foi encontrado !!!</strong></p>";
            Comum.colacaremManutencao();
            return;
        }
        const tabela = document.createElement("table");
        tabela.classList.add("tabela");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID</th>
        <th class="coluna">Título</th>
        <th class="coluna">Episódio</th>
        <th class="coluna">Diretor</th>
        <th class="coluna">Produtor</th>
        <th class="coluna">Abertura (Rascunho)</th>
        <th class="coluna">Data de Lançamento</th>
        </tr>
        `;
        let resultadosFilmes = Filmes.results;
        let id = 1;
        resultadosFilmes.forEach(filme => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${id++}</td>
            <td class="coluna">${filme.titulo}</td>
            <td class="coluna">${filme.episodio}</td>
            <td class="coluna">${filme.diretor}</td>
            <td class="coluna">${filme.produtor}</td>
            <td class="coluna">${filme.abertura_rascunho}</td>
            <td class="coluna">${filme.data_lancamento}</td>
            </tr>`;
        });
        resultsContainer.appendChild(tabela);
    }
}
class NavesEspaciais {
    static async exibeNavesEspaciais() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Naves Espaciais</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.naves_espaciais}" target="_blank">End-Point de Naves Espaciais</a></li>
        </ul>
        `;
        this.exibeTabelaNavesEspaciais(await this.getNavesEspaciais());
        
    }
    static async getNavesEspaciais() {
        const url = Raizes.naves_espaciais;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição no Metodo NavesEspaciais.getNavesEspaciais()")
                return[];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (nave) => {
                return {
                    nome: nave.name,
                    modelo: nave.model,
                    classe: nave.starship_class,
                    manufacturer: nave.manufacturer,
                    comprimento: nave.length,
                    maxima_velocidade: nave.max_atmospheric_speed,
                    tripulacao: nave.crew,
                    passageiros: nave.passengers,
                    capacidade_carga: nave.cargo_capacity,
                    consumiveis: nave.consumables
                };
            })
            );
            console.log("Responda: ", response, "\nDados: ", data);
            return { "results": results };
        } catch (error) {
            console.error("Erro no Metodo NavesEspaciais.getNavesEspaciais(): ", error);
            return [];
        }
    }
    static async exibeTabelaNavesEspaciais(NavesEspaciais) {
        if (!NavesEspaciais || NavesEspaciais.length === 0) {
            resultsContainer.innerHTML += "<p><strong>End-Point não foi encontrado !!!</strong></p>"
            Comum.colacaremManutencao();
            return;
        }
        const tabela = document.createElement("table");
        tabela.classList.add("tabela1");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID</th>
        <th class="coluna">Nome</th>
        <th class="coluna">Modelo</th>
        <th class="coluna">Classe</th>
        <th class="coluna">Fabricante</th>
        <th class="coluna">Comprimento</th>
        <th class="coluna">Máxima Velocidade</th>
        <th class="coluna">Tripulação</th>
        <th class="coluna">Passageiros</th>
        <th class="coluna">Capacidade de Carga</th>
        <th class="coluna">Consumíveis</th>
        </tr>
        `;
        let resultadosNaves = NavesEspaciais.results;
        let id = 1;
        resultadosNaves.forEach(nave => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${id++}</td>
            <td class="coluna">${nave.nome}</td>
            <td class="coluna">${nave.modelo}</td>
            <td class="coluna">${nave.classe}</td>
            <td class="coluna">${nave.manufacturer}</td>
            <td class="coluna">${nave.comprimento}</td>
            <td class="coluna">${nave.maxima_velocidade}</td>
            <td class="coluna">${nave.tripulacao}</td>
            <td class="coluna">${nave.passageiros}</td>
            <td class="coluna">${nave.capacidade_carga}</td>
            <td class="coluna">${nave.consumiveis}</td>
            </tr>`;
        });
        resultsContainer.appendChild(tabela);

    }
}
class Veiculos {
    static async exibeVeiculos() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Veículos</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.veiculos}" target="_blank">End-Point de Veículos</a></li>
        </ul>
        `;
        this.exibeTabelaVeiculos(await this.getVeiculos);
        Comum.colacaremManutencao();
    }
    static async getVeiculos(url = Raizes.veiculos) {
        console.log("URL:", url)
        try {
            const response = await fetch(url);
            if(response.ok){
                console.log("")
            }
            const data  = response.json();
            const result = data.results;
            return result;
        } catch (error) {

        }

    }
    static exibeTabelaVeiculos(Veiculos) {

    }
}
class Especies {
    static async exibeEspecies() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Espécies</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.especies}" target="_blank">End-Point de Espécies</a></li>
        </ul>
        `;
        this.exibeTabelaEspecies(await getEspecies());
        Comum.colacaremManutencao();
    }
    static async getEspecies() {
        const url = Raizes.especies;
        return this.getEspecies(url);
    }
    static async getEspecies(url) {
        console.log("URL: ", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("");
                return;
            }
            const data = await response.json();
            const resultado = await Promise.all(data.results.map(async (especie) => {
                try {
                    return {
                        nome: especie.name,
                        classificacao: especie.classification,
                        designacao: especie.designation,
                        altura_média: especie.average_height
                    }

                } catch (error) {
                    console.log("Erro no metodo getEspecies", error);
                }

            }))
            return { "results": resultado };
        } catch (error) {
            console.error("Erro no Metodo Especies.getEspecies(): ", error);
            return [];
        }
    }
    static exibeTabelaEspecies(Especies) {
        if (!Especies || Especies.length === 0) {
            console.log("")
        }
        const tabela = document.createElement("table");
        tabela.classList("tabela");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID</th>
        <tr>`;
        resultsContainer.appendChild(tabela);

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