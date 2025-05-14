import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // Método para obter todos os documentos de uma coleção
  getCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' });
  }

  // Método para obter um documento específico
  getDocument(collectionName: string, docId: string): Observable<any> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    return docData(docRef, { idField: 'id' });
  }

  // Método para adicionar um novo documento
  async addDocument(collectionName: string, data: any): Promise<any> {
    const collectionRef = collection(this.firestore, collectionName);
    return await addDoc(collectionRef, data);
  }

  // Método para atualizar um documento
  async updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    return await updateDoc(docRef, data);
  }

  // Método para deletar um documento
  async deleteDocument(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    return await deleteDoc(docRef);
  }
}
