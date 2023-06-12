"use client"
import Link from 'next/link';
import './home.css'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { useRouter } from 'next/navigation';

export default async function Home() {
  const router = useRouter();
  const req = await fetch("http://localhost:3003/produtos", {
    cache: "no-cache"
  });
  const produtos = await req.json();

  const formatarData = (date) => {
    return format(parseISO(date), "dd/MM/yyyy HH:mm", { locale: ptBR })
  }
  
  const remover = (id) => {
    const codigo = { id: parseInt(id) }
    const idJson = JSON.stringify(codigo);

    try {
        fetch("http://localhost:3003/produtos", {
          method: "DELETE",
          headers: { 'content-type': 'application/json' },
          body: idJson
        })
        router.refresh();
    } catch (error) {
        console.log("Ocorreu um erro" + error)
    }
}
  return (
    <main> 
      <div className='cadastro'>
        <p>MultCoisas</p>
      <Link href="/cadastro" className='voltar'> CADASTRAR </Link>
      </div>


      {produtos.map(produtos => (
        <div key={produtos.id}>
            <p>{produtos.titulo}</p>
            <p>{formatarData(produtos.data_cadastro).slice(0, 10)}</p>
            <p>R$ {produtos.preco}</p>
            <p>{produtos.descricao}</p>
            <p>{produtos.img}</p>
          <Link href={`/produto/${produtos.id}`}>ver mais</Link>
          <button onClick={() => remover(produtos.id)}>excluir</button>
        </div>
      ))}
    </main>
  )
}

