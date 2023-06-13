"use client";
import { useState } from "react";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const route = useRouter();
  const [titulo, setTitulo] = useState();
  const [data_cadastro, setData_cadastro] = useState();
  const [preco, setPreco] = useState();
  const [descricao, setDescricao] = useState();
  const [imagem, setimagem] = useState("");

  const cadastrar = (e) => {
    e.preventDefault();

    const produto = {
      titulo: titulo,
      data_cadastro: data_cadastro,
      preco: preco,
      descricao: descricao,
      imagem: imagem,
    };
    const produtoJson = JSON.stringify(produto);
    fetch("http://localhost:3003/produto", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: produtoJson,
    })
      .then(function () {
        route.push("/");
      })
      .catch(() => console.log("Não foi possível cadastrar!"));
  };

  return (
    <div className={styles.main}>
      <form onSubmit={cadastrar}>
        <input
          type="text"
          placeholder="titulo:"
          nome="titulo"
          onChange={(e) => setTitulo(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Data:"
          name="data_cadastro"
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
            setData_cadastro(value);
          }}
        />
        <br />

        <input
          type="text"
          placeholder="Preço:"
          name="preco"
          pattern="^\d+(.|,)?\d{0,2}$"
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d.,]/g, ""); // Remove caracteres não numéricos, exceto ponto e vírgula
            setPreco(value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Descrição:"
          nome="descricao"
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="Imagem:"
          nome="imagem"
          onChange={(e) => setimagem(e.target.value)}
        />
        <br />
        <button type="submit">Cadastrar</button>
        <div>
          <a href="/">Voltar</a>
        </div>
      </form>
    </div>
  );
}
