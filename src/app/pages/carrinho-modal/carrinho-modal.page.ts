import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarrinhoService, Produtos } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho-modal',
  templateUrl: './carrinho-modal.page.html',
  styleUrls: ['./carrinho-modal.page.scss'],
})
export class CarrinhoModalPage implements OnInit {

  carrinho: Produtos[] = [];

  constructor(private carrinhoService: CarrinhoService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.carrinho = this.carrinhoService.getCarrinho();
  }

  diminuirCarrinhoItem(produtos){
    this.carrinhoService.diminuirProdutos(produtos);
  }

  aumentarCarrinhoItem(produtos){
    this.carrinhoService.addProdutos(produtos);
  }

  removerCarrinhoItem(produtos){
    this.carrinhoService.removerProdutos(produtos);
  }

  getTotal(){
    return this.carrinho.reduce((i, j) => i + j.preco * j.quantidade, 0);
  }

  fechar(){
    this.modalCtrl.dismiss();
  }

  comprar(){
    
  }
}
