# [Estudo no The Star Wars API](https://github.com/carloseduardonit/Treinamento-em-Teste-de-API/blob/master/postman/collections/Star_Wars/Star_Wars_API.MD)

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

- ⏳ [0. Configurações Iniciais](#0-configurações-iniciais)
  - ⏳ [0.1 Configurações do Postman](#01-configurações-do-postman)
- ⏳ [1. Raiz da API](#1-raiz)
- ⏳ [2. Pessoas](#2-pessoas)
- ⏳ [3. Filmes](#3-filmes)
- ⏳ [4. Naves espaciais](#4-naves-espaciais)
- ⏳ [5. Veículos](#5-veículos)
- ⏳ [6. Espécies](#6-espécies)
- ⏳ [7. Planetas](#7-planetas)
- ⏳ [8. Bibliografia](#bibliografia)
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

- documentação do Raiz: [Root](https://swapi.dev/documentation#root)

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

#### 2.1 Obter lista de todas pessoas

###### URL:

``` url
  GET https://swapi.dev/api/people/
```

###### Script de teste de Post-response:

- Implementação do codigo para o teste de API:
```javascript
  var responseJson = pm.response.json();
  var responseData = responseJson.results;
  var person = responseData[0];
  var filmes = person.films;
  var species = person.species;
  var vehicles = person.vehicles;
  var starships = person.starships;
  pm.test("Verificar a estrutura do Json da resposta", () => {
    pm.expect(responseJson).to.have.property("count");
    pm.expect(responseJson).to.have.property("next");
    pm.expect(responseJson).to.have.property("previous");
    pm.expect(responseJson).to.have.property("results");
    pm.expect(responseData).to.be.an("array")    
    pm.expect(person).to.have.property("name")
    pm.expect(person).to.have.property("height")
    pm.expect(person).to.have.property("mass")
    pm.expect(person).to.have.property("hair_color")
    pm.expect(person).to.have.property("skin_color")
    pm.expect(person).to.have.property("eye_color")
    pm.expect(person).to.have.property("birth_year")
    pm.expect(person).to.have.property("gender")
    pm.expect(person).to.have.property("homeworld")
    pm.expect(person).to.have.property("created");
    pm.expect(person).to.have.property("edited");
    pm.expect(person).to.have.property("url");
    pm.expect(filmes).to.be.an("array");
    pm.expect(species).to.be.an("array");
    pm.expect(vehicles).to.be.an("array");
    pm.expect(starships).to.be.an("array");
  });
  pm.test("Verificar se o nome do personagem é Luke Skywalker", () => {
    pm.expect(person.name).to.equal("Luke Skywalker");
  });
  pm.test("Verificar se a altura do personagem é 172", () => 	{
    pm.expect(person.height).to.equal("172");
    var height = parseInt(person.height);
    // Verifica se a altura está entre 170 e 180 cm.
    pm.expect(height).to.be.at.least(170);
    pm.expect(height).to.be.at.most(180);
  });
  pm.test("Verificar se o peso do personagem é 77", () => {
    pm.expect(person.mass).to.equal("77");
    var mass = parseInt(person.mass);
    // Verifica se o peso está entre 70 e 80 kg.
    pm.expect(mass).to.be.at.least(70);
    pm.expect(mass).to.be.at.most(80);
  });
  pm.test("Verificar se o cabelo é 'blond'", () => {
    pm.expect(person.hair_color).to.not.be.null
    pm.expect(person.hair_color).to.be.not.undefined
    pm.expect(person.hair_color).to.be.not.empty
    pm.expect(person.hair_color).to.be.a('string')
    pm.expect(person.hair_color).to.equal("blond");
  });
  pm.test("Verificar se a pele é 'fair'", () => {
    pm.expect(person.skin_color).to.be.not.null
    pm.expect(person.skin_color).to.be.not.undefined
    pm.expect(person.skin_color).to.be.not.empty
    pm.expect(person.skin_color).to.be.a('string')
    pm.expect(person.skin_color).to.equal("fair");
  });
  pm.test("Verificar se o olho é 'blue'", () => {
    pm.expect(person.eye_color).to.be.not.null
    pm.expect(person.eye_color).to.be.not.undefined
    pm.expect(person.eye_color).to.be.not.empty
    pm.expect(person.eye_color).to.be.a('string')
    pm.expect(person.eye_color).to.equal("blue");
  });
  pm.test("Verificar se o ano de aniversario é '19BBY'", () => {
    pm.expect(person.birth_year).to.be.not.null
    pm.expect(person.birth_year).to.be.not.undefined
    pm.expect(person.birth_year).to.be.not.empty
    pm.expect(person.birth_year).to.be.a('string')
    pm.expect(person.birth_year).to.equal("19BBY");
  });
  pm.test("Verificar se o genero é 'male'", () => {
    pm.expect(person.gender).to.be.not.null
    pm.expect(person.gender).to.be.not.undefined
    pm.expect(person.gender).to.be.not.empty
    pm.expect(person.gender).to.be.a('string')
    pm.expect(person.gender).to.equal("male");
    pm.expect(person.gender).to.not.equal("female")
    pm.expect(person.gender).to.not.equal("n/a")
  });
  var urlPlaneta = person.homeworld;
  var planeta = {
    url: urlPlaneta,
    method: "GET" 
  }
  pm.sendRequest(planeta, function (err, response) {
    if(err){
      console.log(err);
    } else {
      var responseJsonPlaneta = response.json();
      console.log(responseJsonPlaneta);
      pm.test("Verificar o nome do planeta é 'Tatooine'", () => {
        pm.expect(responseJsonPlaneta.name).to.equal("Tatooine");
      });
      pm.test("Verificar o periodo da rotação e 23",()=>{
        pm.expect(parseInt(responseJsonPlaneta.rotation_period)).to.equal(23);
      });
      pm.test("Verificar o periodo orbital do planeta é 304",()=>{
        pm.expect(parseInt(responseJsonPlaneta.orbital_period)).to.equal(304);
      });
      pm.test("Verificar o diametro do planeta é 10465",()=>{
        pm.expect(parseInt(responseJsonPlaneta.diameter)).to.equal(10465);
      });
      pm.test("Verificar o Clima do planeta é 'arid'",()=>{
        pm.expect(responseJsonPlaneta.climate).to.equal("arid");	
      });
      pm.test("Verificar a gravidade do planeta é '1 standard'",()=>{
        pm.expect(responseJsonPlaneta.gravity).to.equal("1 standard");	
      });
      pm.test("Verificar o terreno do planeta é 'desert'",()=>{
        pm.expect(responseJsonPlaneta.terrain).to.equal("desert");	
      });
      pm.test("Verificar a superficie da agua do planeta é 1",()=>{
        pm.expect(parseInt(responseJsonPlaneta.surface_water)).to.equal(1);	
      });
      pm.test("Verificar a população do planeta é 200000",()=>{
        var populacao = parseInt(responseJsonPlaneta.population)
        pm.expect(populacao).to.equal(200000);	
        pm.expect(populacao).to.be.at.least(100000);	
        pm.expect(populacao).to.be.at.most(300000);	
      });
      pm.test("Verificar a url do planeta",()=>{
        pm.expect(responseJsonPlaneta.url).to.equal(urlPlaneta);	
      });
    }
  });
  if(filmes.length > 0){	
    var urlFilme = filmes[0];
    var filme = {
      url: urlFilme,
      method: 'GET'
    }
    pm.sendRequest(filme, function (err, response) {
      if(err){
        console.log(err)
      } else {
        var responseJsonFilme = response.json();

        pm.test("Verificar o titulo do filme é 'A New Hope'", () => {
          pm.expect(responseJsonFilme.title).to.equal("A New Hope");
        });
        pm.test("Verificar se o episode do filme é 4",()=>{
          pm.expect(responseJsonFilme.episode_id).to.equal(4);
        });
        pm.test("Verificar a descrição do filme contem 'managed to steal secret'",()=>{
          pm.expect(responseJsonFilme.opening_crawl).to.include("managed to steal secret");
        });
        pm.test("Verificar o diretor do filme é 'George Lucas'",()=>{
          pm.expect(responseJsonFilme.director).to.equal("George Lucas");	
        });
        pm.test("Verificar o produtor do filme é 'Gary Kurtz'",()=>{
          pm.expect(responseJsonFilme.producer).to.include("Gary Kurtz");
          pm.expect(responseJsonFilme.producer).to.equal("Gary Kurtz, Rick McCallum")		
        });
        pm.test("Verificar a data de lançamento do filme é '1977-05-25'",()=>{
          pm.expect(responseJsonFilme.release_date).to.equal("1977-05-25");
          var ano = responseJsonFilme.release_date.split('-')[0];
          var mes = responseJsonFilme.release_date.split('-')[1];
          var dia = responseJsonFilme.release_date.split('-')[2];
          console.log(dia +"/"+mes+"/"+ano)
        });
      }
    });
  } else {
    console.log("Não há filmes associados a este personagem");	
  }
  if(species.length > 0){
    var urlEspecie = species[0];
    var especie = {
      url: urlEspecie,
      method: 'GET'
      }
      pm.sendRequest(especie, function (err, response) {
        if(err){console.log(err);
        } else{ console.log(response.json());}
      });
  } else {
    console.log("Não há espécies associadas a este personagem");	
  }

  if(vehicles.length>0){
    var urlVeiculo = vehicles[0];
    var veiculo = {
      url: urlVeiculo,
      method: "GET"
    }
    pm.sendRequest(veiculo, function (err, response) {
      if(err){
        console.log(err)
      } else{
        var veiculoJson = response.json();
        pm.test	("Verificar se o nome do veiculo é 'Snowspeeder'", () => {
          pm.expect(veiculoJson.name).to.equal("Snowspeeder");
        });
        pm.test("Verificar se o modelo do veiculo é 't-47 airspeeder'",()=>{
          pm.expect(veiculoJson.model).to.equal("t-47 airspeeder");
        });
        pm.test("Verificar se o fabricante do veiculo é 'Incom corporation'", () => {
          pm.expect(veiculoJson.manufacturer).to.equal("Incom corporation");
        });
        pm.test("Verificar se o comprimento do veiculo é '4.5'", () => {	
          pm.expect(veiculoJson.length).to.equal("4.5", "na string");
          pm.expect(parseFloat(veiculoJson.length)).to.equal(4.5,"no float");
          });
        pm.test("Verificar se numero de equipe é 2",()=>{
          pm.expect(veiculoJson.crew).to.equal("2");	
        });
        pm.test("Verificar se a capacidade de carga do veiculo é '10'", () => {
          pm.expect(veiculoJson.cargo_capacity).to.equal("10");
          });
        pm.test("Verificar se o combustivel é 'none'",()=>{
          pm.expect(veiculoJson.consumables).to.equal("none");	
        });
        pm.test("Verificar se o custo do veiculo é 'unknown'",()=>{
          pm.expect(veiculoJson.cost_in_credits).to.equal("unknown");
        });
        pm.test("Verificar se a velocidade maxima do veiculo é '650'", () => {
          pm.expect(veiculoJson.max_atmosphering_speed).to.equal("650");
        });
        pm.test("Verificar se a capacidade de passageiros do veiculo é '0'", () => {
          pm.expect(veiculoJson.passengers).to.equal("0");
        });
        pm.test("Verificar se o veiculo é usado para combate", () => {
          pm.expect(veiculoJson.vehicle_class).to.equal("airspeeder");
        });	
      }
    });
  } else {
    console.log("Não há veículos associados a este personagem.")
  }
  if(starships.length>0){
    var urlNave = starships[0];
    var nave = {
      url: urlNave,
      method: "GET"
    };
    pm.sendRequest(nave, function (err, response) {
      if(err){
        console.log(err)
      }else{
        var naveJson = response.json();
        pm.test("Verificar se o nome da nave é 'X-wing'", () => {
          pm.expect(naveJson.name).to.equal("X-wing");
        });
        pm.test("Verificar se o modelo da nave é 'T-65 x-wing'", () => {
          pm.expect(naveJson.model).to.equal("T-65 X-wing");
        });
        pm.test("Verificar se o fabricante da nave é 'Incom Corporation'", () => {	
          pm.expect(naveJson.manufacturer).to.equal("Incom Corporation");
        });
        pm.test("Verificar se o custo da nave é '149999'",()=>{
          pm.expect(naveJson.cost_in_credits).to.equal("149999");
        });
        pm.test("Verificar se o comprimento da nave é '12.5'", () => {
          pm.expect(naveJson.length).to.equal("12.5");
        });
        pm.test("Verificar se a velocidade máxima da nave é '1050'", () => {
          pm.expect(naveJson.max_atmosphering_speed).to.equal("1050");
        });
        pm.test("Verificar se a capacidade de tripulação da nave é '1'", () => {
          pm.expect(naveJson.crew).to.equal("1");
        });
        pm.test("Verificar se a capacidade de passageiros da nave é '0'", () => {
          pm.expect(naveJson.passengers).to.equal("0");
        });
        pm.test("Verificar se a capacidade de carga da nave é '110'", () => {
          pm.expect(naveJson.cargo_capacity).to.equal("110");
        });
        pm.test("Verificar se os consumíveis da nave são '1 week'", () => {
          pm.expect(naveJson.consumables).to.equal("1 week");	
        });
        pm.test("Verificar a classificação do hiperdrive da nave é '1.0'",()=>{
          pm.expect(naveJson.hyperdrive_rating).to.equal("1.0");
        });
        pm.test("Verificar o MGLT da nave é '100'",()=>{
          pm.expect(naveJson.MGLT).to.equal("100");	
        });
        pm.test("Verificar se a nave é usada para combate", () => {
          pm.expect(naveJson.starship_class).to.equal("Starfighter");
        });
      }
    });
  } else {
    console.log("Não há naves associadas a este personagem.")	
  }
```

- Payload de visualização personalizado para exibir os dados dos funcionários em uma tabela formatada.

``` html
```

##### resultado esperado:
- A resposta deve conter um objeto JSON com uma propriedade "results" que é um array de objetos, cada um representando uma pessoa.
- Cada objeto de pessoa deve conter as seguintes propriedades: "name", "height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender", "homeworld", "films", "species", "vehicles", "starships", "created", "edited", "url".
- O status code da resposta deve ser 200, indicando que a requisição foi bem-sucedida.

</details>

---
[Topo](#estudo-no-the-star-wars-api)

<details open>
<summary>

### 3. Filmes
</summary>

##### URL:

``` url
  GET https://swapi.dev/api/films/
```
#### 3.1 Obter lista de todos filmes

###### Script de teste de Post-response:

- Implementação do codigo para o teste de API:
```javascript
```


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
