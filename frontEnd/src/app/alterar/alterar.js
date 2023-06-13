'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";

export default async function Alterar({ params }) {
    const [novoTitulo, setNovoTitulo] = useState();
    const [novaData_cadastro, setNovaData_cadastro] = useState();
    const [novoPreco, setNovoPreco] = useState();
    const [novaDescricao, setNovaDescricao] = useState();
    const [novaImagem, setNovaImagem] = useState("");

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

    const alterar = (e) => {
        e.preventDefault();
        const produto = {
            titulo: novoTitulo,
            data_cadastro: novaData_cadastro,
            preco: novoPreco,
            descricao: novaDescricao,
            imagem: novaImagem,
        };
        const produtoJson = JSON.stringify(produto);
        fetch("http://localhost:3003/produto", {
            method: "UPDATE",
            headers: { "content-Type": "application/json" },
            body: produtoJson,
        })
        .then(function () {
            router.push("/");
        })
        .catch(() => console.log("Não foi possível alterar!"));    
    }
    return (
        <div>
            <form onSubmit={alterar}>
            <input
                  type="text"
                  placeholder={produto.titulo}
                  nome="titulo"
                  onChange={(e) => setNovoTitulo(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder={produto.data_cadastro}
                  name="data_cadastro"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                    setNovaData_cadastro(value);
                  }}
                />
                <br />
        
                <input
                  type="text"
                  placeholder={produto.preco}
                  name="preco"
                  pattern="^\d+(.|,)?\d{0,2}$"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.,]/g, ""); // Remove caracteres não numéricos, exceto ponto e vírgula
                    setNovoPreco(value);
                  }}
                />
                <br />
                <input
                  type="text"
                  placeholder={produto.descricao}
                  nome="descricao"
                  onChange={(e) => setNovaDescricao(e.target.value)}
                />
                <br />
        
                <input
                  type="text"
                  placeholder={produto.imagem}
                  nome="imagem"
                  onChange={(e) => setNovaImagem(e.target.value)}
                />
                <br />
                <button type="submit">alterar</button>
                <div>
                  <a href="/">Voltar</a>
                </div>
              </form>
            </div>

    )
}