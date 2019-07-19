import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SelectorDocumentComponent } from 'src/app/components/selectorDocument/selectorDocument.component';
import { UserInterface } from 'src/app/models/user-interface';
import { TypeDocumentInterface } from 'src/app/models/type-interface';
import { ContacInfoInterface } from 'src/app/models/contactinfo-interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import * as uuid from 'uuid';
import { ResponseInterface } from 'src/app/models/response-interface';
import { DataApiService } from 'src/app/services/data-api.service';
import { CursoInterface } from 'src/app/models/curso-interface';




@Component({
    selector: 'app-estudiante-curso',
    templateUrl: './estudiante.curso.component.html',
    styleUrls: ['./estudiante.curso.component.css']
})
export class EstudianteCursoComponent implements OnInit {
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
    public cursos = [];
    public correos = [];


    private tpdocument: TypeDocumentInterface = {
        TypeDocumentID: '',
        Document: '',
        PlaceExpedition: '',
        DateExpedition: ''
    };

    public estudiante: UserInterface = {
        email: '',
    };


    public user: CursoInterface = {
        Name: '',

        idCategoria: '', //idcurso
    };

    public isError = false;
    public msgError = '';

    private persistUser = false;
    private persistConatc = false;
    private persistDocument = false;

    errorObj = {} as ResponseInterface;

    ngOnInit() {
        this.dataApiService.getCursos().
            subscribe((data: any[]) => {
                console.log(data)
                this.cursos = data;
                this.cursos.unshift("");
            }, error => this.msgError = <any>error);

        //

        this.dataApiService.getCorreos().
            subscribe((data: any[]) => {
                console.log(data)
                this.correos = data;
                this.correos.unshift("");
            }, error => this.msgError = <any>error);
    }

    onRegister(form: NgForm): void {
        if (form.valid) {

            let userId = new Date().getUTCMilliseconds().toString();
            console.log(this.user)
            this.authService.registerEstudiante(userId, this.user.LastName,this.user.Name,  this.user.email).subscribe(                                                                                                                                                          
                
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
