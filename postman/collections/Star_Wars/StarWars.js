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
        console.log("Raiz", Raizes);
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
    static LiberarOUBloquearBotao() {
        const tabs = document.querySelectorAll('.tab-button').values;
        console.log(tabs);
        const tabsLiberado = ['Raiz', "Documentacao"];
        let bloqueado = [];
        let nomeTab
        for (const tab of tabs) {
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
    static removeFormulario() {
        const ativo = document.querySelector('.tab-button.active').dataset.tab;
        const form = document.getElementById("search-form");
        const titulo1 = document.querySelector(".titulo1");

        if (ativo === 'Raiz' || ativo === 'Documentacao') {
            form.remove();
            titulo1.remove();
        }
    }
    static exibirMelhorPesquisa() {
        const ativo = document.querySelector('.tab-button.active');

    }
    static exibirSchema() {
        const ativo = document.querySelector('.tab-button.active').dataset.tab;
        alert(`Exibindo schema para a aba: ${ativo} está em manutenção !!!`);
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
                Pessoas.exibeTabelaPessoas(await Pessoas.getPessoas());
                break;
            case 'Filmes':
                Filmes.exibeTabelaFilmes(await Filmes.getFilmes());
                break;
            case 'Naves Espaciais':
                NavesEspaciais.exibeTabelaNavesEspaciais(await NavesEspaciais.getNavesEspaciais());
                break;
            case 'Veículos':
                Veiculos.exibeTabelaVeiculos(await Veiculos.getVeiculos());
                break;
            case 'Espécies':
                Especies.exibeTabelaEspecies(await Especies.getEspecies());
                break;
            case 'Planetas':
                Planetas.exibeTabelaPlanetas(await Planetas.getPlanetas());
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
    static async obterNome(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {

            }
            const data = await response.json();
            const nome = await data.name;
            const titulo = await data.title;
            return nome || titulo || "-";
        } catch (error) {

        }
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
        </ul>`;
    }

    static async getPessoas(url = Raizes.pessoas) {
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição no Metodo Pessoas.getPessoas()")
                return [];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (pessoa) => {
                let planetaResponse = await StarWars.obterNome(pessoa.homeworld);
                let especiesResponse = await Promise.all(pessoa.species.map(async (especie) => {
                    return await StarWars.obterNome(especie);
                }));
                let filmesResponse = await Promise.all(pessoa.films.map(async (filme) => {
                    return await StarWars.obterNome(filme);
                }));
                let veiculosResponse = await Promise.all(pessoa.vehicles.map(async (veiculo) => {
                    return await StarWars.obterNome(veiculo);
                }));
                let naveResponse = await Promise.all(pessoa.starships.map(async (nave) => {
                    return await StarWars.obterNome(nave);
                }));
                return {
                    id: String(pessoa.url).slice(-3,-1).replace("/",""),
                    nome: pessoa.name,
                    altura: pessoa.height + " cm",
                    peso: pessoa.mass + " kg",
                    cor_cabelo: pessoa.hair_color === "n/a" || pessoa.hair_color === "none" ? "" : pessoa.hair_color,
                    cor_pele: pessoa.skin_color === "n/a" || pessoa.skin_color === "none" ? "" : pessoa.skin_color,
                    cor_olhos: pessoa.eye_color,
                    ano_nascimento: pessoa.birth_year === "unknown" ? "Desconhecido" : pessoa.birth_year.replace("BBY", " Anos"),
                    genero: pessoa.gender === "N/A" ? "" : pessoa.gender === "male" ? "Masculino" : "Feminino",
                    da_especie: String(especiesResponse).replaceAll(",", ", \n") || "-",
                    esta_filme: String(filmesResponse).replaceAll(",", ", \n") || "-",
                    planeta_natal: String(planetaResponse).replaceAll(",", ", \n") || "Desconhecido",
                    possuiu_veiculos: String(veiculosResponse).replaceAll(",", ", \n") || "Desconhecido",
                    possuiu_naves: String(naveResponse).replaceAll(",", ", \n") || "-",
                    url: pessoa.url
                };
            }));
            console.log("Responda: ", response, "\nDados: ", results);
            return { results: results, anteriorPagina: data.previous || "-", atualPagina: url, proximaPagina: data.next || "-" };
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
        resultsContainer.innerHTML = "";
        this.exibePessoas();
        const tabela = document.createElement("table");
        tabela.classList.add("tabela1");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">#</th>
        <th class="coluna">Nome</th>
        <th class="coluna">Altura</th>
        <th class="coluna">Peso</th>
        <th class="coluna">Cor do Cabelo</th>
        <th class="coluna">Cor da Pele</th>
        <th class="coluna">Cor dos Olhos</th>
        <th class="coluna">Ano de Nascimento</th>
        <th class="coluna">Gênero</th>
        <th class="coluna">Da especie</th>
        <th class="coluna">Estava no filme</th>
        <th class="coluna">Planeta Natal</th>
        <th class="coluna">Possuiu Veiculos</th>
        <th class="coluna">Possuiu Naves</th>
        <th class="coluna">URL</th>
        </tr>
        `;
        let resultadosPessoas = Pessoas.results;
    
        resultadosPessoas.forEach(pessoa => {
           
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${pessoa.id}</td>
            <td class="coluna">${pessoa.nome}</td>
            <td class="coluna">${pessoa.altura}</td>
            <td class="coluna">${pessoa.peso}</td>
            <td class="coluna">${pessoa.cor_cabelo}</td>
            <td class="coluna">${pessoa.cor_pele}</td>
            <td class="coluna">${pessoa.cor_olhos}</td>
            <td class="coluna">${pessoa.ano_nascimento}</td>
            <td class="coluna">${pessoa.genero}</td>
            <td class="coluna">${pessoa.da_especie}</td>
            <td class="coluna">${pessoa.esta_filme}</td>
            <td class="coluna">${pessoa.planeta_natal}</td>
            <td class="coluna">${pessoa.possuiu_veiculos}</td>
            <td class="coluna">${pessoa.possuiu_naves}</td>
            <td class="coluna"><a href="${pessoa.url}" target="_blank">Ver Detalhes</a></td>
            </tr>`;
        });
        resultsContainer.appendChild(tabela);
        if (Pessoas.anteriorPagina !== "-") {
            const botaoAnterior = document.createElement("button");
            botaoAnterior.classList.add("menu-toggle");
            botaoAnterior.textContent = "Página Anterior"
            botaoAnterior.addEventListener("click", async () => {
                const anteriorPagina = Pessoas.anteriorPagina;
                const resultadoAnterior = await this.getPessoas(anteriorPagina);
                this.exibeTabelaPessoas(resultadoAnterior);
            });
            resultsContainer.appendChild(botaoAnterior);
        }
        if (Pessoas.proximaPagina !== "-") {
            const botaoProxima = document.createElement("button");
            botaoProxima.classList.add("menu-toggle");
            botaoProxima.textContent = "Proxima Página"
            botaoProxima.addEventListener("click", async () => {
                const proximaPagina = Pessoas.proximaPagina;
                const resultadoProximo = await this.getPessoas(proximaPagina);
                this.exibeTabelaPessoas(resultadoProximo);
            });
            resultsContainer.appendChild(botaoProxima);
        }
    }
}
class Filmes {
    static async exibeFilmes() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Filmes</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.filmes}" target="_blank">End-Point de Filmes</a></li>
        </ul>`;
    }
    static async getFilmes(url = Raizes.filmes) {
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição no Metodo Filmes.getFilmes()")
                return [];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (filme) => {
                let personagemResponse = await Promise.all(filme.characters.map(async (personagem) => {
                    return await StarWars.obterNome(personagem);
                }));
                let planetaResponse = await Promise.all(filme.planets.map(async (planeta) => {
                    return await StarWars.obterNome(planeta);
                }));
                let naveResponse = await Promise.all(filme.starships.map(async (nave) => {
                    return await StarWars.obterNome(nave);
                }));
                let veiculosResponse = await Promise.all(filme.vehicles.map(async (veiculo) => {
                    return await StarWars.obterNome(veiculo);
                }));
                let especiesResponse = await Promise.all(filme.species.map(async (especie) => {
                    return await StarWars.obterNome(especie);
                }));
                return {
                    titulo: filme.title,
                    episodio: filme.episode_id,
                    diretor: filme.director,
                    produtor: filme.producer,
                    abertura_rascunho: filme.opening_crawl.length > 150 ? filme.opening_crawl.substring(0, 150) + "..." : filme.opening_crawl,
                    data_lancamento: String(filme.release_date).substring(8, 10) + "/" + String(filme.release_date).substring(5, 7) + "/" + String(filme.release_date).substring(0, 4),
                    ha_personagens: personagemResponse,
                    ha_planetas: planetaResponse,
                    ha_naves: naveResponse,
                    ha_veiculos: veiculosResponse,
                    ha_especies: especiesResponse
                };
            }));
            console.log("Responda: ", response, "\nDados: ", data);
            return { "results": results };
        } catch (error) {
            console.error("Erro no Metodo Filmes.getFilmes(): ", error);
            return [];
        }
    }
    static async exibeTabelaFilmes(Filmes) {
        if (!Filmes || Filmes.length === 0) {
            resultsContainer.innerHTML += "<p><strong>End-Point não foi encontrado !!!</strong></p>";
            Comum.colacaremManutencao();
            return;
        }
        resultsContainer.innerHTML = "";
        this.exibeFilmes();
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
        <th class="coluna">Há personagens?</th>
        <th class="coluna">Há planetas?</th>
        <th class="coluna">Há Naves Espaciais?</th>
        <th class="coluna">Há Veiculos?</th>
        <th class="coluna">Há quais especies?</th>
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
            <td class="coluna">${filme.ha_personagens}</td>
            <td class="coluna">${filme.ha_planetas}</td>
            <td class="coluna">${filme.ha_naves}</td>
            <td class="coluna">${filme.ha_veiculos}</td>
            <td class="coluna">${filme.ha_especies}</td>
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
        </ul>`;
    }
    static async getNavesEspaciais(url = Raizes.naves_espaciais) {
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro na requisição no Metodo NavesEspaciais.getNavesEspaciais()")
                return [];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (nave) => {
                return {
                    nome: nave.name,
                    modelo: nave.model,
                    classe: nave.starship_class,
                    manufacturer: nave.manufacturer,
                    comprimento: nave.length,
                    maxima_velocidade: nave.max_atmosphering_speed,
                    tripulacao: nave.crew,
                    passageiros: nave.passengers,
                    capacidade_carga: nave.cargo_capacity,
                    consumiveis: nave.consumables
                };
            }));
            const atualPagina = url;
            const anteriorPagina = data.previous || "-";
            const proximaPagina = data.next || "-";
            console.log("Responda: ", response, "\nDados: ", data, "\nPróxima página: ", proximaPagina, "\nAnterior página: ", anteriorPagina);
            return { "results": results, "anteriorPagina": anteriorPagina, "atualPagina": atualPagina, "proximaPagina": proximaPagina };
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
        resultsContainer.innerHTML = "";
        this.exibeNavesEspaciais()
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
        </tr>`;
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
        if (NavesEspaciais.anteriorPagina !== "-") {
            const botaoAnterior = document.createElement("button");
            botaoAnterior.textContent = "Página Anterior";
            botaoAnterior.classList.add("menu-toggle");
            botaoAnterior.addEventListener("click", async () => {
                const anteriorPagina = NavesEspaciais.anteriorPagina;
                const resultadoAnterior = await this.getNavesEspaciais(anteriorPagina);
                this.exibeTabelaNavesEspaciais(resultadoAnterior);
            });
            resultsContainer.appendChild(botaoAnterior);
        }
        if (NavesEspaciais.proximaPagina !== "-") {
            const botaoProxima = document.createElement("button");
            botaoProxima.textContent = "Próxima Página";
            botaoProxima.classList.add("menu-toggle");
            botaoProxima.addEventListener("click", async () => {
                const proximaPagina = NavesEspaciais.proximaPagina;
                console.log("Proxima Página:", proximaPagina);
                const resultadoProximo = await this.getNavesEspaciais(proximaPagina);
                this.exibeTabelaNavesEspaciais(resultadoProximo);
            });
            resultsContainer.appendChild(botaoProxima);
        }

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

        Comum.colacaremManutencao();
    }
    static async getVeiculos(url = Raizes.veiculos) {
        console.log("URL:", url)
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.log("");
                return [];
            }
            const data = await response.json();
            const result = await data.results;
            return { "result": result };
        } catch (error) {
            return [];
        }

    }
    static exibeTabelaVeiculos(Veiculos) {
        if (!Veiculos || Veiculos.length === 0) {
            resultsContainer.innerHTML = "<p><strong>End-Point não foi encontrado !!!</strong></p>";
            Comum.colacaremManutencao();
            return;
        }
        this.exibeVeiculos();

    }
}
class Especies {
    static async exibeEspecies() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Espécies</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.especies}" target="_blank">End-Point de Espécies</a></li>
        </ul>`;
    }

    static async getEspecies(url = Raizes.especies) {
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
                        altura_média: especie.average_height !== "n/a" && especie.average_height !== "unknown" ? especie.average_height + " cm" : "-"
                    }

                } catch (error) {
                    console.log("Erro no metodo getEspecies", error);
                }

            }))

            console.log("dados: ", data, "\nresultado: ", resultado)
            return { "results": resultado, "anteriorPagina": data.previous || "-", "atualPagina": url, "proximaPagina": data.next || "-" };
        } catch (error) {
            console.error("Erro no Metodo Especies.getEspecies(): ", error);
            return [];
        }
    }
    static exibeTabelaEspecies(Especie) {
        if (!Especie || Especie.length === 0) {
            console.log("");
            return;
        }
        resultsContainer.innerHTML = "";
        this.exibeEspecies();
        const tabela = document.createElement("table");
        tabela.classList.add("tabela1");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID</th>
        <th class="coluna">Nome</th>
        <th class="coluna">Classificação</th>
        <th class="coluna">Designação</th>
        <th class="coluna">Altura Média</th>
        <tr>`;
        let id = 1;
        let especiesResultado = Especie.results;
        especiesResultado.forEach(esp => {
            tabela.innerHTML += `<tr class="linha">
                <td class="coluna">${id++}</td>
                <td class="coluna">${esp.nome}</td>
                <td class="coluna">${esp.classificacao}</td>
                <td class="coluna">${esp.designacao}</td>
                <td class="coluna">${esp.altura_média}</td>
                <tr>
            `
        });
        resultsContainer.appendChild(tabela);
        console.log(Especie)

        if (Especie.anteriorPagina !== "-") {
            let botaoAnterior = document.createElement("button");
            botaoAnterior.textContent = "Página Anterior"
            botaoAnterior.classList.add("menu-toggle");
            botaoAnterior.addEventListener('click', async () => {
                const anteriorPagina = Especie.anteriorPagina;
                const resultadoAnterior = await this.getEspecies(anteriorPagina);
                this.exibeTabelaEspecies(resultadoAnterior);
            });
            resultsContainer.appendChild(botaoAnterior);
        }

        if (Especie.proximaPagina !== "-") {
            const botaoProxima = document.createElement("button");
            botaoProxima.textContent = "Próxima Página"
            botaoProxima.classList.add("menu-toggle");
            botaoProxima.addEventListener("click", async () => {
                const proximaPagina = Especie.proximaPagina;
                const resultadoProximo = await this.getEspecies(Especie.proximaPagina);
                this.exibeTabelaEspecies(resultadoProximo);
            });
            resultsContainer.appendChild(botaoProxima);
        }

    }
}
class Planetas {
    static exibePlanetas() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Planetas</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.planetas}" target="_blank">End-Point de Planetas</a></li>
        </ul> `;
    }

    static async getPlanetas(url = Raizes.planetas) {
        console.log("URL: ", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro na requisição no Metodo Planetas.getPlanetas()`);
                return [];
            }
            const data = await response.json();
            const results = await Promise.all(data.results.map(async (planeta) => {
                return {
                    nome: planeta.name,
                    periodo_de_rotacao: planeta.rotation_period,
                    periodo_orbital: planeta.orbital_period,
                    diametro: planeta.diameter,
                    clima: planeta.climate,
                    gravidade: planeta.gravity,
                    terreno: planeta.terrain,
                    agua_de_superficie: planeta.surface_water,
                    populacao: planeta.population !== "unknown" ? planeta.population : "-"
                }
            }));
            console.log(results, data);
            return { "results": results, "anteriorPagina": data.previous || "-", "atualPagina": url, "proximaPagina": data.next || "-" };
        } catch (error) {
            console.error("Erro")
            return [];
        }
    }

    static async exibeTabelaPlanetas(Planeta) {
        if (!Planeta || Planeta.length === 0) {
            resultsContainer.innerHTML += "<p><strong>End-Point não foi encontrado !!!</strong></p>";
            Comum.colacaremManutencao();
            return;
        }
        let id = 1;
        resultsContainer.innerHTML = "";
        this.exibePlanetas();
        const tabela = document.createElement("table");
        tabela.classList.add("tabela1");
        tabela.innerHTML = `<tr class="linha">
        <th class="coluna">ID</th>
        <th class="coluna">Nome</th>
        <th class="coluna">Periodo de rotação</th>
        <th class="coluna">Periodo orbital</th>
        <th class="coluna">Diametro</th>
        <th class="coluna">Clima</th>
        <th class="coluna">Gravidade</th>
        <th class="coluna">Terreno</th>
        <th class="coluna">agua de superficie</th>
        <th class="coluna">populacao</th>
        <th class="coluna"></th>
        </tr>`;
        let planetasResultado = Planeta.results;
        planetasResultado.forEach(plan => {
            tabela.innerHTML += `<tr class="linha">
            <td class="coluna">${id++}</td>
            <td class="coluna">${plan.nome}</td>
            <td class="coluna">${plan.periodo_de_rotacao}</td>
            <td class="coluna">${plan.periodo_orbital}</td>
            <td class="coluna">${plan.diametro}</td>
            <td class="coluna">${plan.clima}</td>
            <td class="coluna">${plan.gravidade}</td>
            <td class="coluna">${plan.terreno}</td>
            <td class="coluna">${plan.agua_de_superficie}</td>
            <td class="coluna">${plan.populacao}</td>
            </tr>`;
        });
        resultsContainer.appendChild(tabela);

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