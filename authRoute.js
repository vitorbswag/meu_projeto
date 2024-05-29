const express = require('express');
const router = express.Router();
const db = require('./db');

// Rota de login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  const query = 'SELECT * FROM users WHERE Email_User = ? AND Senha_User = ?';
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).send('Erro no servidor');
    }

    if (results.length > 0) {

      return res.redirect('/index.html');
    } else {

      return res.status(401).send('Credenciais inválidas');
    }
  });
});


// Rota de cadastro
router.post('/register', (req, res) => {
  const { email, senha, confsenha, nome, sobrenome } = req.body;

  console.log('Dados do usuário a ser cadastrado:', { email, senha, confsenha, nome, sobrenome });

  if (!email || !senha || !confsenha || !nome || !sobrenome) {
    console.error('Campos de registro incompletos:', { email, senha, confsenha, nome, sobrenome });
    return res.status(400).send('Todos os campos são obrigatórios!');
  }

  if (senha !== confsenha) {
    console.error('Senha e confirmação de senha não coincidem');
    return res.status(400).send('A senha e a confirmação de senha não coincidem!');
  }

  const query = 'INSERT INTO users (Nome_User, Sobrenome_User, Email_User, Senha_User) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, sobrenome, email, senha], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      return res.status(500).send('Erro no servidor');
    }

    req.session.user = {
      id: results.insertId,
      nome: nome
    };
    console.log('Novo usuário cadastrado com sucesso:', req.session.user);
    return res.redirect('/telalogin.html');
  });
});

module.exports = router;
