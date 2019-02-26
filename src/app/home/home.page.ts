import { Component } from '@angular/core';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NomesService, Nomes, NomesId } from 'src/services/nomes/nomes.service';
import { Observable } from 'rxjs';

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

  nomeEdit: NomesId;
  listaNomes: Observable<Nomes[]>;
  listaNomesId: Observable<NomesId[]>;

  public usuarioLogado = {};
  public saida: any = {};

  constructor(
    private fbAuth: FirebaseAuthentication,
    private nomesService: NomesService
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
    this.listaNomesId = this.nomesService.getAll_snapshot();
  }

  public clicou(event) {
    // console.log('click item: ', event);
    this.nomeEdit = event;
    this.data.email = this.nomeEdit.descricao;
  }

  public adicionar() {
    if (this.nomeEdit) {
      const obj: Nomes = { descricao: this.data.email };
      this.nomesService.save(obj, this.nomeEdit.id);
    } else {
      const obj: Nomes = { descricao: this.data.email };
      this.nomesService.save(obj);
    }
    this.nomeEdit = null;
    this.data.email = '';
    this.data.senha = '';
  }

}
