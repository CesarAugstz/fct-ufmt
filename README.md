# Plataforma Web Reutilizável para Portais Institucionais

Uma plataforma moderna e adaptável desenvolvida como Sistema de Gestão de Conteúdo (CMS) destinada à modernização de portais institucionais, especialmente para faculdades e universidades.

## 🎯 Visão Geral

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso e apresenta uma solução genérica para instituições de ensino superior que utilizam portais desatualizados, de difícil manutenção e com usabilidade limitada. A plataforma permite que diferentes faculdades possam implantá-la com mínima necessidade de alteração no código-fonte.

### Implementação Piloto
Foi realizada uma implementação piloto para a **Faculdade de Ciência e Tecnologia (FCT)** da **Universidade Federal de Mato Grosso (UFMT)**, validando a eficácia da plataforma como uma solução escalável e de fácil manutenção.

## 🏗️ Arquitetura e Tecnologias

A plataforma foi desenvolvida com uma arquitetura de baixo acoplamento utilizando tecnologias modernas:

### Frontend
- **Next.js** - Framework full-stack React
- **TypeScript** - Para código robusto e de fácil manutenção
- **Tailwind CSS** - Estilização moderna e responsiva
- **Radix UI** - Componentes acessíveis
- **Framer Motion** - Animações e transições

### Backend e Dados
- **ZenStack** - Camada de autorização sobre Prisma ORM
- **Prisma ORM** - Modelagem e gerenciamento de dados
- **PostgreSQL** - Banco de dados principal
- **NextAuth.js** - Sistema de autenticação

### Funcionalidades Avançadas
- **APIs seguras** geradas automaticamente
- **Regras de acesso** centralizadas nos modelos de dados
- **Personalização visual** completa via interface administrativa
- **Sistema de upload** e gerenciamento de arquivos
- **Editor de conteúdo** com markdown support

## 👥 Perfis de Acesso

### 🌐 Área Pública
Acessível a todos os visitantes, permitindo visualizar:
- Informações sobre cursos (graduação e pós-graduação)
- Notícias institucionais
- Corpo docente e suas especialidades
- Páginas institucionais customizáveis
- Projetos de pesquisa e extensão
- FAQs organizados por categoria

### 🛠️ Painel Administrativo
Interface completa para administradores gerenciarem:
- **Conteúdo**: Cursos, notícias, páginas e navegação
- **Identidade Visual**: Cores, logotipo, banners
- **Dados Gerais**: Nome da instituição, sigla, informações de contato
- **Usuários**: Gerenciamento de professores e permissões
- **Personalização**: Temas claro/escuro, cores customizadas
- **Analytics**: Logs de sistema e monitoramento

### 👨‍🏫 Área do Docente
Portal exclusivo para professores atualizarem:
- Informações acadêmicas e pessoais
- Bibliografia e publicações
- Projetos de pesquisa e extensão
- Horários de atendimento
- Link para Currículo Lattes

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- pnpm (recomendado)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/cesaraugstz/fct-ufmt.git
cd fct-ufmt
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Configure o banco de dados:
```bash
pnpm update-db  # Gera o cliente Prisma e sincroniza o schema
pnpm seed-db    # Popula o banco com dados iniciais
```

5. Execute o servidor de desenvolvimento:
```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia o servidor de desenvolvimento com Turbopack
pnpm dev-clean    # Limpa cache e inicia o desenvolvimento
pnpm devc         # Alias para dev-clean

# Build e Deploy
pnpm build        # Cria build de produção
pnpm start        # Inicia servidor de produção

# Banco de Dados
pnpm update-db    # Gera cliente Prisma e sincroniza schema
pnpm seed-db      # Executa seed do banco de dados

# Qualidade de Código
pnpm lint         # Executa linting
pnpm typecheck    # Verifica tipos TypeScript
```

## 🎨 Personalização

A plataforma oferece personalização completa através do painel administrativo:

- **Cores**: Sistema de temas com suporte a modo claro/escuro
- **Logotipo**: Upload e gerenciamento de logos institucionais
- **Banners**: Configuração de banners principais e secundários
- **Links Rápidos**: Seções customizáveis na página inicial
- **Informações**: Dados gerais da instituição

## 🔧 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── admin/             # Painel administrativo
│   ├── home/              # Área pública
│   ├── login/             # Autenticação
│   └── api/               # Endpoints da API
├── components/            # Componentes reutilizáveis
│   ├── admin/            # Componentes administrativos
│   ├── home/             # Componentes da área pública
│   ├── common/           # Componentes compartilhados
│   └── ui/               # Componentes de interface
├── lib/                  # Utilitários e configurações
├── server/               # Configurações de servidor
├── store/                # Estado global (Zustand)
├── types/                # Definições de tipos TypeScript
└── utils/                # Funções utilitárias
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso e está disponível para uso acadêmico e institucional.

## 🏫 Sobre a FCT-UFMT

**Faculdade de Ciência e Tecnologia (FCT)**  
**Universidade Federal de Mato Grosso (UFMT)**

A implementação piloto deste projeto modernizou a presença digital da FCT-UFMT, consolidando a plataforma como uma solução eficaz para instituições de ensino superior.

---

**Desenvolvido com ❤️ para modernizar a educação superior**
