const btn_starWars = document.getElementById('StarWars');
const btn_zelda = document.getElementById('Zelda');
const btn_clear = document.getElementById('clear');
const title = document.querySelector('title');
const h1Title = document.querySelector('h1#title');
const mainContent = document.querySelector('main');
const resultsContainer = document.getElementById('results-container');
const titulo2Resultado = document.getElementById('Resultados');


btn_starWars.addEventListener('click', (event) => {
    event.preventDefault();
    clearMainContent();
    title.innerText = 'Star Wars';
    h1Title.innerText = ' Star Wars';
    console.log('Star Wars');
    mainContent.innerHTML = '<h2>Star Wars</h2><p>Bem-vindo ao universo de Star Wars!</p>';
    StarWars.loadFormulario();
    Comum.removeManutencao();
});
class Comum {
    constructor() {    }
    static colacaremManutencao() {
        if (!document.getElementsByClassName('star-wars-gif')[0]) {
            const img = document.createElement('img');
            img.className = 'star-wars-gif';
            img.style.maxWidth = '25%';
            img.style.maxHeight = '25%';
            img.style.marginLeft = 'auto';
            img.style.marginRight = 'auto';
            img.src = 'Img/pngwing.com.png';
            img.alt = 'Star Wars GIF';
            resultsContainer.appendChild(img);
        }
    }
    static removeManutencao() {
        if (document.getElementsByClassName('star-wars-gif')[0]) {
            const starWarsGif = document.getElementsByClassName('star-wars-gif')[0];
            starWarsGif.remove();
        }
    }
    static exibeTab(objeto,tipo) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const ativo = document.querySelector('.tab-button.active');
        console.log("Ativo:", ativo);
        let nome = ativo.dataset.tab;
        console.log("Nome:", nome);
        
        for (let index = 0; index < tabButtons.length; index++) {
            if (nome === tipo) {
                return;
            }
            if (tabButtons[index].dataset.tab === tipo) {
                objeto.removaAtivos();
                titulo2Resultado.innerText= `Resultado de ${tipo}:`;
                tabButtons[index].classList.add('active');
                objeto.exibeFormulario(tipo);
                break
            }
        }
    }
    static removaAtivos() {
        const tabButtons = document.querySelectorAll('.tab-button');
        for (let index = 0; index < tabButtons.length; index++) {
            if (tabButtons[index].classList.contains('active')) {
                tabButtons[index].classList.remove('active');
                break;
            }
        }
    }
}
btn_zelda.addEventListener('click', async (event) => {
    event.preventDefault();
    clearMainContent();
    title.innerText = 'Zelda';
    Zelda.loadFormulario();
    Comum.removeManutencao();
});

btn_clear.addEventListener('click', (event) => {
    event.preventDefault();
    title.innerText = 'Treinamento em Teste de API';
    clearMainContent();
});

function clearMainContent() {
    mainContent.innerHTML = '';
    resultsContainer.innerHTML = '';
}


