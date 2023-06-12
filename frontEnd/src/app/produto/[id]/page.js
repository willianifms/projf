'use client'

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
        <div>
            <p>{produto.titulo}</p>
            <p>{produto.data_cadastro}</p>
            <p>{produto.preco}</p>
            <p>{produto.descricao}</p>
            <p>{produto.img}</p>
            <button onClick={remover}>Excluir</button>
            <a href="../">Voltar</a>
        </div>

    )
}