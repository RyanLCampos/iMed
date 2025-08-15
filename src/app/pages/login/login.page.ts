import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = "";
  senha:string = "";

  logado="";

  private api= "http://localhost/api/";
  
  constructor(
    private nav: NavController,
    private http:HttpClient,
    private router: Router
    ) { }

  //Entrar na pagina de Cadastro
  abrirPagina(x){
    this.nav.navigateForward(x)
  }

 

  ngOnInit() {
  }

  logar(){
    this.http.get<any[]>(this.api+"logar.php?email="+this.email+"&senha="+this.senha).subscribe(dados => {
      if(dados.length>0){
        this.logado=dados[0].nome;
        this.router.navigate(['/telainicial']);
      }
      console.log(dados);

    })
  }

}
