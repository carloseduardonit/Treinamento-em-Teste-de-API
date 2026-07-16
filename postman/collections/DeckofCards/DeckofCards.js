const base_url = "https://deckofcardsapi.com/api/deck/new/shuffle/";
let deck_id = "";
let baralhos = {};
let isFlipped = false;
class DeckofCards {

    constructor(parameters) {

    }
    static removaAtivos() {
        Comum.removaAtivos();
    }
    static async embaralheCartas(quantidadesBaralhos ) {
        if (quantidadesBaralhos <= 0) {
            throw new Error("Erro no metodo embaralheCartas() a quatidade de baralho e igual ou menos do que Zero!!");
            return [];
        }
        if (deck_id !== "") {
            console.log("Já existe um baralho criado, utilizando o mesmo ID: ", deck_id);
            return baralhos;
        }
        const url = `${base_url}?deck_count=${quantidadesBaralhos}`;
        console.log("URL: ", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Erro no metodo embaralheCartas()");
                return [];
            }
            const data = await response.json();
            deck_id = data.deck_id;
            const baralho = {
                status: data.success,
                quantidades_baralhos: quantidadesBaralhos === 1 ? `${quantidadesBaralhos} baralho` : `${quantidadesBaralhos} baralhos`,
                id: deck_id,
                embaralhado: data.shuffled ? "Foi embaralhado" : "Não foi embaralhado",
                restante: data.remaining > 1 ? `${data.remaining} cartas` : `${data.remaining} carta` || ""
            }
            baralhos = { "baralho": baralho };
            console.log("Resultado do Embaralha cartas: ", baralho);
            return baralhos;
        } catch (error) {
            console.log("Erro no metodo EmbaralheCartas(): ", error);
            return [];
        }
    }
    static resultadoCartas(Cartas) {
        resultsContainer.innerHTML = "";
        if (!Cartas || !Cartas.baralho) {
            console.log("Erro no metodo resultadoCartas() o resultado do embaralhamento e invalido!!");
            return;
        }
        if (document.querySelector(".tabela")) {
            document.querySelector(".tabela").remove();
        }
        const tabela = document.createElement("table");
        tabela.classList.add("tabela");
        tabela.innerHTML = `<tr>
            <th>Carta</th>
            <th>Informações</th>
        </tr>
        `;
        tabela.innerHTML += `<tr >
        <td rowspan = 5><img with= 50% src="https://deckofcardsapi.com/static/img/back.png"/></td>
        </tr>
        <tr><td><strong>ID do baralho:</strong> \n${Cartas.baralho.id}</td></tr>
        <tr><td><strong>Qual a quantidade de baralho?</strong> \n${Cartas.baralho.quantidades_baralhos}</td></tr>
        <tr><td><strong>Já foi embaralhado?</strong> \n${Cartas.baralho.embaralhado}</td></tr>
        <tr><td><strong>Qual a quantidade de carta restante?</strong> \n${Cartas.baralho.restante}</td></tr>
        `;
        resultsContainer.appendChild(tabela);
    }
    static async exibeFormulario() {
        this.loadBotao();
        this.exibeTab("EmbaralharCarta");
    }
    static async exibeTab(tab) {
        Comum.exibeTab(this, tab);
        switch (tab) {
            case "EmbaralharCarta":
            if (deck_id === "") { this.resultadoCartas(await this.embaralheCartas()); }
            break;
            case "CompreCarta":
                this.resultadoCartas(await this.embaralheCartas());
                break;
            case "Documentacao":
                this.exibeDocumentacao();
                break;
        }
    }
    static loadBotao() {
        mainContent.innerHTML = '1';
        const divisao = document.createElement('div');
        divisao.setAttribute('id', 'tabs');
        divisao.innerHTML = `
        <button class="tab-button" data-tab="EmbaralharCarta" onclick="DeckofCards.exibeTab('EmbaralharCarta')">Embaralhar a cartas</button>
        <button class="tab-button" data-tab="CompreCarta" onclick="DeckofCards.exibeTab('CompreCarta')">Compre uma carta</button>
        <button class="tab-button" data-tab="Embaralheascartas" onclick="DeckofCards.exibeTab('Embaralheascartas')">Embaralhe as cartas</button>
        <button class="tab-button active" data-tab="Documentacao" onclick="DeckofCards.exibeTab('Documentacao')">Documentação</button>`
        mainContent.innerHTML = ``;
        mainContent.appendChild(divisao);
    }

    
    static exibeDocumentacao() {
        resultsContainer.innerHTML = `<h2>Documentação da API Deck of Cards</h2>
        <p>A API Deck of Cards é uma API RESTful que permite criar, embaralhar e comprar cartas de baralho. Ela é baseada em um baralho padrão de 52 cartas, mas também suporta baralhos personalizados e múltiplos baralhos.</p>
        <h3>Endpoints</h3>
        <ul>
            <li><strong>/api/deck/new/shuffle/</strong>: Cria um novo baralho embaralhado. Aceita um parâmetro opcional <code>deck_count</code> para especificar o número de baralhos a serem criados.</li>
            <li><strong>/api/deck/{deck_id}/draw/</strong>: Compra cartas do baralho especificado por <code>deck_id</code>. Aceita um parâmetro obrigatório <code>count</code> para especificar o número de cartas a serem compradas.</li>
            <li><strong>/api/deck/{deck_id}/shuffle/</strong>: Embaralha o baralho especificado por <code>deck_id</code>.</li>
        </ul>
        `;
    }







    static flipCard() {
        const card = document.querySelector('.card-3d');
        card.classList.toggle('flipped');
    }
    // Ou com estado explícito: 

    static flip() {
        isFlipped = !isFlipped;
        card.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }
}