const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/INFS', (req, res) => {
  const precoServico = parseFloat(req.body.preco);
  const cidade = req.body.cidade;

  let imposto;
  let taxa;

  if (cidade === 'sao_paulo') {
    imposto = calcularImpostoSaoPaulo(precoServico);
    taxa = 5;
  } else if (cidade === 'campinas') {
    imposto = calcularImpostoCampinas(precoServico);
    taxa = 2.5;
  }

  const total = precoServico + imposto;

  res.json({ empresa: req.body.empresa, imposto: imposto, taxa: taxa, total: total });
});

function calcularImpostoSaoPaulo(precoServico) {
  const aliquota = 0.05; // 5%
  const imposto = precoServico * aliquota;
  return imposto;
}

function calcularImpostoCampinas(precoServico) {
  const aliquota = 0.025; // 2.5%
  const imposto = precoServico * aliquota;
  return imposto;
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
