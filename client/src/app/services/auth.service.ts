import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { UserInterface } from '../models/user-interface';
import { Observable, of } from 'rxjs';
import { ResponseInterface } from 'src/app/models/response-interface';
import { isNullOrUndefined } from 'util';
import { TypeDocumentInterface } from 'src/app/models/type-interface';
import { ContacInfoInterface } from 'src/app/models/contactinfo-interface';
import { UserRegister } from 'src/app/models/user-register-interface';

//import { ConsoleReporter } from 'jasmine';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private htttp: HttpClient) { }
    handleError(err) {
        console.log(err)
    }
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });



    registerCategoria(
        id : string,
        Nombre: string,
       
    ) {

      
        const url_api = 'http://localhost:3000/api/categoria';
        const modal = {} as ResponseInterface;
        return this.htttp.post<any>(url_api,
            {
                idCategoria: id,
                nombre: Nombre,
               

            }, { headers: this.headers })
            .pipe(
                map(result => {
                    if (!result) {
                       
                    } else {
                        
                    }
                }),
                catchError((err, caught) => {
                    var asd = [err]
                    return asd;
                })
            );
    }


    editCategoria(
        id: string,
        Nombre: string,

    ) {


        const url_api = 'http://localhost:3000/api/categoria';
        const modal = {} as ResponseInterface;
        return this.htttp.put<any>(url_api,
            {
                idCategoria: id,
                nombre: Nombre,


            }, { headers: this.headers })
            .pipe(
                map(result => {
                    if (!result) {

                    } else {

                    }
                }),
                catchError((err, caught) => {
                    var asd = [err]
                    return asd;
                })
            );
    }


    registerCurso(
        id: string,
        Nombre: string,
        IdCategoria: string,

    ) {


        const url_api = 'http://localhost:3000/api/cursos';
        const modal = {} as ResponseInterface;
        return this.htttp.post<any>(url_api,
            {
                idCurso: id,
                nombre: Nombre,
                categoria_idcategoria: IdCategoria

            }, { headers: this.headers })
            .pipe(
                map(result => {
                    if (!result) {

                    } else {

                    }
                }),
                catchError((err, caught) => {
                    var asd = [err]
                    return asd;
                })
            );
    }

    registerEstudiante(
        id: string,
        LastName: string,
        Name: string,
        email: string,
    ) {
        const url_api = 'http://localhost:3000/api/estudiantes';
        const modal = {} as ResponseInterface;
        return this.htttp.post<any>(url_api,
            {
                idEstudiante: id,
                apellido: LastName,
                nombre: Name,
                correo: email
            }, { headers: this.headers })
            .pipe(map((res: Response) => console.log("en json : " + res.json())),
                catchError((error: any) => {

                    modal.Status = error.status;
                    modal.IsError = true;
                    modal.Messages = error.error.error.details.messages;
                    if (error.status == 422) {
                        modal.Message = "Data duplication error";
                       
                    } else if (error.status == 500) {
                        modal.Message = "Internal server error ";
                    }
                    console.log(error)

                    return of(modal);
                }));
    }


    /*this.user.lastName,this.user.name,this.user.isMilitar,this.user.isTemporal
    /,this.user.username,this.user.email,this.user.password*/
    /*registerUser(
        id: string,
        LastName: string,
        Name: string,
        isMilitar: string,
        isTemporal: string,
        username: string,
        email: string,
        password: string
    ) {
        const url_api = 'http://localhost:3000/api/app-user-tbs';
        const modal = {} as ResponseInterface;
        return this.htttp.post<any>(url_api,
            {
                id: id,
                LastName: LastName,
                Name: Name,
                isMilitar: isMilitar,
                isTemporal: isTemporal,
                username: username,
                email: email,
                password: password,
                timeCreated: new Date()
            }, { headers: this.headers })
            .pipe(map((res: Response) => console.log("en json : " + res.json())),
                catchError((error: any) => {

                    modal.Status = error.status;
                    modal.IsError = true;
                    modal.Messages = error.error.error.details.messages;
                    if (error.status == 422) {
                        modal.Message = "Data duplication error";
                    } else if (error.status == 500) {
                        modal.Message = "Internal server error ";
                    }

                    return of(modal);
                }));
    }*/

    loginuser(email: string, password: string): Observable<any> {
        const url_api = "http://localhost:3000/api/app-user-tbs/login";
        const modal = {} as ResponseInterface;
        return this.htttp
            .post<UserInterface>(
                url_api,
                { email, password },
                { headers: this.headers }
            )
            .pipe(map(data => data));
    }


    setUser(user: UserInterface): void {
        let user_string = JSON.stringify(user);
        localStorage.setItem("currentUser", user_string);
    }

    setToken(token): void {
        localStorage.setItem("accessToken", token);
    }

    getToken() {
        return localStorage.getItem("accessToken");
    }

    getCurrentUser(): string {
        let user_string = localStorage.getItem("currentUser");
        if (!isNullOrUndefined(user_string)) {
            return user_string;
        } else {
            return null;
        }
    }

    logoutUser() {
        let accessToken = localStorage.getItem("accessToken");
        const url_api = `http://localhost:3000/api/app-user-tbs/logout?access_token=${accessToken}`;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        return this.htttp.post<UserInterface>(url_api, { headers: this.headers });
    }

    isLogged(): boolean {
        if (!isNullOrUndefined(this.getCurrentUser())) {
            return true;
        } else {
            return false;
        }

    }

}
