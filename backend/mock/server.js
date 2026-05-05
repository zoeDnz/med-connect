const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));

// ---------------------------------------------------------------------------
// In-memory database — shapes identical to DRF with fields = '__all__'
// FK fields are stored/returned as the PK value of the related object
// ---------------------------------------------------------------------------
const db = {
  plano: [
    { cd_plano: 1, ds_plano: 'Básico', val_plano: 99.9 },
    { cd_plano: 2, ds_plano: 'Profissional', val_plano: 199.9 },
    { cd_plano: 3, ds_plano: 'Enterprise', val_plano: 499.9 },
  ],

  tipo_matmed: [
    { cd_tipo: 'MD01', ds_tipo: 'MEDICAMENTO' },
    { cd_tipo: 'MT01', ds_tipo: 'MATERIAL' },
    { cd_tipo: 'PD01', ds_tipo: 'PRODUTO' },
  ],

  marcas: [
    { cd_marca: 1, ds_marca: 'EMS' },
    { cd_marca: 2, ds_marca: 'Medley' },
    { cd_marca: 3, ds_marca: 'Eurofarma' },
  ],

  fornecedor: [
    { cd_fornecedor: 1, ds_fornecedor: 'Distribuidora Saúde Ltda', cnpj_fornc: '12.345.678/0001-90' },
    { cd_fornecedor: 2, ds_fornecedor: 'Pharma Supply S.A.', cnpj_fornc: '98.765.432/0001-10' },
  ],

  pessoa_juridica: [
    {
      cd_pessoaj: 1,
      nm_pessoaj: 'Hospital Central',
      email_pj: 'contato@hospitalcentral.com',
      senha_pj: 'hashed_password_1',
      resp_tec: 'Dr. Carlos Lima',
      nr_cnpj: '11.222.333/0001-44',
      razao_social: 'Hospital Central S.A.',
      ds_plano: 2,
    },
    {
      cd_pessoaj: 2,
      nm_pessoaj: 'Clínica Vida',
      email_pj: 'admin@clinicavida.com',
      senha_pj: 'hashed_password_2',
      resp_tec: 'Dra. Ana Souza',
      nr_cnpj: '55.666.777/0001-88',
      razao_social: 'Clínica Vida Ltda',
      ds_plano: 1,
    },
  ],

  mat_med: [
    { cd_mat: 1, ds_mat: 'Dipirona 500mg', ds_marca: 1, ds_tipo: 'MD01', ds_pessoaj: 1 },
    { cd_mat: 2, ds_mat: 'Seringa 10ml', ds_marca: 2, ds_tipo: 'MT01', ds_pessoaj: 1 },
    { cd_mat: 3, ds_mat: 'Álcool Gel 70%', ds_marca: 3, ds_tipo: 'PD01', ds_pessoaj: 2 },
  ],

  lote: [
    {
      nr_lote: 101,
      dt_fabricacao: '2024-01-15T08:00:00Z',
      dt_validade: '2026-01-15',
      qtd_lote: 500,
      unidade_med: 'CX',
      fornecedor: 1,
      cd_material: 1,
      cd_pessoaj: 1,
    },
    {
      nr_lote: 102,
      dt_fabricacao: '2024-03-10T10:00:00Z',
      dt_validade: '2027-03-10',
      qtd_lote: 1000,
      unidade_med: 'UN',
      fornecedor: 2,
      cd_material: 2,
      cd_pessoaj: 1,
    },
  ],

  negociacao: [
    {
      nr_negociacao: 1001,
      obs_negocia: 'Entrega urgente para UTI',
      qtd_matmed: 200,
      cd_mat: 1,
      cd_negociador: 1,
      cd_negociante: 2,
    },
  ],

  mensagens: [
    {
      cd_msg: 1,
      dt_registro: '2024-05-01T14:30:00Z',
      ds_msg: 'Podemos negociar o prazo de entrega?',
      cd_remetente: 1,
      cd_destinatario: 2,
      cd_negociacao: 1001,
    },
    {
      cd_msg: 2,
      dt_registro: '2024-05-01T15:00:00Z',
      ds_msg: 'Sim, conseguimos entregar em 3 dias úteis.',
      cd_remetente: 2,
      cd_destinatario: 1,
      cd_negociacao: 1001,
    },
  ],
};

// Auto-increment counters for POST
const counters = {
  mensagens: 3,
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
  const item = { ...req.body };
  db.fornecedor.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Lote  —  GET /lote/  POST /lote/
// ---------------------------------------------------------------------------
app.get('/lote/', requireAuth, (req, res) => res.json(db.lote));
app.post('/lote/', requireAuth, (req, res) => {
  const item = { ...req.body };
  db.lote.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// Marcas  —  GET /marcas/  POST /marcas/
// ---------------------------------------------------------------------------
app.get('/marcas/', requireAuth, (req, res) => res.json(db.marcas));
app.post('/marcas/', requireAuth, (req, res) => {
  const item = { ...req.body };
  db.marcas.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// MatMed  —  GET /mat_med/  POST /mat_med/  + detail CRUD on /mat_med/:pk
// ---------------------------------------------------------------------------
app.get('/mat_med/', requireAuth, (req, res) => res.json(db.mat_med));

app.post('/mat_med/', requireAuth, (req, res) => {
  const item = { ...req.body };
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
  const item = { ...req.body };
  db.negociacao.push(item);
  return res.status(201).json(item);
});

// ---------------------------------------------------------------------------
// PessoaJuridica  —  GET /pessoa_juridica/  POST /pessoa_juridica/
// ---------------------------------------------------------------------------
app.get('/pessoa_juridica/', requireAuth, (req, res) => res.json(db.pessoa_juridica));
app.post('/pessoa_juridica/', requireAuth, (req, res) => {
  const item = { ...req.body };
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
