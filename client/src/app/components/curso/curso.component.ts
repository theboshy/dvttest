import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SelectorDocumentComponent } from 'src/app/components/selectorDocument/selectorDocument.component';
import { CursoInterface } from 'src/app/models/curso-interface';
import { TypeDocumentInterface } from 'src/app/models/type-interface';
import { ContacInfoInterface } from 'src/app/models/contactinfo-interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import * as uuid from 'uuid';
import { ResponseInterface } from 'src/app/models/response-interface';
import { DataApiService } from 'src/app/services/data-api.service';




@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
    @ViewChild(SelectorDocumentComponent) selectDocumentView: SelectorDocumentComponent;
    constructor(private authService: AuthService,
        private location: Location,
        private router: Router,
        private alerts: AlertsService,
        private selectDocument: SelectorDocumentComponent,
        private dataApiService: DataApiService) {
    }

    public isDocumentFormValid = false;
    public isCountryFormValid = false;


    public user: CursoInterface = {
       
        Name: '',

        idCategoria: '',
       
    };

    public cursos = [];

    public isError = false;
    public msgError = '';

    private persistUser = false;
    private persistConatc = false;
    private persistDocument = false;

    errorObj = {} as ResponseInterface;

    ngOnInit() {
        this.dataApiService.getCategorias().
            subscribe((data: any[]) => {
                console.log(data)
                this.cursos = data;
                this.cursos.unshift("");
            }, error => this.msgError = <any>error);
    }

    onRegister(form: NgForm): void {
        //console.log(this.user.idCategoria)
        if (form.valid) {

            let userId = new Date().getUTCMilliseconds().toString();

            this.authService.registerCurso(userId, this.user.Name, this.user.idCategoria).subscribe(                                                                                                                                                          
                
                (errr: any) => {
                    this.onSucc();
                },
                (succs: any) => {
                    this.onSucc();
                }
                
                );

        } else {

        }
    }

   
    onSucc() {
        this.alerts.setMessage('Saved successfully!', 'success');
    }


    
}
