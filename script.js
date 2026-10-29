const campoNome = document.getElementById("nome");
const campoCargo = document.getElementById("cargo");
const campoResumo = document.getElementById("resumo");
const botaoSalvar = document.getElementById("salvar");
const botaoLimpar = document.getElementById("limpar");
const botaoTema = document.getElementById("tema");
 
const PADRAO = {
    nome: "Seu Nome",
    cargo: "Cargo desejado",
    resumo: "Seu resumo profissional."
};
 
botaoSalvar.addEventListener("click", salvarPerfil);
botaoLimpar.addEventListener("click", limparPerfil);
botaoTema.addEventListener("click", alternarTema);
 
/* ---------- Perfil ---------- */
 
function mostrarPerfil(perfil) {
    document.getElementById("nomePerfil").textContent = perfil.nome || PADRAO.nome;
    document.getElementById("cargoPerfil").textContent = perfil.cargo || PADRAO.cargo;
    document.getElementById("resumoPerfil").textContent = perfil.resumo || PADRAO.resumo;
}
 
function salvarPerfil() {
    const perfil = {
        nome: campoNome.value.trim(),
        cargo: campoCargo.value.trim(),
        resumo: campoResumo.value.trim()
    };
 
    localStorage.setItem("perfil", JSON.stringify(perfil));
    mostrarPerfil(perfil);
}
 
function limparPerfil() {
    document.getElementById("formPerfil").reset();
    localStorage.removeItem("perfil");
    mostrarPerfil(PADRAO);
}
 
function carregarPerfil() {
    try {
        const perfilSalvo = JSON.parse(localStorage.getItem("perfil"));
        if (perfilSalvo) {
            mostrarPerfil(perfilSalvo);
            campoNome.value = perfilSalvo.nome || "";
            campoCargo.value = perfilSalvo.cargo || "";
            campoResumo.value = perfilSalvo.resumo || "";
        }
    } catch (erro) {
        localStorage.removeItem("perfil");
    }
}
 
/* ---------- Tema claro/escuro ---------- */
 
function aplicarTema(escuro) {
    document.documentElement.setAttribute("data-bs-theme", escuro ? "dark" : "light");
    botaoTema.textContent = escuro ? "Tema Claro" : "Tema Escuro";
}
 
function alternarTema() {
    const escuro = document.documentElement.getAttribute("data-bs-theme") !== "dark";
    aplicarTema(escuro);
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
}
 
function carregarTema() {
    const salvo = localStorage.getItem("tema");
    const prefereEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
    aplicarTema(salvo ? salvo === "escuro" : prefereEscuro);
}
 
/* ---------- Contador de visitas ---------- */
 
function contarVisita() {
    const visitas = (Number(localStorage.getItem("visitas")) || 0) + 1;
    localStorage.setItem("visitas", visitas);
 
    document.getElementById("visita").textContent =
        visitas === 1
            ? "Esta é a sua primeira visita ao portfólio."
            : `Você visitou este portfólio ${visitas} vezes neste navegador.`;
}
 
/* ---------- Início ---------- */
 
window.addEventListener("DOMContentLoaded", function () {
    carregarPerfil();
    carregarTema();
    contarVisita();
});