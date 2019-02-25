import { Component } from '@angular/core';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public data: any = {
    email: '',
    senha: ''
  };

  public usuarioLogado = {};

  public saida: any = {};

  constructor(
    private fbAuth: FirebaseAuthentication,
    private fbService: Firebase
  ) { }

  public logar() {
    this.fbAuth.signInWithEmailAndPassword(this.data.email, this.data.senha)
      .then((res: any) => {
        this.usuarioLogado = res;
        this.saida = null;
        console.log(res);

        

      })
      .catch((error: any) => {
        this.saida = error;
        this.usuarioLogado = null;
        console.error(error);
      });
  }

  public getData() {
    // this.fbService.
  }

}
