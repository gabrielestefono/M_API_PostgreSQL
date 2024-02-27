# API de Reservas de Quartos

Esta API foi desenvolvida como um projeto de aprendizado para integrar PostgreSQL com Node.js. Ela permite a gestão de reservas de quartos, incluindo autenticação de usuários, verificações de disponibilidade e muito mais. É importante notar que esta API serve apenas como backend, não possuindo uma interface gráfica.

## Funcionalidades

- **Autenticação de Usuários**: Utiliza bcrypt para hash de senhas, garantindo a segurança no acesso.
- **Gestão de Quartos**: Permite adicionar, visualizar, atualizar e remover quartos da base de dados.
- **Reservas**: Usuários podem fazer reservas de quartos, com verificações em tempo real para evitar sobreposições de reservas.
- **Verificação de Disponibilidade**: Antes de realizar uma reserva, a API verifica se o quarto está disponível no período desejado.

## Como Usar

### Pré-Requisitos

- Node.js instalado
- PostgreSQL instalado e configurado

### Instalação

1. Clone o repositório:
```
git clone <url-do-repositorio>
```
2. Instale as dependências:
```
npm install
```
3. Configure o banco de dados PostgreSQL no arquivo de configuração.

### Executando a API

Para iniciar o servidor, execute:
```
npm start
```

## Endpoints

Aqui você pode adicionar uma descrição dos endpoints disponíveis, como:

- `POST /api/bookings` - Cria uma nova reserva
- `GET /api/bookings` - Retorna todas as reservas
- `GET /api/auth/register` - Registra um novo usuário
- `POST /api/auth/login` - Autentica um usuário