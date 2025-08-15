import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Produtos {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}
@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  data: Produtos[] = [
    {id: 0, nome: 'Paracetamol', preco: 10.00, quantidade: 1},
    {id: 1, nome: 'Neosaldina', preco: 5.00, quantidade: 1},
    {id: 2, nome: 'Dorflex', preco: 8.00, quantidade: 1},
    {id: 3, nome: 'Engov', preco: 13.00, quantidade: 1},
  ];

  private carrinho = [];
  private carrinhoQuantidade = new BehaviorSubject(0);
  
  constructor() { }

  getProdutos() {
    return this.data;
  }

  getCarrinho() {
    return this.carrinho;
  }
  
  getCarrinhoQuantidade() {
    return this.carrinhoQuantidade;
  }

  addProdutos(produtos){
    let adicionado = false;
    for (let p of this.carrinho) {
      if (p.id === produtos.id) {
         p.quantidade += 1;
         adicionado = true;
         break  
      }
    }
    if(!adicionado) {
      this.carrinho.push(produtos);
    }
    this.carrinhoQuantidade.next(this.carrinhoQuantidade.value + 1);
  }

  diminuirProdutos(produtos){
    for (let [index, p] of this.carrinho.entries()) {
      if (p.id === produtos.id) {
        if(p.quantidade > 0){
         p.quantidade -= 1; 
        }
        if (p.quantidade == 0) {
          this.carrinho.splice(index, 1);
          p.quantidade = 1;
        }
      }
    }
    this.carrinhoQuantidade.next(this.carrinhoQuantidade.value - 1)
  }

  removerProdutos(produtos){
    for (let [index, p] of this.carrinho.entries()) {
      if (p.id === produtos.id) {
        this.carrinhoQuantidade.next(this.carrinhoQuantidade.value - p.quantidade);
        p.quantidade = p.quantidade - p.quantidade + 1
        this.carrinho.splice(index, 1);
      }
    }
  }
}
