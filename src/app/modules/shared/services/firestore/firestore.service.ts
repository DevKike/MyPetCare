import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private readonly _ngFirestore: AngularFirestore) { }

  public async save(collection: string, data: any, documentId?: string): Promise<void> {
    try {
      if (documentId) {
        await this._ngFirestore
          .collection(collection)
          .doc(documentId)
          .set(data);
      } else {
        await this._ngFirestore.collection(collection).add(data);
      }
    } catch (error) {
      throw new Error(`Error saving document: ${error}`);
    }
  }

  public async saveSubCollection(collection: string, documentId: string, subCollection: string, data: any): Promise<void> {
    try {
      await this._ngFirestore.collection(collection).doc(documentId).collection(subCollection).add(data);
    } catch (error) {
      throw error;
    }
  }

  public getCollectionDocuments(collection: string): Observable<any[]> {
    const collectionRef = this._ngFirestore.collection(collection);

    return collectionRef.snapshotChanges().pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          const data = doc.payload.doc.data();
          const id = doc.payload.doc.id;
          return { id, ...(data ?? {}) };
        })
      )
    );
  }

  public getDocumentById(collection: string, documentId: string): Observable<any> {
    const docRef = this._ngFirestore.collection(collection).doc(documentId);

    return docRef.snapshotChanges().pipe(
      map((snapshot) => {
        if (snapshot.payload.exists) {
          return {
            id: snapshot.payload.id,
            ...(snapshot.payload.data() ?? {}),
          };
        } else {
          throw new Error(
            `Document ${documentId} does not exists in ${collection}`
          );
        }
      })
    );
  }

  public getDocumentsByQuery(collection: string, field: string, value: any): Observable<any[]> {
    const collectionRef = this._ngFirestore.collection(collection, ref => ref.where(field, '==', value));

    return collectionRef.snapshotChanges().pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          const data = doc.payload.doc.data();
          const id = doc.payload.doc.id;
          return { id, ...(data ?? {}) };
        })
      )
    );
  }

  public async update(collection: string, documentId: string, data: Partial<any>): Promise<void> {
    try {
      await this._ngFirestore
        .collection(collection)
        .doc(documentId)
        .update(data);
    } catch (error) {
      throw new Error(`Error updating collection: ${collection}, for documentId: ${documentId}`);
    }
  }

  public async delete(collection: string, documentId: string): Promise<void> {
    try {
      await this._ngFirestore.collection(collection).doc(documentId).delete();
    } catch (error) {
      throw new Error(`Error deleting collection: ${collection}, for documentId: ${documentId}`);
    }
  }
}
