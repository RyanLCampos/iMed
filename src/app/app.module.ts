import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CarrinhoPageModule } from './pages/carrinho/carrinho.module';
import { CarrinhoModalPageModule } from './pages/carrinho-modal/carrinho-modal.module';
import { HttpClientModule } from '@angular/common/http';
import { AccessProviders } from './providers/access-providers';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    CarrinhoModalPageModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AccessProviders
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  
  constructor(){ }
}
