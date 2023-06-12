"use client"
import Link from 'next/link';
import './home.css'

export default async function Home() {

  const req = await fetch("http://localhost:3003/produtos", {
    cache: "no-cache"
  });
  const produtos = await req.json();


  return (
    <main> 
      <div className='cadastro'>
        <p>MultCoisas</p>
      <Link href="/cadastro" className='voltar'> CADASTRAR </Link>
      </div>

<section >
  <div className='produtos'>
      {produtos.map(produtos => (
        <div key={produtos.id}>
            <p>{produtos.titulo}</p>
            <p>{produtos.data_cadastro}</p>
            <p>R$ {produtos.preco}</p>
            <p>{produtos.descricao}</p>
            <p>{produtos.img}</p>
          <Link href={`/produto/${produtos.id}`}>ver mais</Link>
        </div>
      ))}
      </div>
      </section>
    </main>
  )
}

