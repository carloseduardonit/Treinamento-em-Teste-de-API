let  Raizes = {};
const url_base = 'https://swapi.dev/api/';
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
        Comum.exibeTab(this,tab);
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
}
class Raiz {
    constructor(){}
    static async exibeRaiz() {
        this.exibirParagrafodaRaiz(await this.getRaizes());
    }
    static async getRaizes(){
        const url = url_base;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJSon = await response.json();
            const raiz ={              
                pessoas: responseJSon.people,
                filmes: responseJSon.films,
                naves_espaciais: responseJSon.starships,
                veiculos: responseJSon.vehicles,
                especies: responseJSon.species,
                planetas: responseJSon.planets
            }
            Raizes = raiz
            console.log("Dados da Raiz: ",raiz);
            return raiz;
        } catch (error){
            console.error("Erro no Metodo GetRaizes(): ",error);
            return {}
        }
    }
    static async exibirParagrafodaRaiz(raizes) {
        if(Array(raizes).length ===0){
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
    static exibePessoas() {
        resultsContainer.innerHTML = `
        <p class="ZeldaLink">Pessoas</p>
        <ul>
        <li><a class="ZeldaLink" href="${Raizes.pessoas}" target="_blank">End-Point de Pessoas</a></li>
        </ul>
        `;
        Comum.colacaremManutencao();
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
    constructor() {}    
    static exibeDocumentacao(){
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