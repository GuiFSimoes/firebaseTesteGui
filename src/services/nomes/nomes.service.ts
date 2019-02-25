import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

@Injectable()
export class NomesService {

    private pathDoc = 'lista-nomes/';

    constructor(
        private afstore: AngularFirestore
    ) { }

    getAll() {
        return this.afstore.collection(this.pathDoc).valueChanges();
    }

    getKey(key: string) {
        return this.afstore.doc(this.pathDoc + key).get();
    }

    save(object: any) {
        if (object.key) {
            // this.afstore.collection()
        }
    }
}
