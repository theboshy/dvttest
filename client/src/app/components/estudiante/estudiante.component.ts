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




@Component({
    selector: 'app-estudiante',
    templateUrl: './estudiante.component.html',
    styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
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


    private tpdocument: TypeDocumentInterface = {
        TypeDocumentID: '',
        Document: '',
        PlaceExpedition: '',
        DateExpedition: ''
    };

    public contactInfo: ContacInfoInterface = {
        Address: '',
        City: '',
        Phone: '',
        CellPhone: '',
        EmergencyName: '',
        EmergencyPhone: '',
    };


    public user: UserInterface = {
        id: '',
        LastName: '',
        Name: '',
        isMilitar: '',
        isTemporal: '',
        username: '',
        email: '',
        password: '',
        timeCreated: ''
    };

    public isError = false;
    public msgError = '';

    private persistUser = false;
    private persistConatc = false;
    private persistDocument = false;

    errorObj = {} as ResponseInterface;

    ngOnInit() {
    }

    onRegister(form: NgForm): void {
        if (form.valid) {

            let userId = new Date().getUTCMilliseconds().toString();

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
