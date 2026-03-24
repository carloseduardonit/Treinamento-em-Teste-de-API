
   
class jogos {
    
    constructor(parameters) {
    
    }
    
   static async getJogoByName(name) {
        return fetch(`https://zelda.fanapis.com/api/games?name=${encodeURIComponent(name)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados recebidos:", data.data[0]);

                return data.data[0];
            })
            .catch(error => {
                console.error("Erro ao buscar jogos:", error);
                return [];
            });
    }
    
    static async getJogoByID(id) {
        const url = `https://zelda.fanapis.com/api/games/${encodeURIComponent(id)}`;
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log("Dados recebidos:", responseJson);
            const data = responseJson.data;
            return data;
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
            return [];
        }
    }

    static async getJogos() {
        const url = 'https://zelda.fanapis.com/api/games';
        console.log("URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log("Dados recebidos:", responseJson);
            const data = responseJson.data;
            return data;
        } catch (error) {
            console.error("Erro ao buscar jogos:", error);
            return [];
        }
    }


}