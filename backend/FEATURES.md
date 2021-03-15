
# Recuperação de senha:

** Requisitos Funcionais **
- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve receber instruções de como recuperar sua senha;
- O usuário deve poder resetar sua senha;

** Requisitos Não Funcionais **
- Utilizar Mailtrap para testar o envio de emails em ambiente de dev;
- Utilizar o Amazon SES para o envio de emails em ambiente de produção;
- O envio de email deve acontecer em segundo plano (background jobs);

** Regras de Negócio **
- O link enviado por email para resear a senha deve expirar em 30 min;
- O usuário deve confirmar a nova senha;

# Atualização do perfil:
** RF **
- O usuário deve poder atualizar seu nome, email e senha;

** RNF **
- 

** RN **
- O usuário não pode atualizar seu email para um email já utilizado;
- Para atualizar a senha, o usuário deve informar a senha antiga;
- Para atualizar a senha, o usuário precisa confirmar a nova senha;

# Painel do prestador:
** RF **
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

** RNF **
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongodb;
- As notificações do prestador devem ser enviadas em real-time com Socket.io;

** RN **
- A notificação deve ter um status de lida ou não lida;


# Agendamento de serviço:
** RF **
- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de 1 mês com os horários disponíveis de um prestador;
- O usuário deve poder listar os horários disponíveis em 1 dia do prestador;
- O usuário deve poder agendar um horário com um prestador;

** RNF **
- A listagem de prestadores deve ser armazenada em cache;

** RN **
- Cada agendamento deve durar 1h;
- Os agendamentos começar as 8h e terminam as 17h;
- O usuário não deve agendar em um horário já agendado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

