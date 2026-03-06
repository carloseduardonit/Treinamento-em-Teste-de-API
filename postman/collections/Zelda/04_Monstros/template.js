var template = 
`<style>
    .container{
        display: flex;
        flex-direction: column;
    }
</style>
<div class="container">
    <h1>Obter personagens</h1>
    <div class="card">
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
            {{#each data}}
            <tr>
                <td>{{id}}</td>
                <td>{{nome}}</td>
                <td>{{descrição}}</td>
            </tr>
            {{/each}}
        </table>
    </div>
</div>
`;

function constructVisualizerPayload(){
    var data = JSON.parse(pm.response.text());
    return {
        template: template,
        data: data
    }
}