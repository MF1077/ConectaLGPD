# LGPD Educa

Plataforma educativa sobre a Lei Geral de Proteção de Dados (LGPD), com guia de direitos, quiz interativo e simulador de situações práticas.

## Requisitos

- Um navegador atualizado.
- Para executar um servidor local, Python 3 **ou** a extensão Live Server no Visual Studio Code.

O projeto é estático: não requer instalação de dependências, compilação ou banco de dados.

## Executar localmente

### Com Python

Abra o PowerShell ou terminal na pasta do projeto e execute:

```powershell
py -m http.server 8000
```

Se o comando `py` não estiver disponível, tente:

```powershell
python -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000) no navegador. A página inicial é `index.html`.

Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

### Com Visual Studio Code

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**, caso ainda não esteja instalada.
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

Recomenda-se usar um servidor local em vez de abrir os arquivos diretamente (`file://`), especialmente para que o salvamento local do progresso funcione corretamente.

## Páginas

- `index.html` — guia introdutório e tipos de dados.
- `simulador.html` — cenários práticos sobre proteção de dados.
- `quiz.html` — quiz de 15 perguntas com correção e feedback.
- `direitos.html` — resumo dos direitos dos titulares.
- `painel.html` — resultados do quiz e do simulador.

As páginas compartilham `style.css` e `script.js`. O arquivo `logo.svg` contém a identidade visual usada no cabeçalho.

## Progresso

Os resultados do quiz e do simulador são armazenados no `localStorage` do navegador. Eles ficam disponíveis apenas naquele navegador e dispositivo; o projeto não possui servidor, conta de usuário ou sincronização entre dispositivos.
