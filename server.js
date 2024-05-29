const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoute = require('./authRoute');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Middleware para proteger a rota de index.html
app.get('/index.html', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.redirect('/telalogin.html');
  }
});

app.get('/pagamento.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pagamento.html'));
});

// Rota para o formulário de cadastro
app.get('/telacad.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'telacad.html'));
});

// Rota para o formulário de login
app.get('/telalogin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'telalogin.html'));
});

// Rota para lidar com solicitações de login (método POST)
app.post('/auth/login', authRoute);

// Rotas de autenticação
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
