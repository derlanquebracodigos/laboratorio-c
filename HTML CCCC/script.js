/* ==========================================================
   Laboratório C — lógica do site
   Partes deste arquivo:
     1. Configurações
     2. Exercícios
     3. Elementos da página
     4. Editor (numeração, realce, Tab, Enter)
     5. Salvamento local
     6. Mensagens e saída
     7. Compilação com o Judge0
     8. Exercícios na tela
     9. Início
   ========================================================== */
"use strict";

/* ---------- 1. Configurações ---------- */

// Serviço público que compila e executa o código C.
// Nenhuma chave secreta é usada aqui (nunca coloque chaves no navegador).
const JUDGE0_URL = "https://ce.judge0.com";

// No Judge0 CE, o número 50 é "C (GCC 9.2.0)".
// Para conferir: abra https://ce.judge0.com/languages no navegador.
const LINGUAGEM_C_ID = 50;

const TAMANHO_MAXIMO_CODIGO = 50000; // caracteres
const TAMANHO_MAXIMO_ENTRADA = 5000; // caracteres
const TAMANHO_MAXIMO_SAIDA = 20000;  // caracteres exibidos
const TENTATIVAS_MAXIMAS = 20;       // quantas vezes perguntar o resultado
const INTERVALO_CONSULTA_MS = 1000;  // espera entre as consultas
const TEMPO_LIMITE_REDE_MS = 15000;  // cada requisição desiste após 15 s

const CHAVE_ARMAZENAMENTO = "laboratorioc:v1";

/* ---------- 2. Exercícios ---------- */
// Cada exercício tem: id, título, objetivo, dica e código de exemplo.
// Só o exercício "scanf" usa entrada de dados (campo "entrada" com o valor de exemplo).

const EXERCICIOS = [
  {
    id: "ola-mundo",
    titulo: "Olá, mundo!",
    objetivo: "Escrever seu primeiro programa em C e mostrar uma mensagem na tela com printf.",
    dica: "Troque o texto entre aspas e execute de novo. Todo comando termina com ponto e vírgula (;).",
    codigo: `#include <stdio.h>

int main(void) {
    // printf mostra um texto na tela
    printf("Ola, mundo!\\n");
    return 0;
}
`
  },
  {
    id: "variaveis",
    titulo: "Variáveis e tipos de dados",
    objetivo: "Guardar valores em variáveis de tipos diferentes: int, float e char.",
    dica: "%d mostra inteiros, %.2f mostra decimais com 2 casas e %c mostra um caractere.",
    codigo: `#include <stdio.h>

int main(void) {
    int idade = 15;          // número inteiro
    float altura = 1.65f;    // número com vírgula (ponto em C)
    char inicial = 'A';      // um único caractere

    printf("Idade: %d anos\\n", idade);
    printf("Altura: %.2f m\\n", altura);
    printf("Inicial do nome: %c\\n", inicial);
    return 0;
}
`
  },
  {
    id: "soma",
    titulo: "Soma de dois números",
    objetivo: "Somar dois números guardados em variáveis e mostrar o resultado.",
    dica: "Mude os valores de a e b e veja o resultado mudar.",
    codigo: `#include <stdio.h>

int main(void) {
    int a = 7;
    int b = 5;
    int soma = a + b;

    printf("%d + %d = %d\\n", a, b, soma);
    return 0;
}
`
  },
  {
    id: "operacoes",
    titulo: "Operações matemáticas",
    objetivo: "Usar soma, subtração, multiplicação, divisão e resto da divisão (%).",
    dica: "Dividir dois inteiros em C dá um inteiro (17 / 5 = 3). Para ter decimais, use float.",
    codigo: `#include <stdio.h>

int main(void) {
    int x = 17;
    int y = 5;

    printf("Soma: %d\\n", x + y);
    printf("Subtracao: %d\\n", x - y);
    printf("Multiplicacao: %d\\n", x * y);
    printf("Divisao inteira: %d\\n", x / y);
    printf("Resto: %d\\n", x % y);
    printf("Divisao com decimais: %.2f\\n", (float)x / y);
    return 0;
}
`
  },
  {
    id: "condicoes",
    titulo: "Condições com if e else",
    objetivo: "Fazer o programa tomar decisões usando if, else if e else.",
    dica: "Altere a nota e veja qual mensagem aparece. Use == para comparar (e não =).",
    codigo: `#include <stdio.h>

int main(void) {
    float nota = 7.5f;

    if (nota >= 7.0f) {
        printf("Aprovado!\\n");
    } else if (nota >= 5.0f) {
        printf("Em recuperacao.\\n");
    } else {
        printf("Reprovado.\\n");
    }
    return 0;
}
`
  },
  {
    id: "lacos",
    titulo: "Laços de repetição",
    objetivo: "Repetir comandos com for e while sem copiar o código várias vezes.",
    dica: "Cuidado com laços infinitos: se a condição nunca ficar falsa, o programa não termina.",
    codigo: `#include <stdio.h>

int main(void) {
    // for: repete um número conhecido de vezes
    for (int i = 1; i <= 5; i++) {
        printf("Contando com for: %d\\n", i);
    }

    // while: repete enquanto a condição for verdadeira
    int n = 3;
    while (n > 0) {
        printf("Contagem regressiva: %d\\n", n);
        n--;
    }
    printf("Fim!\\n");
    return 0;
}
`
  },
  {
    id: "vetores",
    titulo: "Vetores",
    objetivo: "Guardar vários valores do mesmo tipo em um vetor e percorrê-los com um laço.",
    dica: "As posições começam em 0. Um vetor de 5 itens vai da posição 0 até a 4.",
    codigo: `#include <stdio.h>

int main(void) {
    int notas[5] = {8, 6, 9, 7, 10};
    int soma = 0;

    for (int i = 0; i < 5; i++) {
        printf("Nota %d: %d\\n", i + 1, notas[i]);
        soma += notas[i];
    }

    printf("Media: %.2f\\n", soma / 5.0);
    return 0;
}
`
  },
  {
    id: "funcoes",
    titulo: "Funções",
    objetivo: "Criar uma função para organizar o código e reutilizá-lo.",
    dica: "A função precisa ser declarada antes de ser usada no main.",
    codigo: `#include <stdio.h>

// Função que recebe um número e devolve o seu quadrado
int quadrado(int n) {
    return n * n;
}

// Função que não devolve nada (void): apenas mostra uma mensagem
void saudacao(void) {
    printf("Bem-vindo ao Laboratorio C!\\n");
}

int main(void) {
    saudacao();
    printf("O quadrado de 6 e %d\\n", quadrado(6));
    printf("O quadrado de 9 e %d\\n", quadrado(9));
    return 0;
}
`
  },
  {
    id: "scanf",
    titulo: "Leitura de dados com scanf",
    objetivo: "Ler dois números digitados por você e mostrar a soma deles.",
    dica: "Escreva os valores na caixa “Entrada do programa” antes de executar (exemplo: 7 5). O programa lê tudo de uma vez.",
    entrada: "7 5",
    codigo: `#include <stdio.h>

int main(void) {
    int a, b;

    printf("Lendo os numeros...\\n");
    // scanf le os valores da caixa "Entrada do programa"
    if (scanf("%d %d", &a, &b) != 2) {
        printf("Preciso de dois numeros na entrada.\\n");
        return 1;
    }

    printf("%d + %d = %d\\n", a, b, a + b);
    return 0;
}
`
  }
];

/* ---------- 3. Elementos da página ---------- */

const el = {
  codigo: document.getElementById("codigo"),
  realce: document.getElementById("realce"),
  area: document.getElementById("codigo-area"),
  entrada: document.getElementById("entrada"),
  painelEntrada: document.getElementById("painel-entrada"),
  numeros: document.getElementById("numeros"),
  btnExecutar: document.getElementById("btn-executar"),
  btnSalvar: document.getElementById("btn-salvar"),
  btnExemplo: document.getElementById("btn-exemplo"),
  btnLimpar: document.getElementById("btn-limpar"),
  btnTab: document.getElementById("btn-tab"),
  mensagem: document.getElementById("mensagem"),
  saida: document.getElementById("saida"),
  lista: document.getElementById("lista-exercicios"),
  titulo: document.getElementById("ex-titulo"),
  objetivo: document.getElementById("ex-objetivo"),
  dica: document.getElementById("ex-dica"),
  statusRede: document.getElementById("status-rede")
};

// Estado do programa
let exercicioAtual = EXERCICIOS[0];
let codigoLimpo = "";      // último texto "seguro" (exemplo carregado ou código salvo)
let executando = false;
let totalLinhas = 0;
let temporizadorRascunho = null;
let temporizadorMensagem = null;

/* ---------- 4. Editor ---------- */

const INDENTACAO = "    "; // 4 espaços

const PALAVRAS_C = new Set((
  "auto break case const continue default do else enum extern for goto if inline " +
  "register return sizeof static struct switch typedef union volatile while"
).split(" "));

const TIPOS_C = new Set(
  "int char float double void long short signed unsigned size_t FILE bool".split(" ")
);

// Uma única expressão regular reconhece os "pedaços" coloridos do código:
// 1 comentário, 2 texto entre aspas, 3 linha #include/#define, 4 número, 5 palavra
const REGEX_TOKENS = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(^[ \t]*#[^\n]*)|(\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlLuU]*\b)|(\b[A-Za-z_]\w*\b)/gm;

function escaparHtml(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Transforma código C em HTML colorido. Tudo é escapado antes de virar HTML.
function colorirCodigo(codigo) {
  let html = "";
  let ultimo = 0;
  let achado;
  REGEX_TOKENS.lastIndex = 0;

  while ((achado = REGEX_TOKENS.exec(codigo)) !== null) {
    const texto = achado[0];
    if (texto.length === 0) { REGEX_TOKENS.lastIndex++; continue; }

    html += escaparHtml(codigo.slice(ultimo, achado.index));

    let classe = "";
    if (achado[1]) classe = "comentario";
    else if (achado[2]) classe = "texto";
    else if (achado[3]) classe = "preproc";
    else if (achado[4]) classe = "numero";
    else if (achado[5]) {
      const fim = achado.index + texto.length;
      if (PALAVRAS_C.has(texto)) classe = "palavra";
      else if (TIPOS_C.has(texto)) classe = "tipo";
      else if (/^[ \t]*\(/.test(codigo.slice(fim, fim + 20))) classe = "funcao";
    }

    html += classe
      ? '<span class="tk-' + classe + '">' + escaparHtml(texto) + "</span>"
      : escaparHtml(texto);
    ultimo = achado.index + texto.length;
  }

  html += escaparHtml(codigo.slice(ultimo));
  return html;
}

// Atualiza as cores e os números de linha
function atualizarEditor() {
  const codigo = el.codigo.value;
  // O "\n" extra evita que a última linha vazia fique "cortada" no <pre>
  el.realce.innerHTML = "<code>" + colorirCodigo(codigo) + "\n</code>";

  // A caixa de entrada só aparece quando o código lê dados (scanf etc.)
  el.painelEntrada.hidden = !usaEntradaDeDados(codigo);

  const linhas = codigo.split("\n").length;
  if (linhas !== totalLinhas) {
    totalLinhas = linhas;
    const numeros = [];
    for (let i = 1; i <= linhas; i++) numeros.push(i);
    el.numeros.textContent = numeros.join("\n");
  }
  sincronizarRolagem();
}

// Mantém cores e números alinhados com o texto digitado
function sincronizarRolagem() {
  el.realce.scrollTop = el.codigo.scrollTop;
  el.realce.scrollLeft = el.codigo.scrollLeft;
  el.numeros.scrollTop = el.codigo.scrollTop;
}

// Insere texto na posição do cursor, mantendo o "desfazer" funcionando
function inserirTexto(texto) {
  el.codigo.focus();
  let funcionou = false;
  try {
    funcionou = document.execCommand("insertText", false, texto);
  } catch (e) {
    funcionou = false;
  }
  if (!funcionou) {
    // Plano B para navegadores que não aceitam execCommand
    const inicio = el.codigo.selectionStart;
    el.codigo.setRangeText(texto, inicio, el.codigo.selectionEnd, "end");
    el.codigo.dispatchEvent(new Event("input", { bubbles: true }));
  }
}

// Tab / Shift+Tab: indenta ou remove indentação (uma ou várias linhas)
function tratarTab(desfazer) {
  const campo = el.codigo;
  const texto = campo.value;
  const inicio = campo.selectionStart;
  const fim = campo.selectionEnd;

  const varias = texto.slice(inicio, fim).includes("\n");

  if (!varias && !desfazer) {
    inserirTexto(INDENTACAO);
    return;
  }

  // Trabalha com as linhas inteiras que a seleção toca
  const inicioLinha = texto.lastIndexOf("\n", inicio - 1) + 1;
  const trecho = texto.slice(inicioLinha, fim);
  const linhas = trecho.split("\n");

  const novas = linhas.map(function (linha) {
    if (!desfazer) return INDENTACAO + linha;
    const espacos = linha.match(/^ {1,4}/);
    return espacos ? linha.slice(espacos[0].length) : linha;
  });
  const novoTrecho = novas.join("\n");

  campo.setSelectionRange(inicioLinha, fim);
  inserirTexto(novoTrecho);
  campo.setSelectionRange(inicioLinha, inicioLinha + novoTrecho.length);
}

// Enter: mantém a indentação da linha de cima (e aumenta depois de "{")
function tratarEnter(evento) {
  const campo = el.codigo;
  if (campo.selectionStart !== campo.selectionEnd) return; // deixa o padrão

  const texto = campo.value;
  const posicao = campo.selectionStart;
  const inicioLinha = texto.lastIndexOf("\n", posicao - 1) + 1;
  const linhaAteCursor = texto.slice(inicioLinha, posicao);
  const indentacao = linhaAteCursor.match(/^[ \t]*/)[0];
  const antes = texto.charAt(posicao - 1);
  const depois = texto.charAt(posicao);

  evento.preventDefault();

  if (antes === "{" && depois === "}") {
    // Abre o bloco: cursor na linha do meio, "}" na linha de baixo
    inserirTexto("\n" + indentacao + INDENTACAO + "\n" + indentacao);
    const novaPosicao = posicao + 1 + indentacao.length + INDENTACAO.length;
    campo.setSelectionRange(novaPosicao, novaPosicao);
  } else if (antes === "{") {
    inserirTexto("\n" + indentacao + INDENTACAO);
  } else {
    inserirTexto("\n" + indentacao);
  }
}

el.codigo.addEventListener("input", function () {
  atualizarEditor();
  agendarRascunho();
});
el.codigo.addEventListener("scroll", sincronizarRolagem);
el.entrada.addEventListener("input", function () { agendarRascunho(); });
el.codigo.addEventListener("keydown", function (evento) {
  if (evento.key === "Tab" && !evento.ctrlKey && !evento.altKey && !evento.metaKey) {
    evento.preventDefault();
    tratarTab(evento.shiftKey);
  } else if (evento.key === "Enter" && !evento.ctrlKey && !evento.metaKey && !evento.shiftKey) {
    tratarEnter(evento);
  } else if (evento.key === "Enter" && (evento.ctrlKey || evento.metaKey)) {
    evento.preventDefault();
    executarCodigo(); // Ctrl+Enter executa
  }
});
el.btnTab.addEventListener("click", function () {
  tratarTab(false);
});

// Liga o modo colorido só se o texto colorido ficou exatamente embaixo do editor.
// Se algo estiver diferente (navegador antigo, por exemplo), o editor continua
// no modo seguro: sem cores, mas com o código sempre visível.
function ativarRealceSePossivel() {
  try {
    el.area.classList.add("colorido");
    if (typeof el.realce.getBoundingClientRect !== "function") return;
    const r = el.realce.getBoundingClientRect();
    const c = el.codigo.getBoundingClientRect();
    const alinhado = r.width > 0 && c.width > 0 &&
      Math.abs(r.width - c.width) < 3 && Math.abs(r.height - c.height) < 3 &&
      Math.abs(r.top - c.top) < 3 && Math.abs(r.left - c.left) < 3;
    const textoVisivel = el.realce.textContent.trim().length > 0 || el.codigo.value.trim() === "";
    if (!alinhado || !textoVisivel) el.area.classList.remove("colorido");
  } catch (e) {
    el.area.classList.remove("colorido");
  }
}

// Define o conteúdo do editor de uma vez (sem usar o "desfazer")
function definirCodigo(texto) {
  el.codigo.value = texto;
  el.codigo.scrollTop = 0;
  el.codigo.scrollLeft = 0;
  atualizarEditor();
}

/* ---------- 5. Salvamento local ---------- */
// Estrutura guardada: { rascunho: {id, codigo}, salvos: { idDoExercicio: codigo } }
// "rascunho" é gravado sozinho enquanto o aluno digita (só no aparelho, sem internet).
// "salvos" só muda quando o aluno toca em "Salvar código".

let armazenamentoDisponivel = true;

function testarArmazenamento() {
  try {
    const teste = CHAVE_ARMAZENAMENTO + ":teste";
    window.localStorage.setItem(teste, "1");
    window.localStorage.removeItem(teste);
    return true;
  } catch (e) {
    return false;
  }
}

function lerDados() {
  const vazio = { rascunho: null, salvos: {} };
  if (!armazenamentoDisponivel) return vazio;
  try {
    const bruto = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return vazio;
    const dados = JSON.parse(bruto);
    const salvos = (dados && typeof dados.salvos === "object" && dados.salvos) || {};
    let rascunho = null;
    if (dados && dados.rascunho &&
        typeof dados.rascunho.id === "string" &&
        typeof dados.rascunho.codigo === "string") {
      rascunho = dados.rascunho;
    }
    return { rascunho: rascunho, salvos: salvos };
  } catch (e) {
    return vazio;
  }
}

// Retorna true se gravou com sucesso
function gravarDados(dados) {
  if (!armazenamentoDisponivel) return false;
  try {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(dados));
    return true;
  } catch (e) {
    return false; // armazenamento cheio, bloqueado ou modo privado
  }
}

function agendarRascunho() {
  if (!armazenamentoDisponivel) return;
  clearTimeout(temporizadorRascunho);
  temporizadorRascunho = setTimeout(function () {
    const dados = lerDados();
    dados.rascunho = { id: exercicioAtual.id, codigo: el.codigo.value, entrada: el.entrada.value };
    gravarDados(dados);
  }, 600);
}

function salvarCodigo() {
  if (!armazenamentoDisponivel) {
    mostrarMensagem("Não foi possível salvar: o armazenamento do navegador está indisponível (modo privado ou bloqueado). Seu código continua no editor, mas será perdido se você fechar a página.", "erro", false);
    return;
  }
  const dados = lerDados();
  dados.salvos[exercicioAtual.id] = el.codigo.value;
  dados.rascunho = { id: exercicioAtual.id, codigo: el.codigo.value, entrada: el.entrada.value };
  if (gravarDados(dados)) {
    codigoLimpo = el.codigo.value;
    mostrarMensagem("Código salvo neste aparelho. Ele não é enviado para outros dispositivos.", "ok");
  } else {
    mostrarMensagem("Não foi possível salvar o código (o armazenamento pode estar cheio ou bloqueado). Seu código continua no editor.", "erro", false);
  }
}

function codigoFoiAlterado() {
  return el.codigo.value !== codigoLimpo;
}

/* ---------- 6. Mensagens e saída ---------- */

// tipo: "ok", "erro" ou "aviso". Mensagens "ok" somem sozinhas.
function mostrarMensagem(texto, tipo, sumirSozinha) {
  clearTimeout(temporizadorMensagem);
  el.mensagem.textContent = texto;
  el.mensagem.className = "mensagem" + (tipo ? " " + tipo : "");
  if (sumirSozinha !== false && tipo === "ok") {
    temporizadorMensagem = setTimeout(function () {
      el.mensagem.textContent = "";
      el.mensagem.className = "mensagem";
    }, 5000);
  }
}

function limparSaida() {
  el.saida.textContent = "";
  const p = document.createElement("p");
  p.className = "vazio";
  p.textContent = "Clique em “Executar código” para ver o resultado aqui.";
  el.saida.appendChild(p);
}

function prepararSaida() {
  // Remove a mensagem "vazia" e os resultados antigos
  el.saida.textContent = "";
}

// Cria um bloco de resultado. Todo texto entra por textContent (nunca como HTML).
// tipo: "sucesso", "erro", "aviso" ou "info"
function adicionarBloco(tipo, rotulo, texto, ehCodigo) {
  const bloco = document.createElement("div");
  bloco.className = "bloco " + tipo;

  const titulo = document.createElement("h3");
  titulo.textContent = rotulo;
  bloco.appendChild(titulo);

  if (texto !== undefined && texto !== null && texto !== "") {
    let conteudo = String(texto);
    if (conteudo.length > TAMANHO_MAXIMO_SAIDA) {
      conteudo = conteudo.slice(0, TAMANHO_MAXIMO_SAIDA) + "\n… (saída cortada: ficou muito longa)";
    }
    const elemento = document.createElement(ehCodigo ? "pre" : "p");
    elemento.textContent = conteudo;
    bloco.appendChild(elemento);
  }
  el.saida.appendChild(bloco);
  el.saida.scrollTop = 0;
}

/* ---------- 7. Compilação com o Judge0 ---------- */

// Erro com um "tipo" para escolhermos a mensagem certa em português
class ErroApi extends Error {
  constructor(tipo, status) {
    super(tipo);
    this.tipo = tipo;
    this.status = status || 0;
  }
}

// Texto -> Base64 (aceita acentos)
function paraBase64(texto) {
  const bytes = new TextEncoder().encode(texto);
  let binario = "";
  const bloco = 0x8000;
  for (let i = 0; i < bytes.length; i += bloco) {
    binario += String.fromCharCode.apply(null, bytes.subarray(i, i + bloco));
  }
  return btoa(binario);
}

// Base64 -> texto (aceita acentos). Valores vazios viram "".
function deBase64(valor) {
  if (!valor) return "";
  try {
    const binario = atob(String(valor).replace(/\s/g, ""));
    const bytes = new Uint8Array(binario.length);
    for (let i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  } catch (e) {
    return "";
  }
}

function esperar(ms) {
  return new Promise(function (resolver) { setTimeout(resolver, ms); });
}

// Faz uma requisição ao Judge0 com limite de tempo
async function chamarJudge0(caminho, opcoes) {
  const controle = new AbortController();
  const relogio = setTimeout(function () { controle.abort(); }, TEMPO_LIMITE_REDE_MS);
  let resposta;
  try {
    resposta = await fetch(JUDGE0_URL + caminho, Object.assign({}, opcoes, { signal: controle.signal }));
  } catch (e) {
    throw new ErroApi(e && e.name === "AbortError" ? "tempo" : "rede");
  } finally {
    clearTimeout(relogio);
  }

  if (!resposta.ok) {
    let tipo = "http";
    if (resposta.status === 429) tipo = "limite";
    else if (resposta.status === 401 || resposta.status === 403) tipo = "autorizacao";
    else if (resposta.status === 400 || resposta.status === 422) tipo = "requisicao";
    else if (resposta.status >= 500) tipo = "indisponivel";
    throw new ErroApi(tipo, resposta.status);
  }

  try {
    return await resposta.json();
  } catch (e) {
    throw new ErroApi("resposta");
  }
}

// Envia o código e recebe um "token" (o número do pedido)
async function enviarCodigo(codigo, entrada) {
  const corpo = {
    language_id: LINGUAGEM_C_ID,
    source_code: paraBase64(codigo),
    stdin: paraBase64(entrada) // valores digitados na caixa "Entrada do programa" (vazio se não houver)
  };
  const dados = await chamarJudge0("/submissions?base64_encoded=true&wait=false", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo)
  });
  if (!dados || typeof dados.token !== "string" || dados.token === "") {
    throw new ErroApi("resposta");
  }
  return dados.token;
}

// Pergunta o resultado até o programa terminar (status 1 = na fila, 2 = executando)
async function aguardarResultado(token) {
  const campos = "status,stdout,stderr,compile_output,message,time,memory";
  const caminho = "/submissions/" + encodeURIComponent(token) +
                  "?base64_encoded=true&fields=" + campos;

  for (let tentativa = 0; tentativa < TENTATIVAS_MAXIMAS; tentativa++) {
    await esperar(INTERVALO_CONSULTA_MS);
    const resultado = await chamarJudge0(caminho, { method: "GET" });
    const idStatus = resultado && resultado.status ? resultado.status.id : 0;
    if (idStatus > 2) return resultado;
    if (idStatus === 0) throw new ErroApi("resposta");
  }
  throw new ErroApi("demora");
}

// Procura pedidos de entrada de dados no código, ignorando comentários e textos
function usaEntradaDeDados(codigo) {
  const semComentarios = codigo
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/[^\n]*/g, " ")
    .replace(/"(?:\\.|[^"\\\n])*"/g, '""');
  return /\b(scanf|fscanf|sscanf_s|scanf_s|gets|fgets|getchar|getc|fgetc|getch|getche|read)\s*\(/.test(semComentarios);
}

function definirExecutando(valor) {
  executando = valor;
  el.btnExecutar.disabled = valor;
  el.btnExecutar.textContent = valor ? "Executando…" : "▶ Executar código";
  el.btnExecutar.setAttribute("aria-busy", valor ? "true" : "false");
}

async function executarCodigo() {
  if (executando) return;

  const codigo = el.codigo.value;

  // 1. Verificações antes de enviar
  if (codigo.trim() === "") {
    prepararSaida();
    adicionarBloco("aviso", "Editor vazio", "Escreva um programa em C ou escolha um exercício na lista antes de executar.");
    return;
  }
  if (codigo.length > TAMANHO_MAXIMO_CODIGO) {
    prepararSaida();
    adicionarBloco("aviso", "Código muito grande",
      "O código tem " + codigo.length + " caracteres e o limite é " + TAMANHO_MAXIMO_CODIGO + ". Reduza o tamanho e tente de novo.");
    return;
  }
  // Entrada de dados: o Judge0 recebe tudo de uma vez, antes de executar
  let entrada = "";
  if (usaEntradaDeDados(codigo)) {
    entrada = el.entrada.value;
    if (entrada.trim() === "") {
      prepararSaida();
      adicionarBloco("aviso", "Faltam os valores de entrada",
        "Seu código lê dados (por exemplo, com scanf). Escreva os valores na caixa “Entrada do programa”, logo abaixo do editor, e execute de novo.\n\n" +
        "Exemplo: se o código tem scanf(\"%d %d\", &a, &b), digite  7 5  na caixa.\n" +
        "Importante: o programa lê tudo de uma vez. Ele não pergunta durante a execução.", true);
      el.entrada.focus();
      return;
    }
    if (entrada.length > TAMANHO_MAXIMO_ENTRADA) {
      prepararSaida();
      adicionarBloco("aviso", "Entrada muito grande",
        "A entrada tem " + entrada.length + " caracteres e o limite é " + TAMANHO_MAXIMO_ENTRADA + ".");
      return;
    }
    // O fim de linha no final evita que scanf/fgets fiquem esperando mais dados
    if (!entrada.endsWith("\n")) entrada += "\n";
  }
  if (navigator.onLine === false) {
    prepararSaida();
    adicionarBloco("erro", "Sem conexão",
      "Para compilar C é preciso internet. Conecte-se e tente de novo. Seu código continua no editor.");
    return;
  }

  // 2. Envio e acompanhamento
  definirExecutando(true);
  prepararSaida();
  adicionarBloco("info", "Compilando e executando…", "Aguarde alguns segundos.");

  try {
    const token = await enviarCodigo(codigo, entrada);
    const resultado = await aguardarResultado(token);
    prepararSaida();
    mostrarResultado(resultado);
  } catch (erro) {
    prepararSaida();
    mostrarErroDeRede(erro);
  } finally {
    definirExecutando(false); // sempre reativa o botão
  }
}

// Mostra o que o Judge0 respondeu. Nada aqui é inventado: só o que veio da API.
function mostrarResultado(r) {
  const idStatus = r.status.id;
  const stdout = deBase64(r.stdout);
  const stderr = deBase64(r.stderr);
  const compilacao = deBase64(r.compile_output);
  const mensagem = deBase64(r.message);

  const detalhes = [];
  if (r.time !== null && r.time !== undefined && r.time !== "") detalhes.push("tempo: " + r.time + " s");
  if (r.memory !== null && r.memory !== undefined && r.memory !== "") detalhes.push("memória: " + r.memory + " KB");
  const rodape = detalhes.join(" · ");

  if (idStatus === 6) {
    // Erro de compilação: o programa NÃO foi executado
    adicionarBloco("erro", "Erro de compilação — o programa não foi executado", compilacao || "O compilador não explicou o erro.", true);
    adicionarBloco("info", "Como ler o erro",
      "Procure o número da linha (por exemplo, main.c:5:10 significa linha 5). Veja também se faltou um ponto e vírgula (;), uma chave } ou um parêntese ), e se o nome das variáveis está escrito igual em todos os lugares.");
    return;
  }

  if (idStatus === 3) {
    adicionarBloco("sucesso", "Saída do programa",
      stdout !== "" ? stdout : "(O programa terminou sem imprimir nada.)", true);
    if (stderr !== "") adicionarBloco("aviso", "Mensagens de erro do programa", stderr, true);
    if (rodape) adicionarBloco("info", "Executado com sucesso", rodape);
    return;
  }

  if (idStatus === 5) {
    if (stdout !== "") adicionarBloco("info", "Saída até o programa ser interrompido", stdout, true);
    adicionarBloco("erro", "Tempo limite excedido",
      "O programa demorou demais e foi interrompido. Verifique se há um laço (for/while) que nunca termina.");
    return;
  }

  if (idStatus >= 7 && idStatus <= 12) {
    // Erros durante a execução
    if (stdout !== "") adicionarBloco("info", "Saída antes do erro", stdout, true);
    let explicacao = "O programa foi compilado, mas parou com erro durante a execução.";
    if (idStatus === 11) {
      explicacao = "O programa terminou com código de saída diferente de zero. No C, main deve terminar com return 0; quando tudo dá certo.";
    } else if (idStatus === 7) {
      explicacao = "Falha de segmentação: o programa tentou acessar uma posição de memória que não podia (por exemplo, uma posição fora do vetor).";
    } else if (idStatus === 8) {
      explicacao = "O programa tentou usar um tamanho de arquivo de saída maior do que o permitido.";
    } else if (idStatus === 9) {
      explicacao = "O programa foi finalizado por sinal do sistema (por exemplo, divisão por zero ou erro grave de memória).";
    }
    adicionarBloco("erro", "Erro de execução: " + r.status.description, explicacao);
    const detalheErro = stderr || mensagem;
    if (detalheErro) adicionarBloco("erro", "Detalhes", detalheErro, true);
    return;
  }

  // Erro interno do serviço (13) ou outros casos
  adicionarBloco("erro", "O serviço de compilação não conseguiu concluir",
    "Não foi culpa do seu código, necessariamente. Tente executar novamente em alguns instantes." +
    (mensagem ? "\n\nDetalhe: " + mensagem : ""));
}

function mostrarErroDeRede(erro) {
  const tipo = erro instanceof ErroApi ? erro.tipo : "desconhecido";
  const mensagens = {
    rede: ["Falha de conexão", "Não foi possível falar com o serviço de compilação. Verifique sua internet (dados móveis ou Wi-Fi) e tente de novo."],
    tempo: ["O serviço demorou para responder", "A conexão está lenta ou o serviço está sobrecarregado. Tente novamente."],
    demora: ["O resultado demorou demais", "O serviço não terminou a execução a tempo. Tente de novo; se o problema continuar, o serviço pode estar sobrecarregado."],
    limite: ["Limite de requisições atingido", "O serviço gratuito recebeu muitas execuções em pouco tempo (isso pode acontecer quando a turma toda executa ao mesmo tempo). Espere cerca de um minuto e tente de novo."],
    indisponivel: ["Serviço indisponível", "O serviço de compilação está fora do ar ou com problemas agora. Tente novamente mais tarde."],
    autorizacao: ["Acesso negado pelo serviço", "O serviço público recusou o pedido (ele pode ter passado a exigir autenticação). Avise o professor."],
    requisicao: ["Pedido recusado", "O serviço recusou o pedido. Confira se o código é válido; se o erro continuar, avise o professor."],
    resposta: ["Resposta inesperada", "O serviço respondeu algo que o site não entendeu. Tente novamente."],
    http: ["Erro de comunicação", "O serviço respondeu com um erro" + (erro && erro.status ? " (código " + erro.status + ")" : "") + ". Tente novamente."]
  };
  const par = mensagens[tipo] || ["Erro inesperado", "Algo deu errado. Tente novamente."];
  adicionarBloco("erro", par[0], par[1] + "\n\nSeu código continua no editor e não foi apagado.");
}

/* ---------- 8. Exercícios na tela ---------- */

function criarListaDeExercicios() {
  EXERCICIOS.forEach(function (exercicio, indice) {
    const item = document.createElement("li");
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "btn-exercicio";
    botao.dataset.id = exercicio.id;

    const numero = document.createElement("span");
    numero.className = "num";
    numero.textContent = String(indice + 1);

    const nome = document.createElement("span");
    nome.textContent = exercicio.titulo;

    botao.appendChild(numero);
    botao.appendChild(nome);
    botao.addEventListener("click", function () { escolherExercicio(exercicio.id); });
    item.appendChild(botao);
    el.lista.appendChild(item);
  });
}

function marcarExercicioAtivo() {
  const botoes = el.lista.querySelectorAll(".btn-exercicio");
  botoes.forEach(function (botao) {
    const ativo = botao.dataset.id === exercicioAtual.id;
    if (ativo) botao.setAttribute("aria-current", "true");
    else botao.removeAttribute("aria-current");
  });
  el.titulo.textContent = exercicioAtual.titulo;
  el.objetivo.textContent = "Objetivo: " + exercicioAtual.objetivo;
  el.dica.textContent = exercicioAtual.dica ? "Dica: " + exercicioAtual.dica : "";
}

function buscarExercicio(id) {
  for (let i = 0; i < EXERCICIOS.length; i++) {
    if (EXERCICIOS[i].id === id) return EXERCICIOS[i];
  }
  return null;
}

// Carrega o código salvo do exercício (se houver) ou o exemplo.
// Não executa nada automaticamente.
function carregarExercicio(exercicio) {
  exercicioAtual = exercicio;
  const dados = lerDados();
  const salvo = dados.salvos[exercicio.id];
  const usouSalvo = typeof salvo === "string";

  codigoLimpo = usouSalvo ? salvo : exercicio.codigo;
  el.entrada.value = exercicio.entrada || "";
  definirCodigo(codigoLimpo);
  marcarExercicioAtivo();
  agendarRascunho();
  limparSaida();

  mostrarMensagem(
    usouSalvo
      ? "Carregamos o código que você salvou neste exercício. Use “Restaurar exemplo” para voltar ao código original."
      : "Exercício carregado. Leia o objetivo e clique em “Executar código” quando quiser testar.",
    "ok"
  );
}

function escolherExercicio(id) {
  const exercicio = buscarExercicio(id);
  if (!exercicio || exercicio.id === exercicioAtual.id) return;

  if (codigoFoiAlterado()) {
    const continuar = window.confirm(
      "Você alterou o código e ainda não salvou.\n\nSe trocar de exercício, essas alterações serão substituídas no editor. Deseja continuar?"
    );
    if (!continuar) return;
  }
  carregarExercicio(exercicio);
}

function restaurarExemplo() {
  if (codigoFoiAlterado() || el.codigo.value !== exercicioAtual.codigo) {
    const continuar = window.confirm(
      "Isso vai substituir o código do editor pelo exemplo original do exercício.\n\nSeu código salvo anteriormente não será apagado até você salvar de novo. Deseja continuar?"
    );
    if (!continuar) return;
  }
  codigoLimpo = exercicioAtual.codigo;
  el.entrada.value = exercicioAtual.entrada || "";
  definirCodigo(exercicioAtual.codigo);
  agendarRascunho();
  mostrarMensagem("Exemplo original restaurado.", "ok");
}

/* ---------- 9. Início ---------- */

function atualizarStatusRede() {
  const online = navigator.onLine !== false;
  el.statusRede.textContent = online ? "Online" : "Sem internet";
  el.statusRede.classList.toggle("offline", !online);
}

function iniciar() {
  armazenamentoDisponivel = testarArmazenamento();
  criarListaDeExercicios();

  // Se existir um rascunho, volta exatamente de onde o aluno parou
  const dados = lerDados();
  const rascunho = dados.rascunho;
  const exercicioRascunho = rascunho ? buscarExercicio(rascunho.id) : null;

  if (exercicioRascunho) {
    exercicioAtual = exercicioRascunho;
    const salvo = dados.salvos[exercicioRascunho.id];
    codigoLimpo = typeof salvo === "string" ? salvo : exercicioRascunho.codigo;
    el.entrada.value = typeof rascunho.entrada === "string" ? rascunho.entrada : "";
    definirCodigo(rascunho.codigo);
    marcarExercicioAtivo();
    mostrarMensagem("Restauramos o seu código da última vez.", "ok");
  } else {
    carregarExercicio(EXERCICIOS[0]);
  }

  if (!armazenamentoDisponivel) {
    mostrarMensagem("O armazenamento local do navegador está indisponível. Você pode usar o editor normalmente, mas o código não será guardado neste aparelho.", "aviso", false);
  }

  ativarRealceSePossivel();

  el.btnExecutar.addEventListener("click", executarCodigo);
  el.btnSalvar.addEventListener("click", salvarCodigo);
  el.btnExemplo.addEventListener("click", restaurarExemplo);
  el.btnLimpar.addEventListener("click", limparSaida);

  window.addEventListener("online", atualizarStatusRede);
  window.addEventListener("offline", atualizarStatusRede);
  atualizarStatusRede();

  // Service worker: guarda só os arquivos do site (HTML, CSS, JS, ícones).
  // Ele NÃO guarda resultados de compilação e NÃO faz C funcionar offline.
  const seguro = location.protocol === "https:" ||
                 location.hostname === "localhost" ||
                 location.hostname === "127.0.0.1";
  if ("serviceWorker" in navigator && seguro) {
    navigator.serviceWorker.register("sw.js").catch(function () {
      /* sem service worker o site continua funcionando normalmente */
    });
  }
}

// Se algo der errado ao abrir, mostra um aviso em vez de deixar a tela "morta".
try {
  iniciar();
} catch (erro) {
  const aviso = document.createElement("p");
  aviso.className = "aviso-js";
  aviso.textContent = "Erro ao iniciar o Laboratório C: " + (erro && erro.message ? erro.message : erro) +
    ". Tente recarregar a página (Ctrl+Shift+R).";
  document.body.insertBefore(aviso, document.body.firstChild);
  if (window.console) console.error(erro);
}
