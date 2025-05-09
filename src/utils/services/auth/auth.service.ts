import { Injectable } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
  User,
} from '@angular/fire/auth';
import { setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { ICredentials } from 'src/@types/ICredentials';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  async login({ email, password }: ICredentials) {
    try {
      const user = await signInWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async register({ email, password }: ICredentials) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.firebaseAuth,
        email,
        password
      );
      return user;
    } catch (ex) {
      return null;
    }
  }

  logout() {
    return signOut(this.firebaseAuth);
  }
}