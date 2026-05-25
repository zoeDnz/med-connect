export default function PublicarAnuncioPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Publicar Novo Anúncio</h1>
      <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Selecione o Lote</label>
            <select className="w-full p-3 rounded-lg border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-sky-500 outline-none">
              <option>Lote de Medicamentos #1000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Preço de Venda (R$)</label>
            <input type="number" className="w-full p-3 rounded-lg border border-zinc-200" placeholder="0,00" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Descrição</label>
            <textarea className="w-full p-3 rounded-lg border border-zinc-200 h-32"></textarea>
          </div>
          <button className="w-full bg-sky-950 text-white py-3 rounded-lg font-bold hover:bg-sky-900 transition-colors">
            Publicar Anúncio
          </button>
        </form>
      </div>
    </div>
  )
}