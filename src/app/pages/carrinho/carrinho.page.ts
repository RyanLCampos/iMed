import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CarrinhoModalPage } from '../carrinho-modal/carrinho-modal.page';
import { CarrinhoPageModule } from './carrinho.module';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  
  carrinho = [];
  produtos = [];
  carrinhoQuantidade: BehaviorSubject<number>;


  constructor(private carrinhoService: CarrinhoService, private modalCtrl: ModalController) { }
  
  ngOnInit(){
    this.produtos = this.carrinhoService.getProdutos();
    this.carrinho = this.carrinhoService.getCarrinho();
    this.carrinhoQuantidade = this.carrinhoService.getCarrinhoQuantidade();
  }

  addCarrinho(produtos){
    this.carrinhoService.addProdutos(produtos);
  }


  async abrirCarrinho(){
    let modal = await this.modalCtrl.create({
      component: CarrinhoModalPage,
      cssClass: 'carrinho-modal'
    });
    modal.present();
  }
}
