class SiteController {

    //Método construtor
    constructor() {

        /*Capturando elementos*/
        this.btnSearchEl = document.querySelector("#btn-search");
        this.errorEl = document.querySelector("#error");
        this.itensSearchEl = document.querySelector(".items-search");
        this.displayItemsEl = document.querySelector(".display-items");
        this.initEvents();

    }

    //Inicialização de eventos
    initEvents(){

        //Relacionando uma atividade ao botão de search
        this.btnSearchEl.addEventListener('click', evt => {
            //Impedindo o refresh do site
            evt.preventDefault();
            //Capturando o valor digitado no input
            let cep = document.querySelector("#input-cep");
            //Chamando a função que busca o cep
            this.searchCep(cep.value);
        });

        //Relacionando uma atividade ao botão de voltar
        document.querySelectorAll(".btn-back").forEach(btn =>
            btn.addEventListener('click', evt => {
                //Aqui será ocultado os resultados passando a mostrar apenas o fomulário de search
                this.displayItemsEl.style.display = "none";
                this.errorEl.style.display = "none";
                this.itensSearchEl.style.display = "block";
            })
        );
    }

    //Função de busca, recebe o CEP via parâmetro
    searchCep(cep){
        //substitui o traço do cep caso tenha sido digitado por vázio
        cep = cep.replace('-', '')
        //Caso o cep seja inexistente, retornar um alert.
        if (cep === ""){
            alert("Digite um cep, por favor");
            return;
        }

        //Promisse para realizar a busca via API
        fetch("https://cors-anywhere.herokuapp.com/viacep.com.br/ws/"+ cep + "/json")
            .then(response => response.json())
            .then(data => {
                //Salvando os valores recebidos via API em variáveis temporárias
                let streetName = data['logradouro'];
                let neighborhood = data['bairro'];
                let city = data['localidade'];
                let state = data['uf'];

                //Caso a API tenha retornado um valor indefinido, forçar um erro
                if (streetName === undefined || neighborhood === undefined || city === undefined || state === undefined){
                    throw new Error();
                }

                //Caso tenha passado por todas verificações com sucesso, inserir no html o resultado obtido
                document.querySelector("#street").innerHTML = "Localidade: " + streetName;
                document.querySelector("#neighborhood").innerHTML = "Bairro: " + neighborhood;
                document.querySelector("#city").innerHTML = "Cidade: " + city;
                document.querySelector("#state").innerHTML = "Estado: " + state;

                //Ocultar o fomulário de busca e apresentar a resposta ao usuário
                this.itensSearchEl.style.display = "none";
                this.displayItemsEl.style.display = "block";
            })
            .catch(err => {
                //Caso tenha caído em alguma das verificações apresente um erro na tela para o usuário.
                document.querySelector("#error-item").innerHTML = "Cep incorreto!";
                this.itensSearchEl.style.display = "none";
                this.errorEl.style.display = "block";
            })
    }
}