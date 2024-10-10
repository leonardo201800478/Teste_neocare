<!DOCTYPE html><html class="default" lang="en"><head><meta charset="utf-8"/><meta http-equiv="x-ua-compatible" content="IE=edge"/><title>neocare - v1.0.1</title><meta name="description" content="Documentation for neocare"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="assets/style.css"/><link rel="stylesheet" href="assets/highlight.css"/><script defer src="assets/main.js"></script><script async src="assets/icons.js" id="tsd-icons-script"></script><script async src="assets/search.js" id="tsd-search-script"></script><script async src="assets/navigation.js" id="tsd-nav-script"></script></head><body><script>document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os";document.body.style.display="none";setTimeout(() => app?app.showPage():document.body.style.removeProperty("display"),500)</script><header class="tsd-page-toolbar"><div class="tsd-toolbar-contents container"><div class="table-cell" id="tsd-search" data-base="."><div class="field"><label for="tsd-search-field" class="tsd-widget tsd-toolbar-icon search no-caption"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><use href="assets/icons.svg#icon-search"></use></svg></label><input type="text" id="tsd-search-field" aria-label="Search"/></div><div class="field"><div id="tsd-toolbar-links"></div></div><ul class="results"><li class="state loading">Preparing search index...</li><li class="state failure">The search index is not available</li></ul><a href="index.html" class="title">neocare - v1.0.1</a></div><div class="table-cell" id="tsd-widgets"><a href="#" class="tsd-widget tsd-toolbar-icon menu no-caption" data-toggle="menu" aria-label="Menu"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><use href="assets/icons.svg#icon-menu"></use></svg></a></div></div></header><div class="container container-main"><div class="col-content"><div class="tsd-page-title"><h2>neocare - v1.0.1</h2></div><div class="tsd-panel tsd-typography"><p>Prepare o Ambiente para developer build.
<a href="https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&amp;device=simulated&amp;mode=development-build" target="_blank" class="external">https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&amp;device=simulated&amp;mode=development-build</a></p>
<p>Clone o projeto;</p>
<p>Execute a instalação das dependências com npm install, ou yarn install;</p>
<p>Compile o projeto com:
npx expo run:android ou npx expo run:iOS;</p>
<p>Possível erro na compilação;</p>
<p>Remover ou substituir o método useDefaultAndroidSdkVersions(): Abra o arquivo 'J:\neocare-app\node_modules\expo-splash-screen\android\build.gradle' e localize a linha que contém o método useDefaultAndroidSdkVersions(). Esse método parece obsoleto ou não compatível com a versão do Gradle/SDK que você está usando.</p>
<p>Para corrigir, comente ou remova a linha com esse método, ou, caso haja documentação de Expo ou Gradle sobre a nova abordagem, substitua o método.</p>
<p>groovy Copiar código // useDefaultAndroidSdkVersions() // Comente ou remova esta linha</p>
<p>Necessário o Node.js LTS instalado.
Necessário o JAVA SDK 17 instalado com sua variável de ambiente configurada.
Android Studio com variável de ambiente configurada;
Pixel 3a API 34 com Android 14 configurados no emulador;</p>
<p>Banco de dados local;
Autenticação, Database e Storage no Supabase (nuvem);
First-Local configurado pelo Powersync;</p>
<p>/project-root
│
├── /app
│ ├── /attendences
│ │ ├── _layout.tsx # Layout para o módulo de atendimentos
│ │ ├── index.tsx # Página para listar os atendimentos
│ │
│ ├── /auth
│ │ ├── _layout.tsx # Layout para autenticação
│ │ ├── index.tsx # Página de login
│ │
│ ├── /doctors
│ │ ├── _layout.tsx # Layout para a página inicial (dashboard)
│ │ ├── index.tsx # Página de gerenciamento de médicos
│ │
│ ├── /home
│ │ ├── _layout.tsx # Layout para a página inicial (dashboard)
│ │ ├── index.tsx # Página inicial (dashboard)
│ │
│ ├── /patients
│ │ ├── _layout.tsx # Layout para o módulo de pacientes
│ │ ├── index.tsx # Página de gerenciamento de pacientes
│
├── /assets # Arquivos de mídia, ícones, fontes, etc.
│
├── /components
│ ├── SwipeableRow.tsx # Componente para Swipeable Row (para deletar itens)
│
├── /powersync
│ ├── AppSchema.ts # Esquema do banco de dados do PowerSync
│ ├── PowerSync.tsx # Arquivo de configuração do PowerSync
│ ├── PowerSyncProvider.tsx # Provedor de contexto para PowerSync
│ ├── SupabaseConnector.ts # Conector entre Supabase e PowerSync
│
├── /utils
│ ├── uuid.ts # Função utilitária para gerar UUIDs
│
├── .env # Arquivo de variáveis de ambiente
├── .gitignore # Arquivo para ignorar arquivos no Git
├── app.json # Configurações do Expo
├── babel.config.js # Configurações do Babel
├── expo-env.d.ts # Declaração de tipos do Expo
├── metro.config.js # Configurações do Metro bundler
├── package.json # Configurações do npm
└── tsconfig.json # Configurações do TypeScript</p>
<p>Tabelas:</p>
<p>doctors: Armazena as informações dos médicos.
patients: Armazena os dados dos pacientes.
attendances: Armazena os prontuários de atendimento.
Funções:</p>
<p>Função que cria automaticamente um registro na tabela doctors ao criar um usuário.
Função que cria um prontuário em branco na tabela attendances ao criar um paciente.
Triggers:</p>
<p>Trigger para criar um médico na tabela doctors quando um novo usuário é criado.
Trigger para criar automaticamente um prontuário em branco ao cadastrar um paciente.
Row-Level Security (RLS):</p>
<p>Políticas de segurança para garantir que cada médico só possa ver os pacientes que ele criou ou os prontuários que ele atualizou.
PowerSync SyncRules:</p>
<p>Definir as regras de sincronização para o PowerSync para as tabelas envolvidas.</p>
<p>Comandos Expo;
npm install - Isntala as dependências do projeto
npm start - Inicia o servidor de desenvolvimento
npm run android - Inicia o app no emulador Android
npm run ios - Inicia o app no emulador iOS
npm run web - Inicia o app no navegador
npm run eject - Ejeta o Expo do projeto
npm run lint - Roda o linter
npm run format - Formata o código
npm run test - Roda os testes
npm run build - Gera o build de produção
npm run deploy - Faz o deploy do projeto
npm audit fix - Corrige vulnerabilidades de segurança
npm run sync - Sincroniza os dados com o Supabase
npm run powersync - Inicia o PowerSync
npm run powersync:reset - Reseta o PowerSync
npm run powersync:clean - Limpa o PowerSync
npm run powersync:seed - Semeia o PowerSync
npm run powersync:sync - Sincroniza o PowerSync
npm run powersync:status - Mostra o status do PowerSync
npm run powersync:logs - Mostra os logs do PowerSync
npm run powersync:stop - Para o PowerSync
npm run powersync:restart - Reinicia o PowerSync
npm run powersync:rebuild - Reconstroi o PowerSync
npm run powersync:reseed - Resemeia o PowerSync
npm run powersync:reseed:force - Resemeia o PowerSync forçadamente
npm run powersync:reseed:all - Resemeia todos os modelos do PowerSync
npm run powersync:reseed:all:force - Resemeia todos os modelos do PowerSync forçadamente
npm run powersync:reseed:all:force:clean - Resemeia todos os modelos do PowerSync forçadamente e limpa os dados
npm run powersync:reseed:all:force:clean:sync - Resemeia todos os modelos do PowerSync forçadamente, limpa os dados e sincroniza
npm run powersync:reseed:all:force:clean:sync:restart - Resemeia todos os modelos do PowerSync forçadamente, limpa os dados, sincroniza e reinicia</p>
<p>// <strong><strong><strong><strong><strong><strong><strong><strong><strong><strong><strong>____</strong></strong></strong></strong></strong></strong></strong></strong></strong></strong></strong></p>
<p>Comandos de reparo;
npx expo-doctor - Verifica e repara problemas no projeto
npm install -g sharp-cli@^2.1.0 - Instala o sharp-cli
npx expo-optimize - Otimiza o projeto para produção
npx expo-verify - Verifica a integridade do projeto
npx expo-whoami - Mostra o usuário logado no Expo
npx expo-updates - Atualiza o Expo CLI
npx expo-logout - Desloga do Expo
npx expo-login - Loga no Expo
npx expo-publish - Publica o projeto no Expo
npx expo-status - Mostra o status do projeto no Expo
npx expo-logs - Mostra os logs do projeto no Expo
npx expo-start - Inicia o projeto no Expo
npx expo-stop - Para o projeto no Expo
npx expo-restart - Reinicia o projeto no Expo
npx expo-build - Gera o build do projeto no Expo
npx expo-eject - Ejeta o projeto do Expo
npx expo-init - Inicia um novo projeto no Expo
npx expo-branch - Cria uma nova branch no Expo
npx expo-merge - Faz o merge de branches no Expo
npx expo-rollback - Faz o rollback do projeto no Expo
npx expo-destroy - Destrói o projeto no Expo
npx expo install --check - Verifica as dependências do projeto
npx expo install --force - Força a instalação das dependências do projeto
npx expo install --clean - Limpa as dependências do projeto</p>
</div></div><div class="col-sidebar"><div class="page-menu"><div class="tsd-navigation settings"><details class="tsd-accordion"><summary class="tsd-accordion-summary"><h3><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="assets/icons.svg#icon-chevronDown"></use></svg>Settings</h3></summary><div class="tsd-accordion-details"><div class="tsd-filter-visibility"><span class="settings-label">Member Visibility</span><ul id="tsd-filter-options"><li class="tsd-filter-item"><label class="tsd-filter-input"><input type="checkbox" id="tsd-filter-inherited" name="inherited" checked/><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><rect class="tsd-checkbox-background" width="30" height="30" x="1" y="1" rx="6" fill="none"></rect><path class="tsd-checkbox-checkmark" d="M8.35422 16.8214L13.2143 21.75L24.6458 10.25" stroke="none" stroke-width="3.5" stroke-linejoin="round" fill="none"></path></svg><span>Inherited</span></label></li></ul></div><div class="tsd-theme-toggle"><label class="settings-label" for="tsd-theme">Theme</label><select id="tsd-theme"><option value="os">OS</option><option value="light">Light</option><option value="dark">Dark</option></select></div></div></details></div></div><div class="site-menu"><nav class="tsd-navigation"><a href="modules.html" class="current"><svg class="tsd-kind-icon" viewBox="0 0 24 24"><use href="assets/icons.svg#icon-1"></use></svg><span>neocare - v1.0.1</span></a><ul class="tsd-small-nested-navigation" id="tsd-nav-container" data-base="."><li>Loading...</li></ul></nav></div></div></div><footer><p class="tsd-generator">Generated using <a href="https://typedoc.org/" target="_blank">TypeDoc</a></p></footer><div class="overlay"></div></body></html>
