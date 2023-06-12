"use client"
import Link from 'next/link';
import './home.css'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

export default async function Home() {

  const req = await fetch("http://localhost:3003/produtos", {
    cache: "no-cache"
  });
  const produtos = await req.json();

  const formatarData = (date) => {
  return format(parseISO(date), "dd/MM/yyyy HH:mm", { locale: ptBR })
}

  return (
    <main> 
      <div className='cadastro'>
        <p>MultCoisas</p>
      <Link href="/cadastro" className='voltar'> CADASTRAR </Link>
      </div>


  <div className='produtos'>
  {produtos.map(produtos => (
    <div className='produto' key={produtos.id}>
      <div className='produto-imagem'>
        <img src={produtos.img} alt={produtos.titulo} />
      </div>
      <div className='produto-conteudo'>
        <p>{produtos.titulo}</p>
        <p>{formatarData(produtos.data_cadastro).slice(0, 10)}</p>
        <p>R$ {produtos.preco}</p>
        <p>{produtos.descricao}</p>
        <Link href={`/produto/${produtos.id}`}>ver mais</Link>
      </div>
    </div>
  ))}
      </div>
      
    </main>
  )
}

