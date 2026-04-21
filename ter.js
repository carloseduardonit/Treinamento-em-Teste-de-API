const btn_starWars = document.getElementById('StarWars');
const btn_zelda = document.getElementById('Zelda');
const btn_clear = document.getElementById('clear');
const btn_home =document.getElementById('Home');
const title = document.querySelector('title');
const h1Title = document.querySelector('h1#title');
const mainContent = document.querySelector('main');
const resultsContainer = document.getElementById('results-container');
const titulo2Resultado = document.getElementById('Resultados');
const nav = document.querySelector('p#pix');
const ePIX = document.getElementById("ePIX");
const icone_btn = document.getElementById('icone');
let exibir =true;
btn_home.addEventListener('click',(event) =>{
    mainContent.innerText ="Bem-vindo ao treinamento em teste de API! Este ambiente foi projetado para ajudá-lo a aprender e praticar suas habilidades de teste de API usando Postman. Aqui, você pode explorar diferentes cenários de teste, criar suas próprias coleções e validar as respostas das APIs. Sinta-se à vontade para experimentar, aprender e se divertir enquanto aprimora suas habilidades de teste de API!";
    resultsContainer.innerText="";
});
ePIX.addEventListener('mouseenter', (event) => {
    event.preventDefault();
    Comum.emitirSom();
    if (nav.innerText === `` && exibir) {
        nav.innerText = `Faz um 0,50 ou menos pix aí, é quase graça!😃☕`;
        nav.style.color = 'red';
        nav.style.fontWeight = 'bold';
        nav.style.alignSelf = 'center';
    }
})
ePIX.addEventListener('mouseleave', (event) => {
    event.preventDefault();
    Comum.emitirSom();
    
    if (nav.innerText!==``&& exibir) {
        alert(nav.innerText);
        nav.innerText = "";
    }
})

btn_starWars.addEventListener('click', (event) => {
    event.preventDefault();
    clearMainContent();
    title.innerText = 'Star Wars';
    h1Title.innerText = 'Treinamento em Teste de API: Star Wars';
    console.log('Star Wars');
    mainContent.innerHTML = '<h2>Star Wars</h2><p>Bem-vindo ao universo de Star Wars!</p>';
    StarWars.loadFormulario();
    Comum.removeManutencao();
});
class Comum {
    constructor() { }
    static emitirSom() {
        const audio = document.getElementById('audio');
        if (audio.paused) {
            audio.play();
        }
    }
    static mutarAudio() {
        const audio = document.getElementById('audio');
        console.log("Áudio mutado:", audio.muted);
        audio.muted = !audio.muted;
        icone_btn.src = !audio.muted ? 'https://img.icons8.com/?size=30&id=kYZq65E0jeQG&format=png&color=000000' : 'https://img.icons8.com/?size=30&id=TRIthknYBFHG&format=png&color=000000';
    }
    static exibirTela(){
        const icone2 = document.getElementById('icone2');
        exibir = !exibir;
        console.log("Exibir tela:", exibir);
        icone2.src = exibir ? 'https://img.icons8.com/?size=30&id=67343&format=png&color=000000' : 'https://img.icons8.com/?size=30&id=67386&format=png&color=000000';
    }
    static colacaremManutencao() {
        if (!document.getElementsByClassName('star-wars-gif')[0]) {
            const img = document.createElement('img');
            img.className = 'star-wars-gif';
            img.style.maxWidth = '25%';
            img.style.maxHeight = '25%';
            img.style.marginLeft = 'auto';
            img.style.marginRight = 'auto';
            img.style.display = 'block';
            img.src = 'Img/EmManutencao.png';
            img.alt = 'Em Manutenção';
            resultsContainer.appendChild(img);
        }
    }
    static removeManutencao() {
        if (document.getElementsByClassName('star-wars-gif')[0]) {
            const starWarsGif = document.getElementsByClassName('star-wars-gif')[0];
            starWarsGif.remove();
        }
    }
    static exibeTab(objeto, tipo) {
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
                titulo2Resultado.innerText = `Resultado de ${tipo}:`;
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
    h1Title.innerText = 'Treinamento em Teste de API: Zelda';
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


