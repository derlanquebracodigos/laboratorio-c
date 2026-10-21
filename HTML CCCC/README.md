# Laboratório C

Site educativo para aprender a linguagem C. O aluno escreve um programa, clica em **Executar código** e vê o resultado. Tudo em português, pensado para tablets e para economizar dados móveis.

## Como abrir no Windows com o VS Code

O jeito mais simples (recomendado):

1. Abra o **Visual Studio Code**.
2. Vá em **Arquivo → Abrir Pasta…** e escolha a pasta `LaboratorioC`.
3. Clique no ícone de extensões (quadradinhos, à esquerda), procure **Live Server** (autor: Ritwick Dey) e clique em **Instalar**.
4. Abra o arquivo `index.html`, clique com o botão direito no editor e escolha **Open with Live Server**.
5. O navegador abre em `http://127.0.0.1:5500`. Qualquer alteração que você salvar no VS Code aparece sozinha.

Alternativa sem extensão (se o Python estiver instalado): no terminal do VS Code (**Terminal → Novo Terminal**) digite:

```
python -m http.server 8000
```

e abra `http://localhost:8000` no navegador.

> Abrir o `index.html` com duplo clique também mostra a página, mas o modo de instalação no tablet (service worker) só funciona por `http://localhost` ou por `https://`.

## Como usar com a turma

Os alunos precisam de um endereço na internet. Opções gratuitas e simples: **GitHub Pages**, **Netlify** ou **Cloudflare Pages**. Basta enviar esta pasta inteira. Todos esses serviços usam `https`, que é o necessário para instalar o site na tela inicial do tablet.

Para instalar no tablet: abra o endereço no Chrome (Android) e use **Instalar app / Adicionar à tela inicial**. No iPad (Safari): **Compartilhar → Adicionar à Tela de Início**.

## Arquivos

| Arquivo | Para que serve |
| --- | --- |
| `index.html` | Estrutura da página |
| `style.css` | Visual (tema escuro, layout para tablet) |
| `script.js` | Editor, exercícios, salvamento e conexão com o compilador |
| `manifest.json` | Permite instalar o site na tela inicial |
| `sw.js` | Guarda os arquivos do site para a tela abrir sem internet |
| `icon.svg`, `icon-*.png` | Ícones do aplicativo |
| `gerar_icones.py` | Só se quiser refazer os ícones PNG (`python gerar_icones.py`) |

## Como funciona a execução do código

- O código C **não roda no tablet**. Ao clicar em **Executar código**, ele é enviado ao serviço público **Judge0** (`https://ce.judge0.com`), que compila (GCC) e executa, e o site mostra a resposta.
- Nada é enviado enquanto o aluno digita. Só há requisições ao clicar em executar (1 envio + algumas consultas de resultado, de 1 em 1 segundo).
- **Compilar exige internet.** Sem conexão, a interface abre (graças ao service worker) e dá para editar e salvar, mas não dá para executar.
- Não há chaves secretas no site.

### Cuidados importantes com o serviço gratuito

- O Judge0 público é compartilhado e tem **limite de uso**. Se a turma toda executar ao mesmo tempo, algumas execuções podem receber a mensagem "Limite de requisições atingido". Peça para esperar um minuto.
- O serviço pode mudar as regras (por exemplo, passar a exigir chave) ou ficar fora do ar. O site mostra mensagens claras nesses casos.
- Se a turma crescer ou o uso for frequente, o caminho recomendado é um servidor próprio do Judge0 ou um plano pago. Chaves **nunca** devem ficar no JavaScript do site: seria preciso criar um pequeno servidor intermediário.
- O número `50` em `script.js` (`LINGUAGEM_C_ID`) é o código de "C (GCC 9.2.0)" no Judge0 CE. Para conferir, abra `https://ce.judge0.com/languages` no navegador.

### Entrada de dados (scanf)

Quando o código usa `scanf`, `fgets`, `getchar` etc., aparece uma caixa **"Entrada do programa (para o scanf)"** logo abaixo do editor. Em códigos sem leitura de dados, ela fica escondida.

- O aluno digita os valores **antes** de clicar em Executar, na mesma ordem do `scanf`. Exemplo: para `scanf("%d %d", &a, &b)`, escrever `7 5`.
- Os valores são enviados ao Judge0 junto com o código. O programa lê tudo de uma vez: **ele não pergunta durante a execução**, como um terminal faria.
- Se o código lê dados e a caixa está vazia, o site não executa e avisa o aluno.
- O exercício 9, "Leitura de dados com scanf", já vem com um exemplo pronto.

## Consumo de dados (estimativa)

- O site inteiro (HTML + CSS + JS + ícones) tem cerca de 65 KB na primeira visita (menos, se a hospedagem comprimir os arquivos), sem bibliotecas externas, fontes ou imagens grandes. Depois disso fica guardado no aparelho.
- O realce de sintaxe é feito por código próprio, então **não adiciona nenhum download**.
- Cada execução de código usa poucos KB.

## Salvamento

- **Salvar código** guarda o código do exercício atual **neste aparelho e neste navegador**. Não há sincronização entre dispositivos.
- Enquanto o aluno digita, um rascunho é guardado automaticamente no aparelho, e reaparece quando o site é aberto de novo.
- Ao trocar de exercício com alterações não salvas, o site pede confirmação.
- Se o navegador bloquear o armazenamento (modo privado, por exemplo), o site avisa e continua funcionando.

## Atalhos do editor

- **Tab**: indenta (4 espaços). **Shift+Tab**: remove indentação. Em tablets sem tecla Tab, use o botão **⇥ Tab**.
- **Enter**: mantém a indentação da linha anterior (e aumenta depois de `{`).
- **Ctrl+Enter**: executa o código.

## Mudou algum arquivo? Atualize o cache

O `sw.js` guarda uma cópia dos arquivos. Depois de editar `index.html`, `style.css` ou `script.js`, troque `VERSAO` em `sw.js` (por exemplo, de `laboratorioc-v1` para `laboratorioc-v2`) para os aparelhos receberem a versão nova. Durante o desenvolvimento, se algo parecer "preso" na versão antiga, use **Ctrl+Shift+R** ou, no Chrome, F12 → Application → Service Workers → Unregister.

## Roteiro de testes (faça no navegador)

1. **A página abre sem erros:** abra o site e pressione F12 → aba Console. Não deve haver mensagens em vermelho.
2. **Caixa do scanf:** no exercício 1 ela não aparece. No exercício 9 ela aparece com `7 5`; execute e confira `7 + 5 = 12`. Apague os valores e execute: o site deve avisar que faltam dados.
3. **Editor:** clique no código e digite; os números de linha e as cores devem acompanhar.
4. **Exercícios:** clique em cada um dos 9. O código e o objetivo mudam e nada é executado sozinho.
5. **Salvar e restaurar:** altere o código, clique em **Salvar código**, recarregue a página (F5): o código continua lá.
6. **Limpar saída:** execute algo e clique em **Limpar saída**.
7. **Compilador real:** no exercício 1, clique em **Executar código**. Deve aparecer `Ola, mundo!`.
8. **Erro de compilação:** apague um `;` e execute. Deve aparecer o erro do compilador com a linha, e a mensagem "o programa não foi executado".
9. **Falha de rede:** F12 → Network → marque *Offline* e clique em executar. Deve aparecer "Sem conexão", e o código continua no editor.
10. **Tela pequena e tablet:** F12 → ícone de celular/tablet (Ctrl+Shift+M) e teste larguras de 390 px (celular) e 820 px (tablet). Os botões devem ficar grandes e a lista de exercícios vira uma fila horizontal.
11. **Instalação e offline:** em `localhost` ou `https`, abra F12 → Application → Manifest (sem erros) e depois marque *Offline*: a página ainda abre, mas executar continua dando "Sem conexão".
