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


      <div className='produto'>
        {produtos.map(produtos => (
          <div className='produto-card' key={produtos.id}>
            <div className='produto-imagem'>
              <img className='imagem-produto' src={produtos.imagem} alt={produtos.titulo} />
            </div>
            <div className='produto-conteudo'>
              <h3 className='produto-titulo'>{produtos.titulo.slice(0, 50)}</h3>
              <p className='produto-data'>{formatarData(produtos.data_cadastro).slice(0, 10)}</p>
              <p className='produto-preco'>R$ {produtos.preco}</p>
              {/*<p className='produto-descricao'>{produtos.descricao.slice(0, 100)}</p> */}
              <div className='socorro'>
                <Link href={`/produto/${produtos.id}`} className='ver-mais-linkV'>ver mais</Link>
                <Link href={`/alterar/${produtos.id}`} className='ver-mais-linkA'>alterar</Link>
                <button onClick={() => remover(produtos.id)} className='excluir-button'>excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>


    </main>
  )
}

