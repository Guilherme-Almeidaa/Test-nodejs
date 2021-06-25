<body>
  <div>
    <h1>Rodar a aplicação</h1>
    <h4>Crie um arquivo <mark><code>.env</code></mark> na raíz do projeto com as informações do seu banco MySql como
      descrito abaixo:</h4>
    <code>HOSTNAME='localhost'</code><br>
    <code> MYSQL_USER='root'</code><br>
    <code> MYSQL_PASSWORD='Senha'</code><br>
    <code> MYSQL_NAME='Test-Nodejs'</code><br>
    <h3>No terminal rode os seguintes comandos:</h3>
    <h4> <code>npm install</code></h4>
    <h4> <code>npx sequelize-cli db:create</code></h4>
    <h4> <code>npx sequelize-cli db:migrate</code></h4>
    <h4> <code>npx sequelize-cli db:seed:all</code></h4>
  </div>
  <div>
    <h1>Requisições</h1>
    <h2>Exemplos</h2>
    <div>
      <div>
        <h3>GET <mark>/users</mark> Retorna todos os usuários cadastrados.</h3>
        <br>
        <img src="./images/users.png" width="300px" height="250px" alt="example">
      </div>
      <div>
        <h3>GET <mark>/users/2</mark> Retorna o usuário pelo campo "id".</h3>
        <br>
        <img src="./images/users:id.png" width="300px" alt="example">
      </div>
      <div>
        <h3>GET <mark>/users/search?q=Guilherme</mark> Retorna o usuário pelo campo "nome" ou "lastname".</h3>
        <br>
        <img src="./images/search.png" width="300px" alt="example">
      </div>
      <div>
        <h3>GET <mark>/users/nickname?q=Zeze</mark> Retorna o usuário pelo campo "nickname".</h3>
        <br>
        <img src="./images/nickname.png" width="300px" alt="example">
      </div>
      <div>
        <h3>POST <mark>/users/register</mark> Cadastra e retorna o usuário informado pelo corpo da requisição.</h3>
        <br>
        <img src="./images/register.png" width="500px" alt="example">
      </div>
      <div>
        <h3>PUT <mark>/users/register</mark> Atualiza o nickname informado pelo corpo da requisição E retorna o usuário
          atualizado.</h3>
        <br>
        <img src="./images/updatenick.png" width="500px" alt="example">
      </div>
      <div>
        <h3>PUT <mark>/users/2</mark> Atualiza o lastname e address informado pelo corpo da requisição E retorna o usuário
          atualizado.</h3>
        <br>
        <img src="./images/update.png" width="500px" alt="example">
      </div>
      <div>
        <h3>DELETE <mark>/users/3</mark> Deleta o usuário pelo id e não tem retorno.</h3>
        <br>
      </div>
    </div>
  </div>
</body>