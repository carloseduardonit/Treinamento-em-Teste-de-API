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
    constructor(parameters) {

    }
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


