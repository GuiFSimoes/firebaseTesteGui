import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Nomes { descricao: string; }
export interface NomesId extends Nomes { id: string; }

@Injectable()
export class NomesService {

    private pathDoc = 'lista-nomes/';
    private itensCollection: AngularFirestoreCollection<Nomes>;

    constructor(
        private afstore: AngularFirestore
    ) {
        this.itensCollection = this.afstore.collection<Nomes>(this.pathDoc);
    }

    getAll_values() {
        return this.itensCollection.valueChanges();
    }

    getAll_snapshot() {
        return this.itensCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Nomes;
                const id = a.payload.doc.id;
                return { id, ...data };
            })));
    }

    getKey(key: string) {
        return this.itensCollection.doc(key);
    }

    save(object: any, key?: any) {
        if (key) {
            this.itensCollection.doc(key).set(object);
        } else {
            this.itensCollection.add(object);
        }
    }
}
