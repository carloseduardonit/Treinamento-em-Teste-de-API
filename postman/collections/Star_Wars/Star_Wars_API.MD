# Estudo no The Star Wars API

![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white) ![Insomnmia](https://img.shields.io/badge/Insomnia-4000BF.svg?style=for-the-badge&logo=Insomnia&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=white) ![JSON](https://img.shields.io/badge/JSON-000000.svg?style=for-the-badge&logo=JSON&logoColor=white) ![curl](https://img.shields.io/badge/curl-073551.svg?style=for-the-badge&logo=curl&logoColor=white) ![Markdown](https://img.shields.io/badge/Markdown-000000.svg?style=for-the-badge&logo=Markdown&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white)

Ir para Readme.md do projeto principal: [Meu treinamento de teste de API](../../Readme.md)

---

## Descrição do Projeto
Este projeto tem como objetivo testar a Star Wars API (SWAPI) utilizando o Postman. A coleção de testes inclui diversas requisições para verificar a funcionalidade e a integridade da API, garantindo que os endpoints estejam respondendo corretamente e que os dados retornados estejam de acordo com as expectativas.

---
<details open>
<summary>

## Estrutura da Coleção de Testes

</summary>
A coleção de testes para a Star Wars API está organizada da seguinte forma:

- 0. ⏳ [Configurações Iniciais](#0-configurações-iniciais)
  - 0.1 [Configurações do Postman](#01-configurações-do-postman)
- 1. ⏳ [Raiz da API](#1-raiz)
- 2. ⏳ [Pessoas](#2-pessoas)
- 3. ⏳ [Filmes](#3-filmes)
- 4. ⏳ [Naves espaciais](#4-naves-espaciais)
- 5. ⏳ [Veículos](#5-veículos)
- 6. ⏳ [Espécies](#6-espécies)
- 7. ⏳ [Planetas](#7-planetas)
- 8. ⏳ [Bibliografia](#bibliografia)
</details>

---

[Topo](#estudo-no-the-star-wars-api)

## Legendas

- [⏳]  Aguardando teste ou desenvolvimento
- [❌]  Teste falho ou impedimento para realizar o teste
- [⚙️]  Teste ou Desenvolvimento em andamento
- [✅] Teste concluído

---

[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 0. Configurações Iniciais
</summary>

</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 1 Raiz
</summary>

#### 1.1 Obter as URLs dos endpoints da API

###### URL:

``` url
  GET https://swapi.dev/api/
```
###### Script de teste de Post-response:

- Implementação do codigo para o teste de API:
```javascript
  pm.test("Verifica a estrutura da resposta", () => {
    pm.expect(pm.response.json()).to.be.an("object");
    pm.expect(pm.response.json()).to.have.property("people");
    pm.expect(pm.response.json()).to.have.property("planets");
    pm.expect(pm.response.json()).to.have.property("films");
    pm.expect(pm.response.json()).to.have.property("species");
    pm.expect(pm.response.json()).to.have.property("vehicles");
    pm.expect(pm.response.json()).to.have.property("starships");
  });

  pm.test("Verifica se os valores das propriedades são URLs válidas", () => {
    console.clear();
    const responseJson = pm.response.json();
    const properties = ["people", "planets", "films", "species", "vehicles", "starships"];
    for (let property of properties) {
      var url = responseJson[property];
      pm.expect(url).to.match(/^https:\/\/swapi\.dev\/api\/[^\/]+\/$/);
      console.log(url)
      pm.environment.set(property, responseJson[property]);
    }
  });

  pm.test("Verifica o status code é 200", () => {
    pm.response.to.have.status(200);
  });
```

- Payload de visualização personalizado para exibir os dados dos funcionários em uma tabela formatada.

``` html
```

##### resultado esperado:
- A resposta deve conter um objeto JSON com as seguintes propriedades: "people", "planets", "films", "species", "vehicles" e "starships".
- Cada propriedade deve conter uma URL válida que aponta para o endpoint correspondente da API.
- O status code da resposta deve ser 200, indicando que a requisição foi bem-sucedida.

</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 2 Pessoas
</summary>
</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 3. Filmes
</summary>
</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 4. Naves espaciais
</summary>
</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 5 Veículos
</summary>
</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 6 Espécies
</summary>
</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 7 Planetas
</summary>
</details>

---
[Topo](#estudo-no-the-star-wars-api)


## Bibliografia:
- [Documentação Oficial da The Star Wars API](https://swapi.dev/documentation)
- [Postman Learning Center](https://learning.postman.com/docs/getting-started/introduction)
