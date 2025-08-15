import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nome: string = "";
  email: string = "";
  senha: string = "";
  senha_2: string = ""; 
  desabilitarbotao;


  constructor(
    private nav: NavController, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private accsPrvds: AccessProviders,
    ) { }
  
  abrirPagina(x){
    this.nav.navigateForward(x);
  }
 

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.desabilitarbotao = false;
  }

  async tentarCadastrar(){
    if(this.nome==""){
      this.presentToast('Nome Obrigatrio');
    }else if(this.email==""){
      this.presentToast('Email Obrigatório');
    }else if(this.senha==""){
      this.presentToast('Senha Obrigatório');
    }else if(this.senha_2!=this.senha){
      this.presentToast('A senha não é a mesma');
    }else{
      this.desabilitarbotao = true;
      const loader = await this.loadingCtrl.create({
        message: 'Porfavor espere...',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          action: 'processo-cadastro',
          nome: this.nome,
          email: this.email,
          senha: this.senha
        }
        this.accsPrvds.postData(body, 'process_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.desabilitarbotao = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          }else{
            loader.dismiss();
            this.desabilitarbotao = false;
            this.presentToast(res.msg);
          }

        },(err)=>{
          loader.dismiss();
          this.desabilitarbotao = false;
          this.presentAlert('Cadastro Completo');
          this.router.navigate(['/login']);

        });
        
      });
    }


  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    await toast.present();
  }

  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Fechar',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        }
 
      ]
    });

    await alert.present();
  }
}
