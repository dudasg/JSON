const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
const bancoEmMemoria = [
    {
  "tipoImovel": "Apartamento",
  "bairro": "Jardins",
  "quantidadeQuartos": 3,
  "possuiVagaGaragem": true,
  "valorAluguelMensal": 3800
}
];

// NÍVEL 1: Rota das cidades atendidas
app.get('/imobiliaria/cidades-atendidas', (req, res) => {
  res.json({
    "imobiliaria": "CasaNova Empreendimentos",
    "cidades": "São Paulo, Campinas, Santos",
    "creciJuridico": "J-34981",
    "plantaoVendas": true
  });
});

// Lista todos os imóveis cadastrados
app.get('/imobiliaria/imoveis', (req, res) => {
  res.json(bancoEmMemoria);
});
// Rota para inserir itens
app.post('/imobiliaria/imoveis', (req, res) => {
  const novoImovel = req.body;
  bancoEmMemoria.push(novoImovel);
  res.status(201).json({ mensagem: "Imóvel cadastrado com sucesso!", imovel: novoImovel });
});

app.post('/imobiliaria/imoveis', (req, res) => {
    const dados = req.body;

// Validação dos campos obrigatórios
if (
    !dados.tipoImovel || 
        !dados.bairro || 
        dados.quantidadeQuartos === undefined || 
        dados.possuiVagaGaragem === undefined || 
        !dados.valorAluguelMensal
    ) {    
    return res.status(400).json({
    sucesso: false,
    erro: "Campos obrigatórios ausentes no JSON!",
    camposExigidos: [
         "tipoImovel",
         "bairro",
         "quantidadeQuartos",
         "possuiVagaGaragem",
         "valorAluguelMensal"                   
    ]
});
}

    const novoImovel = {
        id: bancoEmMemoria.length + 1,
        tipoImovel: dados.tipoImovel,
        bairro: dados.bairro,
        quantidadeQuartos: Number(dados.quantidadeQuartos),
        possuiVagaGaragem: Boolean(dados.possuiVagaGaragem),
        valorAluguelMensal: Number(dados.valorAluguelMensal),
        criadoEm: new Date().toLocaleTimeString()
    };

    bancoEmMemoria.push(novoImovel);

    res.status(201).json({
        sucesso: true,
        mensagem: "Imóvel cadastrado com sucesso!",
        imovel: novoImovel
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});






