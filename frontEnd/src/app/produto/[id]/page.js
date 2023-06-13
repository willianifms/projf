'use client'
import '../produto.css';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default async function Produto({ params }) {
    const router = useRouter();
    const id = { id: parseInt(params.id) }

    const idJson = JSON.stringify(id);

    const req = await fetch("http://localhost:3003/produtos", {
        method: "POST",
        cache: "no-cache",
        headers: { 'content-type': 'application/json' },
        body: idJson
    })
    const produto = await req.json();

    const remover = () => {
        console.log(idJson)
        try {
            alert("Tem certeza de que quer excluir esse produto permanentemente?")
            fetch("http://localhost:3003/produtos", {
                method: "DELETE",
                headers: { 'content-type': 'application/json' },
                body: idJson
            })
            router.push("/");
        } catch (error) {
            alert("Ocorreu um erro" + error)
        }
    }

    return (
        <div class="product">
            <img class="product-image" src={produto.imagem} alt={produto.titulo}/>
        <h1 class="product-title">{produto.titulo}</h1>
        <p class="product-date">{produto.data_cadastro}</p>
        <p class="product-price">{produto.preco}</p>
        <p class="product-description">{produto.descricao}</p>
        
        <button class="product-button" onClick={remover}>Excluir</button>
        <a class="product-link" href="../">Voltar</a>
    </div>
    
      
    )
}