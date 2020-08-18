class SiteController {

    constructor() {

        this.btnSearchEl = document.querySelector("#btn-search");
        this.errorEl = document.querySelector("#error");
        this.itensSearchEl = document.querySelector(".items-search");
        this.displayItemsEl = document.querySelector(".display-items");
        this.initEvents();

    }

    initEvents(){

        this.btnSearchEl.addEventListener('click', evt => {

            evt.preventDefault();

            let cep = document.querySelector("#input-cep");

            this.searchCep(cep.value);

        });

        document.querySelectorAll(".btn-back").forEach(btn =>
            btn.addEventListener('click', evt => {
                this.displayItemsEl.style.display = "none";
                this.errorEl.style.display = "none";
                this.itensSearchEl.style.display = "block";

            })
        );



    }

    searchCep(cep){
        cep = cep.replace('-', '')

        if (cep === ""){
            return false;
        }

        fetch("https://cors-anywhere.herokuapp.com/viacep.com.br/ws/"+ cep + "/json")
            .then(response => response.json())
            .then(data => {
                let streetName = data['logradouro'];
                let neighborhood = data['bairro'];
                let city = data['localidade'];
                let state = data['uf'];

                if (streetName === undefined){
                    throw new Error();
                }

                document.querySelector("#street").innerHTML = "Localidade: " + streetName;
                document.querySelector("#neighborhood").innerHTML = "Bairro: " + neighborhood;
                document.querySelector("#city").innerHTML = "Cidade: " + city;
                document.querySelector("#state").innerHTML = "Estado: " + state;
                this.itensSearchEl.style.display = "none";
                this.displayItemsEl.style.display = "block";
            })
            .catch(err => {
                document.querySelector("#error-item").innerHTML = "Cep incorreto!";
                this.itensSearchEl.style.display = "none";
                this.errorEl.style.display = "block";
            })


    }

}