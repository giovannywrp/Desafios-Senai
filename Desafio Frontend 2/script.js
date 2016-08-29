// ESCREVA AQUI AMIGUINHO! :)

document.body.onload = lerJSON();

var index;

function mudarTab(tab1, tab1Content, tab2, tab2Content) {
    var tab1, tab1Content, tab2, tab2Content;

    tab1 = document.getElementById(tab1);
    tab1.className = "active";
    tab1Content = document.getElementById(tab1Content);
    tab1Content.className = "active";
    tab2 = document.getElementById(tab2);
    tab2.className = "none";
    tab2Content = document.getElementById(tab2Content);
    tab2Content.className = "none";

}

function contarLetras(texto, contador, limite) {
    


    var contador = document.getElementById(contador);
    texto.maxLength = limite;

    if (texto.value.length <= limite){
        contador.innerHTML = limite - texto.value.length;
    }
    if(texto.maxLength == texto.value.length){
        document.getElementById("erro").innerHTML = "Chegou no limite FERA!!";
    }else{
        document.getElementById("erro").innerHTML = "";
    }

    
}

function lerJSON() {

    var URL_TO_FETCH = "tarefas.json";

    fetch(URL_TO_FETCH)
        .then(function (response) {
            response.json().then(function (json) {
                var i;

                for (i = 0; i < json.tarefas.length; i++) {
                    if (json.tarefas[i].feito == 0) {
                        criarElemento("ulnaoFeitas", json.tarefas[i].descricao, "0", json.tarefas[i].id, "naoFeita");
                    } else {
                        criarElemento("ulfeitas", json.tarefas[i].descricao, "1", json.tarefas[i].id, "feita");
                        document.getElementById("tarefa["+json.tarefas[i].id+"][feita]").checked = true;
                    }
                }
                index = i;
                console.log(json.tarefas);
            });
        })
        .catch(function (err) {
            console.error('Failed retrieving information', err);
        });

}

function escreverJSON() {

    var url = "tarefas.json";
    var formulario = document.getElementById("formAdicionarTarefa");
    var tarefa = {"id" : index+1, "descricao" : index+1+" "+ formulario.elements[0].value, "feito" : 0};
    JSON.stringify(tarefa);

    fetch(url)
        .then(function (response) {
            response.json().then(function (json) {

                json.tarefas[index] = tarefa;
                criarElemento("ulnaoFeitas", json.tarefas[index].descricao, "0", json.tarefas[index].id, "naoFeita");
                console.log(json.tarefas);
                index++;

            });
        })
        .catch(function (err) {
            console.error('falha em cadastrar uma nova tarefa', err);
        });

}

function atualizarJSON(checkbox) {

    var url = "tarefas.json";

    fetch(url)
        .then(function (response) {
            response.json().then(function (json) {
                if (checkbox.checked == true){
                    var ul = document.getElementById("ulfeitas");
                    var label = checkbox.parentElement;
                    var li = label.parentElement;
                    var i;

                    i = label.innerText.charAt(1);

                    checkbox.setAttribute("value",1);
                    checkbox.setAttribute("id", "tarefa["+i+"][feita]");

                    json.tarefas[i-1].feito = 1;

                    ul.appendChild(li);
                }else {
                    var ul = document.getElementById("ulnaoFeitas");
                    var label = checkbox.parentElement;
                    var li = label.parentElement;
                    var i;

                    i = label.innerText.charAt(1);

                    checkbox.setAttribute("value",0);
                    checkbox.setAttribute("id", "tarefa["+i+"][naoFeita]");

                    json.tarefas[i-1].feito = 0;

                    ul.appendChild(li);
                }

                console.log(json.tarefas);
            });
        })
        .catch(function (err) {
            console.error('falha ao atualizar uma tarefa', err);
        });
}

function deletarJSON(botao) {

    var url = "tarefas.json";

    fetch(url)
        .then(function (response) {
            response.json().then(function (json) {


                var label = botao.parentElement;
                var li = label.parentElement;
                var ul = li.parentElement;
                var i;

                i = label.innerText.charAt(1);

                ul.removeChild(li);

                delete json.tarefas[i-1];

                console.log(json.tarefas);
            });
        })
        .catch(function (err) {
            console.error('falha em deletar uma  tarefa', err);
        });

}

function criarElemento(ul, texto, value, id, status) {

    var ul = document.getElementById(ul);
    var li = document.createElement("li");
    var label = document.createElement("label");
    var input = document.createElement("input");
    var p = document.createElement("p");
    var a = document.createElement("a");
    input.setAttribute("type", "checkbox");
    input.setAttribute("onclick", "atualizarJSON(this)");
    input.setAttribute("id", "tarefa["+id+"]["+status+"]");
    input.setAttribute("value", value);
    p.innerHTML = texto;
    a.setAttribute("href","#");
    a.setAttribute("onclick", "deletarJSON(this)");
    a.setAttribute("title","×");
    a.innerHTML = "×";
    label.appendChild(input);
    label.appendChild(p);
    label.appendChild(a);
    li.appendChild(label);
    ul.appendChild(li);
}
