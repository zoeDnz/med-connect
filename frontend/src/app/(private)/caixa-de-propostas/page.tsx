export default function PropostasPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">Caixa de Propostas</h1>
      
      <div className="space-y-6">
        {/* Card com borda lateral azul */}
        <div className="bg-white border border-zinc-200 p-6 rounded-2xl flex items-center justify-between shadow-sm border-l-4 border-l-blue-600">
          <div>
            <h3 className="font-bold text-lg text-zinc-900">Lote de Medicamento</h3>
            <p className="text-sm text-zinc-500 mb-3">Comprador: Hospital XYZ | Qtd: 10 unid.</p>
            <p className="text-sm text-zinc-400 line-through">R$ 750,00</p>
            <p className="text-green-600 font-bold text-lg">Oferta: R$ 480,00</p>
          </div>
          <div className="flex flex-col gap-2">
            <button className="px-6 py-2.5 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">Aceitar Proposta</button>
            <button className="px-6 py-2.5 border border-zinc-300 text-zinc-600 font-bold rounded-lg hover:bg-zinc-50 transition-colors">Recusar</button>
          </div>
        </div>
      </div>
    </div>
  )
}