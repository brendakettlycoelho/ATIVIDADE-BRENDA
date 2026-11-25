var servicos = [
  { nome: "Banho e Tosa", tipo: "Estetica", preco: 60, tempo: "1h30", icone: "🛁" },
  { nome: "Consulta Veterinaria", tipo: "Saude", preco: 120, tempo: "40min", icone: "🩺" },
  { nome: "Hospedagem", tipo: "Hotel", preco: 80, tempo: "1 diaria", icone: "🏠" }
];

var agendamentos = [];

function formatar(valor) {
  return "R$ " + valor.toLocaleString("pt-br", { minimumFractionDigits: 2 });
}

function criarCartao(s) {
  var h = "";
  h += '<div class="col-md-4 mb-4">';
  h += '  <div class="card h-100">';
  h += '    <div class="icone">' + s.icone + '</div>';
  h += '    <div class="card-body">';
  h += '      <span class="badge bg-success">' + s.tipo + '</span>';
  h += '      <h5 class="mt-2">' + s.nome + '</h5>';
  h += '      <p class="text-secondary small">Duracao: ' + s.tempo + '</p>';
  h += '      <p class="valor">' + formatar(s.preco) + '</p>';
  h += '      <a href="#/agendar" class="btn btn-verde btn-sm">Agendar</a>';
  h += '    </div>';
  h += '  </div>';
  h += '</div>';
  return h;
}

function paginaInicio() {
  var h = "";
  h += '<div class="topo">';
  h += '  <h1>Cuidado de verdade pro seu pet</h1>';
  h += '  <p>Banho e tosa, veterinario e hospedagem no mesmo lugar.</p>';
  h += '  <a href="#/servicos" class="btn btn-light">Ver os servicos</a>';
  h += '</div>';
  h += '<div class="container mt-5">';
  h += '  <h2>O que a gente faz</h2>';
  h += '  <p class="text-secondary">Nossos tres servicos.</p>';
  h += '  <div class="row">';
  h += criarCartao(servicos[0]);
  h += criarCartao(servicos[1]);
  h += criarCartao(servicos[2]);
  h += '  </div>';
  h += '</div>';
  return h;
}

function paginaServicos() {
  var h = '<div class="container mt-5">';
  h += '<h2>Nossos servicos</h2>';
  h += '<p class="text-secondary">Procure pelo nome ou filtre pelo tipo.</p>';
  h += '<div class="row mb-4">';
  h += '  <div class="col-md-8 mb-2">';
  h += '    <input type="text" class="form-control" id="procura" placeholder="Procurar" onkeyup="mostrarServicos()">';
  h += '  </div>';
  h += '  <div class="col-md-4 mb-2">';
  h += '    <select class="form-select" id="categoria" onchange="mostrarServicos()">';
  h += '      <option value="todos">Todos</option>';
  h += '      <option value="Estetica">Estetica</option>';
  h += '      <option value="Saude">Saude</option>';
  h += '      <option value="Hotel">Hotel</option>';
  h += '    </select>';
  h += '  </div>';
  h += '</div>';
  h += '<div id="lista"></div>';
  h += '</div>';
  return h;
}

function mostrarServicos() {
  var procura = document.getElementById("procura").value.toLowerCase();
  var categoria = document.getElementById("categoria").value;
  var h = '<div class="row">';
  var contador = 0;

  for (var i = 0; i < servicos.length; i++) {
    var s = servicos[i];
    if (s.nome.toLowerCase().indexOf(procura) >= 0 && (categoria == "todos" || s.tipo == categoria)) {
      h += criarCartao(s);
      contador = contador + 1;
    }
  }

  h += '</div>';

  if (contador == 0) {
    h = '<div class="alert alert-warning">Nenhum servico encontrado.</div>';
  }

  document.getElementById("lista").innerHTML = h;
}

function paginaOrcamento() {
  var h = '<div class="container mt-5">';
  h += '<h2>Monte seu orcamento</h2>';
  h += '<p class="text-secondary">O valor muda conforme o porte do pet.</p>';
  h += '<div class="row">';
  h += '  <div class="col-md-6">';
  h += '    <div class="card p-4">';
  h += '      <label class="form-label">Servico</label>';
  h += '      <select class="form-select mb-3" id="servico">';
  for (var i = 0; i < servicos.length; i++) {
    h += '<option value="' + servicos[i].preco + '">' + servicos[i].nome + '</option>';
  }
  h += '      </select>';
  h += '      <label class="form-label">Porte do pet</label>';
  h += '      <select class="form-select mb-3" id="porte">';
  h += '        <option value="1">Pequeno</option>';
  h += '        <option value="1.3">Medio</option>';
  h += '        <option value="1.6">Grande</option>';
  h += '      </select>';
  h += '      <label class="form-label">Quantas vezes no mes</label>';
  h += '      <input type="number" class="form-control mb-3" id="vezes" value="2" min="1">';
  h += '      <button class="btn btn-verde" onclick="calcularOrcamento()">Calcular</button>';
  h += '    </div>';
  h += '  </div>';
  h += '  <div class="col-md-6 mt-3 mt-md-0"><div id="resultado"></div></div>';
  h += '</div>';
  h += '</div>';
  return h;
}

function calcularOrcamento() {
  var preco = Number(document.getElementById("servico").value);
  var porte = Number(document.getElementById("porte").value);
  var vezes = Number(document.getElementById("vezes").value);

  if (vezes < 1) {
    document.getElementById("resultado").innerHTML = '<div class="alert alert-danger">Coloque pelo menos 1 vez no mes.</div>';
    return;
  }

  var valorVez = preco * porte;
  var total = valorVez * vezes;

  var h = '<div class="card p-4">';
  h += '<h5>Seu orcamento</h5>';
  h += '<p>Valor por atendimento: ' + formatar(valorVez) + '</p>';
  h += '<p>Vezes no mes: ' + vezes + '</p>';
  h += '<h3 class="valor">Total: ' + formatar(total) + '</h3>';
  h += '</div>';

  document.getElementById("resultado").innerHTML = h;
}

function paginaAgendar() {
  var h = '<div class="container mt-5">';
  h += '<h2>Agendar atendimento</h2>';
  h += '<p class="text-secondary">A gente confirma depois pelo WhatsApp.</p>';
  h += '<div class="row">';
  h += '  <div class="col-md-7">';
  h += '    <div class="card p-4">';
  h += '      <label class="form-label">Seu nome</label>';
  h += '      <input type="text" class="form-control mb-3" id="dono">';
  h += '      <label class="form-label">Nome do pet</label>';
  h += '      <input type="text" class="form-control mb-3" id="pet">';
  h += '      <label class="form-label">Telefone</label>';
  h += '      <input type="text" class="form-control mb-3" id="fone">';
  h += '      <label class="form-label">Servico</label>';
  h += '      <select class="form-select mb-3" id="escolha">';
  h += '        <option value="">Escolha um servico</option>';
  for (var i = 0; i < servicos.length; i++) {
    h += '<option>' + servicos[i].nome + '</option>';
  }
  h += '      </select>';
  h += '      <div id="aviso"></div>';
  h += '      <button class="btn btn-verde" onclick="agendar()">Agendar</button>';
  h += '    </div>';
  h += '  </div>';
  h += '  <div class="col-md-5 mt-3 mt-md-0">';
  h += '    <div class="card p-4">';
  h += '      <h5>Agendamentos feitos</h5>';
  h += '      <div id="lista-agenda"></div>';
  h += '    </div>';
  h += '  </div>';
  h += '</div>';
  h += '</div>';
  return h;
}

function mostrarAgendamentos() {
  var h = "";
  if (agendamentos.length == 0) {
    h = '<p class="text-secondary small">Nenhum agendamento ainda.</p>';
  } else {
    for (var i = 0; i < agendamentos.length; i++) {
      h += '<p class="border-bottom pb-2"><strong>' + agendamentos[i].pet + '</strong> - ' + agendamentos[i].servico + '<br>';
      h += '<span class="small text-secondary">' + agendamentos[i].dono + '</span></p>';
    }
  }
  document.getElementById("lista-agenda").innerHTML = h;
}

function agendar() {
  var dono = document.getElementById("dono").value;
  var pet = document.getElementById("pet").value;
  var fone = document.getElementById("fone").value;
  var servico = document.getElementById("escolha").value;

  if (dono == "" || pet == "" || fone == "" || servico == "") {
    document.getElementById("aviso").innerHTML = '<div class="alert alert-danger">Preencha todos os campos.</div>';
    return;
  }

  agendamentos.push({ dono: dono, pet: pet, servico: servico });

  document.getElementById("dono").value = "";
  document.getElementById("pet").value = "";
  document.getElementById("fone").value = "";
  document.getElementById("escolha").value = "";
  document.getElementById("aviso").innerHTML = '<div class="alert alert-success">Agendamento feito, obrigado ' + dono + '!</div>';

  mostrarAgendamentos();
}

function mostrarPagina() {
  var rota = location.hash.replace("#", "");
  var conteudo = document.getElementById("conteudo");

  if (rota == "/servicos") {
    conteudo.innerHTML = paginaServicos();
    mostrarServicos();
  } else if (rota == "/orcamento") {
    conteudo.innerHTML = paginaOrcamento();
  } else if (rota == "/agendar") {
    conteudo.innerHTML = paginaAgendar();
    mostrarAgendamentos();
  } else {
    conteudo.innerHTML = paginaInicio();
  }

  window.scrollTo(0, 0);
}

window.onhashchange = mostrarPagina;
window.onload = mostrarPagina;
