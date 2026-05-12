const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'] }));

// ---------------------------------------------------------------------------
// In-memory database — shapes identical to DRF with fields = '__all__'
// FK fields are stored/returned as the PK value of the related object
// ---------------------------------------------------------------------------
const db = {
  // -------------------------------------------------------------------------
  // Plano — planos de assinatura da plataforma
  // -------------------------------------------------------------------------
  plano: [
    { cd_plano: 1, ds_plano: 'Básico',        val_plano: 149.90 },
    { cd_plano: 2, ds_plano: 'Profissional',   val_plano: 349.90 },
    { cd_plano: 3, ds_plano: 'Enterprise',     val_plano: 799.90 },
  ],

  // -------------------------------------------------------------------------
  // TipoMatMed — fixo pelo model (choices)
  // -------------------------------------------------------------------------
  tipo_matmed: [
    { cd_tipo: 'MD01', ds_tipo: 'MEDICAMENTO' },
    { cd_tipo: 'MT01', ds_tipo: 'MATERIAL'    },
    { cd_tipo: 'PD01', ds_tipo: 'PRODUTO'     },
  ],

  // -------------------------------------------------------------------------
  // Marcas — fabricantes de medicamentos/materiais
  // -------------------------------------------------------------------------
  marcas: [
    { cd_marca: 1, ds_marca: 'EMS'               },
    { cd_marca: 2, ds_marca: 'Medley'             },
    { cd_marca: 3, ds_marca: 'Eurofarma'          },
    { cd_marca: 4, ds_marca: 'Pfizer'             },
    { cd_marca: 5, ds_marca: 'Hypera Pharma'      },
    { cd_marca: 6, ds_marca: 'Cristália'          },
    { cd_marca: 7, ds_marca: 'Blau Farmacêutica'  },
    { cd_marca: 8, ds_marca: 'União Química'      },
  ],

  // -------------------------------------------------------------------------
  // Fornecedor — distribuidoras e fornecedores hospitalares
  // -------------------------------------------------------------------------
  fornecedor: [
    { cd_fornecedor: 1, ds_fornecedor: 'Distribuidora Saúde Ltda',          cnpj_fornc: '12.345.678/0001-90' },
    { cd_fornecedor: 2, ds_fornecedor: 'Pharma Supply S.A.',                cnpj_fornc: '98.765.432/0001-10' },
    { cd_fornecedor: 3, ds_fornecedor: 'MedDistrib Nordeste Ltda',          cnpj_fornc: '23.456.789/0001-35' },
    { cd_fornecedor: 4, ds_fornecedor: 'HospiFarma Comércio e Dist. S.A.',  cnpj_fornc: '34.567.890/0001-47' },
    { cd_fornecedor: 5, ds_fornecedor: 'Suprimed Distribuidora Ltda',       cnpj_fornc: '45.678.901/0001-52' },
    { cd_fornecedor: 6, ds_fornecedor: 'Alpha Med Soluções Hospitalares',   cnpj_fornc: '56.789.012/0001-68' },
  ],

  // -------------------------------------------------------------------------
  // PessoaJuridica — hospitais, clínicas e operadoras cadastradas
  // ds_plano → FK para plano.cd_plano
  // -------------------------------------------------------------------------
  pessoa_juridica: [
    {
      cd_pessoaj:   1,
      nm_pessoaj:   'Hospital Central',
      email_pj:     'compras@hospitalcentral.com.br',
      senha_pj:     'hashed_password_1',
      resp_tec:     'Dr. Carlos Lima',
      nr_cnpj:      '11.222.333/0001-44',
      razao_social: 'Hospital Central S.A.',
      ds_plano:     3,
    },
    {
      cd_pessoaj:   2,
      nm_pessoaj:   'Clínica Vida',
      email_pj:     'admin@clinicavida.com.br',
      senha_pj:     'hashed_password_2',
      resp_tec:     'Dra. Ana Souza',
      nr_cnpj:      '22.333.444/0001-55',
      razao_social: 'Clínica Vida Ltda',
      ds_plano:     1,
    },
    {
      cd_pessoaj:   3,
      nm_pessoaj:   'UPA Norte',
      email_pj:     'suprimentos@upanorte.gov.br',
      senha_pj:     'hashed_password_3',
      resp_tec:     'Dra. Fernanda Rocha',
      nr_cnpj:      '33.444.555/0001-66',
      razao_social: 'UPA Norte — Unidade de Pronto Atendimento',
      ds_plano:     2,
    },
    {
      cd_pessoaj:   4,
      nm_pessoaj:   'Hospital São Lucas',
      email_pj:     'almoxarifado@hsaolucas.com.br',
      senha_pj:     'hashed_password_4',
      resp_tec:     'Dr. Roberto Mendes',
      nr_cnpj:      '44.555.666/0001-77',
      razao_social: 'Hospital São Lucas Ltda',
      ds_plano:     3,
    },
    {
      cd_pessoaj:   5,
      nm_pessoaj:   'Clínica OdontoMed',
      email_pj:     'financeiro@odontomed.com.br',
      senha_pj:     'hashed_password_5',
      resp_tec:     'Dr. Paulo Alves',
      nr_cnpj:      '55.666.777/0001-88',
      razao_social: 'OdontoMed Clínica Odontológica S.A.',
      ds_plano:     1,
    },
  ],

  // -------------------------------------------------------------------------
  // MatMed — medicamentos, materiais e produtos
  // ds_marca → FK para marcas.cd_marca
  // ds_tipo  → FK para tipo_matmed.cd_tipo
  // ds_pessoaj → FK para pessoa_juridica.cd_pessoaj (quem cadastrou)
  // -------------------------------------------------------------------------
  mat_med: [
    // Medicamentos (MD01)
    { cd_mat:  1, ds_mat: 'Dipirona Sódica 500mg Comprimido',        ds_marca: 1, ds_tipo: 'MD01', ds_pessoaj: 1 },
    { cd_mat:  2, ds_mat: 'Amoxicilina 500mg Cápsula',               ds_marca: 2, ds_tipo: 'MD01', ds_pessoaj: 1 },
    { cd_mat:  3, ds_mat: 'Omeprazol 20mg Cápsula',                  ds_marca: 3, ds_tipo: 'MD01', ds_pessoaj: 1 },
    { cd_mat:  4, ds_mat: 'Metformina 850mg Comprimido',             ds_marca: 5, ds_tipo: 'MD01', ds_pessoaj: 2 },
    { cd_mat:  5, ds_mat: 'Atorvastatina 20mg Comprimido',           ds_marca: 4, ds_tipo: 'MD01', ds_pessoaj: 2 },
    { cd_mat:  6, ds_mat: 'Losartana Potássica 50mg Comprimido',     ds_marca: 1, ds_tipo: 'MD01', ds_pessoaj: 3 },
    { cd_mat:  7, ds_mat: 'AAS 100mg Comprimido Revestido',          ds_marca: 5, ds_tipo: 'MD01', ds_pessoaj: 3 },
    { cd_mat:  8, ds_mat: 'Azitromicina 500mg Comprimido',           ds_marca: 6, ds_tipo: 'MD01', ds_pessoaj: 4 },
    { cd_mat:  9, ds_mat: 'Ibuprofeno 600mg Comprimido',             ds_marca: 2, ds_tipo: 'MD01', ds_pessoaj: 4 },
    { cd_mat: 10, ds_mat: 'Paracetamol 750mg Comprimido',            ds_marca: 3, ds_tipo: 'MD01', ds_pessoaj: 5 },
    // Materiais (MT01)
    { cd_mat: 11, ds_mat: 'Seringa Descartável 10ml',                ds_marca: 7, ds_tipo: 'MT01', ds_pessoaj: 1 },
    { cd_mat: 12, ds_mat: 'Agulha Hipodérmica 40x12mm',             ds_marca: 7, ds_tipo: 'MT01', ds_pessoaj: 1 },
    { cd_mat: 13, ds_mat: 'Luva Cirúrgica Estéril Tamanho M',       ds_marca: 8, ds_tipo: 'MT01', ds_pessoaj: 2 },
    { cd_mat: 14, ds_mat: 'Curativo Adesivo 10x10cm',               ds_marca: 5, ds_tipo: 'MT01', ds_pessoaj: 3 },
    { cd_mat: 15, ds_mat: 'Cateter IV 20G',                          ds_marca: 7, ds_tipo: 'MT01', ds_pessoaj: 4 },
    { cd_mat: 16, ds_mat: 'Gaze Estéril 7,5x7,5cm Pacote 10un',    ds_marca: 8, ds_tipo: 'MT01', ds_pessoaj: 5 },
    // Produtos (PD01)
    { cd_mat: 17, ds_mat: 'Álcool Gel 70% 500ml',                   ds_marca: 6, ds_tipo: 'PD01', ds_pessoaj: 1 },
    { cd_mat: 18, ds_mat: 'Solução Fisiológica 0,9% 500ml',         ds_marca: 6, ds_tipo: 'PD01', ds_pessoaj: 2 },
    { cd_mat: 19, ds_mat: 'Água Oxigenada 10vol 1L',                ds_marca: 8, ds_tipo: 'PD01', ds_pessoaj: 3 },
    { cd_mat: 20, ds_mat: 'PVPI Degermante 1L',                     ds_marca: 7, ds_tipo: 'PD01', ds_pessoaj: 4 },
  ],

  // -------------------------------------------------------------------------
  // Lote
  // fornecedor  → FK para fornecedor.cd_fornecedor
  // cd_material → FK para mat_med.cd_mat
  // cd_pessoaj  → FK para pessoa_juridica.cd_pessoaj
  // -------------------------------------------------------------------------
  lote: [
    { nr_lote: 101, dt_fabricacao: '2024-01-15T08:00:00Z', dt_validade: '2026-06-15', qtd_lote:  500, unidade_med: 'CX', fornecedor: 1, cd_material:  1, cd_pessoaj: 1 },
    { nr_lote: 102, dt_fabricacao: '2024-03-10T10:00:00Z', dt_validade: '2027-03-10', qtd_lote: 1000, unidade_med: 'UN', fornecedor: 2, cd_material: 11, cd_pessoaj: 1 },
    { nr_lote: 103, dt_fabricacao: '2024-05-20T07:30:00Z', dt_validade: '2026-05-20', qtd_lote:  300, unidade_med: 'CX', fornecedor: 3, cd_material:  2, cd_pessoaj: 2 },
    { nr_lote: 104, dt_fabricacao: '2023-11-01T09:00:00Z', dt_validade: '2025-11-01', qtd_lote:  200, unidade_med: 'CX', fornecedor: 4, cd_material:  3, cd_pessoaj: 2 },
    { nr_lote: 105, dt_fabricacao: '2024-07-05T11:00:00Z', dt_validade: '2027-07-05', qtd_lote:  800, unidade_med: 'UN', fornecedor: 1, cd_material: 13, cd_pessoaj: 3 },
    { nr_lote: 106, dt_fabricacao: '2024-08-18T08:45:00Z', dt_validade: '2026-08-18', qtd_lote:  600, unidade_med: 'CX', fornecedor: 5, cd_material:  6, cd_pessoaj: 3 },
    { nr_lote: 107, dt_fabricacao: '2024-02-22T14:00:00Z', dt_validade: '2026-02-22', qtd_lote:  250, unidade_med: 'FR', fornecedor: 6, cd_material: 17, cd_pessoaj: 4 },
    { nr_lote: 108, dt_fabricacao: '2024-09-30T10:30:00Z', dt_validade: '2028-09-30', qtd_lote: 1500, unidade_med: 'UN', fornecedor: 2, cd_material: 18, cd_pessoaj: 4 },
    { nr_lote: 109, dt_fabricacao: '2024-04-12T09:15:00Z', dt_validade: '2027-04-12', qtd_lote:  400, unidade_med: 'CX', fornecedor: 3, cd_material:  8, cd_pessoaj: 5 },
    { nr_lote: 110, dt_fabricacao: '2024-06-01T07:00:00Z', dt_validade: '2026-06-01', qtd_lote:  700, unidade_med: 'UN', fornecedor: 4, cd_material: 12, cd_pessoaj: 1 },
    { nr_lote: 111, dt_fabricacao: '2025-01-10T08:00:00Z', dt_validade: '2027-01-10', qtd_lote:  350, unidade_med: 'CX', fornecedor: 5, cd_material:  5, cd_pessoaj: 2 },
    { nr_lote: 112, dt_fabricacao: '2025-03-05T11:30:00Z', dt_validade: '2028-03-05', qtd_lote:  900, unidade_med: 'UN', fornecedor: 6, cd_material: 15, cd_pessoaj: 3 },
  ],

  // -------------------------------------------------------------------------
  // Negociacao
  // cd_mat        → FK para mat_med.cd_mat
  // cd_negociador → FK para pessoa_juridica.cd_pessoaj (quem oferta)
  // cd_negociante → FK para pessoa_juridica.cd_pessoaj (quem solicita)
  // -------------------------------------------------------------------------
  negociacao: [
    { nr_negociacao: 1001, obs_negocia: 'Entrega urgente para UTI — necessidade imediata',                    qtd_matmed: 200, cd_mat:  1, cd_negociador: 1, cd_negociante: 2 },
    { nr_negociacao: 1002, obs_negocia: 'Reposição mensal de seringas para centro cirúrgico',                 qtd_matmed: 500, cd_mat: 11, cd_negociador: 2, cd_negociante: 3 },
    { nr_negociacao: 1003, obs_negocia: 'Compra de antibiótico para estoque farmácia interna',               qtd_matmed: 150, cd_mat:  2, cd_negociador: 3, cd_negociante: 4 },
    { nr_negociacao: 1004, obs_negocia: 'Solicitação de cateter IV para pronto-socorro',                     qtd_matmed: 300, cd_mat: 15, cd_negociador: 4, cd_negociante: 5 },
    { nr_negociacao: 1005, obs_negocia: 'Fornecimento de solução fisiológica para hemodiálise',              qtd_matmed: 800, cd_mat: 18, cd_negociador: 1, cd_negociante: 4 },
    { nr_negociacao: 1006, obs_negocia: 'Aquisição de luvas cirúrgicas para kit de procedimento mensal',    qtd_matmed: 400, cd_mat: 13, cd_negociador: 5, cd_negociante: 1 },
  ],

  // -------------------------------------------------------------------------
  // Mensagens
  // cd_remetente    → FK para pessoa_juridica.cd_pessoaj
  // cd_destinatario → FK para pessoa_juridica.cd_pessoaj
  // cd_negociacao   → FK para negociacao.nr_negociacao
  // -------------------------------------------------------------------------
  mensagens: [
    // Negociação 1001
    { cd_msg:  1, dt_registro: '2026-04-28T09:00:00Z', ds_msg: 'Boa tarde! Gostaríamos de negociar 200 caixas de Dipirona 500mg. Vocês têm disponibilidade imediata?',                    cd_remetente: 2, cd_destinatario: 1, cd_negociacao: 1001 },
    { cd_msg:  2, dt_registro: '2026-04-28T09:45:00Z', ds_msg: 'Olá! Temos em estoque. Podemos entregar em 2 dias úteis. Valor unitário R$12,50. Confirmamos o pedido?',                  cd_remetente: 1, cd_destinatario: 2, cd_negociacao: 1001 },
    { cd_msg:  3, dt_registro: '2026-04-28T10:10:00Z', ds_msg: 'Confirmado. Pode emitir a nota fiscal para o CNPJ 22.333.444/0001-55.',                                                    cd_remetente: 2, cd_destinatario: 1, cd_negociacao: 1001 },
    // Negociação 1002
    { cd_msg:  4, dt_registro: '2026-04-29T08:15:00Z', ds_msg: 'Prezados, necessitamos de 500 unidades de seringas 10ml para reposição mensal. Qual o prazo de entrega?',                 cd_remetente: 3, cd_destinatario: 2, cd_negociacao: 1002 },
    { cd_msg:  5, dt_registro: '2026-04-29T09:00:00Z', ds_msg: 'Prazo de 3 dias úteis. Valor R$1,80 por unidade, desconto de 5% no volume solicitado. Aguardamos confirmação.',           cd_remetente: 2, cd_destinatario: 3, cd_negociacao: 1002 },
    { cd_msg:  6, dt_registro: '2026-04-29T09:30:00Z', ds_msg: 'Aceito o valor com desconto. Por favor enviar fatura para suprimentos@upanorte.gov.br.',                                   cd_remetente: 3, cd_destinatario: 2, cd_negociacao: 1002 },
    // Negociação 1003
    { cd_msg:  7, dt_registro: '2026-04-30T10:00:00Z', ds_msg: 'Bom dia. Precisamos de Amoxicilina 500mg, 150 caixas, para estoque da farmácia. Têm disponibilidade?',                   cd_remetente: 4, cd_destinatario: 3, cd_negociacao: 1003 },
    { cd_msg:  8, dt_registro: '2026-04-30T10:50:00Z', ds_msg: 'Sim, disponível. Entrega em 4 dias úteis, R$18,00/cx. Posso enviar proposta formal por e-mail?',                          cd_remetente: 3, cd_destinatario: 4, cd_negociacao: 1003 },
    // Negociação 1004
    { cd_msg:  9, dt_registro: '2026-05-01T07:30:00Z', ds_msg: 'Urgente: precisamos de 300 cateteres IV 20G para o pronto-socorro. Entrega até amanhã é possível?',                       cd_remetente: 5, cd_destinatario: 4, cd_negociacao: 1004 },
    { cd_msg: 10, dt_registro: '2026-05-01T08:00:00Z', ds_msg: 'Conseguimos entregar até amanhã antes das 12h. Valor R$4,50/un. Confirma endereço de entrega?',                           cd_remetente: 4, cd_destinatario: 5, cd_negociacao: 1004 },
    { cd_msg: 11, dt_registro: '2026-05-01T08:20:00Z', ds_msg: 'Confirmado. Endereço: Av. Principal, 1500 — Pronto-Socorro, CEP 60000-000. Obrigado pela agilidade!',                    cd_remetente: 5, cd_destinatario: 4, cd_negociacao: 1004 },
    // Negociação 1005
    { cd_msg: 12, dt_registro: '2026-05-02T11:00:00Z', ds_msg: 'Precisamos de 800 frascos de SF 0,9% 500ml para o setor de hemodiálise. Qual o seu melhor preço?',                       cd_remetente: 4, cd_destinatario: 1, cd_negociacao: 1005 },
    { cd_msg: 13, dt_registro: '2026-05-02T11:45:00Z', ds_msg: 'Para esse volume, oferecemos R$5,20/fr com entrega em 5 dias úteis e frete incluso. Aceita?',                             cd_remetente: 1, cd_destinatario: 4, cd_negociacao: 1005 },
    // Negociação 1006
    { cd_msg: 14, dt_registro: '2026-05-03T14:00:00Z', ds_msg: 'Gostaríamos de adquirir 400 pares de luvas cirúrgicas tamanho M para o kit mensal de procedimento. Disponível?',         cd_remetente: 1, cd_destinatario: 5, cd_negociacao: 1006 },
  ],
};

// Auto-increment counters for POST
const counters = {
  fornecedor:     7,
  marcas:         9,
  mat_med:       21,
  lote:         113,
  negociacao:  1007,
  mensagens:     15,
  pessoa_juridica: 6,
};

// ---------------------------------------------------------------------------
// Auth middleware — replicates DRF JWTAuthentication 401 response
// ---------------------------------------------------------------------------
function requireAuth(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ detail: 'Authentication credentials were not provided.' });
  }
  next();
}

// ---------------------------------------------------------------------------
// Helper: build generic list+create handler
// ---------------------------------------------------------------------------
function listCreate(collection, pkField) {
  return {
    list: (req, res) => res.json(db[collection]),
    create: (req, res) => {
      const item = { ...req.body };
      if (collection === 'mensagens') {
        item.cd_msg = counters.mensagens++;
        item.dt_registro = new Date().toISOString();
      }
      db[collection].push(item);
      return res.status(201).json(item);
    },
  };
}

// ---------------------------------------------------------------------------
// Authentication routes (no auth required)
// ---------------------------------------------------------------------------

// POST /authentication/token/
app.post('/authentication/token/', (req, res) => {
  // Accept any credentials — mirrors the Django endpoint behavior in dev
  return res.json({
    access: 'fake-access-token',
    refresh: 'fake-refresh-token',
  });
});

// POST /authentication/token/refresh/
app.post('/authentication/token/refresh/', (req, res) => {
  const { refresh } = req.body;
  if (!refresh) {
    return res.status(400).json({ refresh: ['This field is required.'] });
  }
  return res.json({ access: 'fake-access-token' });
});

// POST /authentication/token/verify/
app.post('/authentication/token/verify/', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ token: ['This field is required.'] });
  }
  return res.json({});
});

// ---------------------------------------------------------------------------
// Fornecedor  —  GET /fornecedor/  POST /fornecedor/
// ---------------------------------------------------------------------------
app.get('/fornecedor/', requireAuth, (req, res) => res.json(db.fornecedor));
app.post('/fornecedor/', requireAuth, (req, res) => {
  const item = { ...req.body, cd_fornecedor: counters.fornecedor++ };
  db.fornecedor.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Lote  —  GET /lote/  POST /lote/
// ---------------------------------------------------------------------------
app.get('/lote/', requireAuth, (req, res) => res.json(db.lote));
app.post('/lote/', requireAuth, (req, res) => {
  const item = { ...req.body, nr_lote: counters.lote++ };
  db.lote.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Marcas  —  GET /marcas/  POST /marcas/
// ---------------------------------------------------------------------------
app.get('/marcas/', requireAuth, (req, res) => res.json(db.marcas));
app.post('/marcas/', requireAuth, (req, res) => {
  const item = { ...req.body, cd_marca: counters.marcas++ };
  db.marcas.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// MatMed  —  GET /mat_med/  POST /mat_med/  + detail CRUD on /mat_med/:pk
// ---------------------------------------------------------------------------
app.get('/mat_med/', requireAuth, (req, res) => res.json(db.mat_med));

app.post('/mat_med/', requireAuth, (req, res) => {
  const item = { ...req.body, cd_mat: counters.mat_med++ };
  db.mat_med.push(item);
  return res.status(201).json(item);
});

app.get('/mat_med/:pk', requireAuth, (req, res) => {
  const pk = parseInt(req.params.pk, 10);
  const item = db.mat_med.find((m) => m.cd_mat === pk);
  if (!item) return res.status(404).json({ detail: 'Not found.' });
  return res.json(item);
});

app.put('/mat_med/:pk', requireAuth, (req, res) => {
  const pk = parseInt(req.params.pk, 10);
  const idx = db.mat_med.findIndex((m) => m.cd_mat === pk);
  if (idx === -1) return res.status(404).json({ detail: 'Not found.' });
  db.mat_med[idx] = { ...req.body, cd_mat: pk };
  return res.json(db.mat_med[idx]);
});

app.patch('/mat_med/:pk', requireAuth, (req, res) => {
  const pk = parseInt(req.params.pk, 10);
  const idx = db.mat_med.findIndex((m) => m.cd_mat === pk);
  if (idx === -1) return res.status(404).json({ detail: 'Not found.' });
  db.mat_med[idx] = { ...db.mat_med[idx], ...req.body };
  return res.json(db.mat_med[idx]);
});

app.delete('/mat_med/:pk', requireAuth, (req, res) => {
  const pk = parseInt(req.params.pk, 10);
  const idx = db.mat_med.findIndex((m) => m.cd_mat === pk);
  if (idx === -1) return res.status(404).json({ detail: 'Not found.' });
  db.mat_med.splice(idx, 1);
  return res.status(204).send();
});

// ---------------------------------------------------------------------------
// Mensagens  —  GET /mensagens/  POST /mensagens/
// ---------------------------------------------------------------------------
app.get('/mensagens/', requireAuth, (req, res) => res.json(db.mensagens));
app.post('/mensagens/', requireAuth, (req, res) => {
  const item = {
    ...req.body,
    cd_msg: counters.mensagens++,
    dt_registro: new Date().toISOString(),
  };
  db.mensagens.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Negociacao  —  GET /negociacao/  POST /negociacao/
// ---------------------------------------------------------------------------
app.get('/negociacao/', requireAuth, (req, res) => res.json(db.negociacao));
app.post('/negociacao/', requireAuth, (req, res) => {
  const item = { ...req.body, nr_negociacao: counters.negociacao++ };
  db.negociacao.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// PessoaJuridica  —  GET /pessoa_juridica/  POST /pessoa_juridica/
// ---------------------------------------------------------------------------
app.get('/pessoa_juridica/', requireAuth, (req, res) => res.json(db.pessoa_juridica));
app.post('/pessoa_juridica/', requireAuth, (req, res) => {
  const item = { ...req.body, cd_pessoaj: counters.pessoa_juridica++ };
  db.pessoa_juridica.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Plano  —  GET /plano/  POST /plano/
// ---------------------------------------------------------------------------
app.get('/plano/', requireAuth, (req, res) => res.json(db.plano));
app.post('/plano/', requireAuth, (req, res) => {
  const item = { ...req.body };
  db.plano.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// TipoMatMed  —  GET /tipo_matmed/  POST /tipo_matmed/
// ---------------------------------------------------------------------------
app.get('/tipo_matmed/', requireAuth, (req, res) => res.json(db.tipo_matmed));
app.post('/tipo_matmed/', requireAuth, (req, res) => {
  const item = { ...req.body };
  db.tipo_matmed.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log('  POST   /authentication/token/');
  console.log('  POST   /authentication/token/refresh/');
  console.log('  POST   /authentication/token/verify/');
  console.log('  GET    POST /fornecedor/');
  console.log('  GET    POST /lote/');
  console.log('  GET    POST /marcas/');
  console.log('  GET    POST /mat_med/');
  console.log('  GET    PUT  PATCH  DELETE /mat_med/:pk');
  console.log('  GET    POST /mensagens/');
  console.log('  GET    POST /negociacao/');
  console.log('  GET    POST /pessoa_juridica/');
  console.log('  GET    POST /plano/');
  console.log('  GET    POST /tipo_matmed/');
});
