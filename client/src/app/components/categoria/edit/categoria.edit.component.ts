import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SelectorDocumentComponent } from 'src/app/components/selectorDocument/selectorDocument.component';
import { CategoriaInterface } from 'src/app/models/categoria-interface';
import { TypeDocumentInterface } from 'src/app/models/type-interface';
import { ContacInfoInterface } from 'src/app/models/contactinfo-interface';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AlertsService } from 'angular-alert-module';
import * as uuid from 'uuid';
import { ResponseInterface } from 'src/app/models/response-interface';
import { DataApiService } from 'src/app/services/data-api.service';




@Component({
    selector: 'app-categoria-edit',
    templateUrl: './categoria.edit.component.html'
  ]
})
export class CategoriaEditComponent implements OnInit {
    @ViewChild(SelectorDocumentComponent) selectDocumentView: SelectorDocumentComponent;
    constructor(private authService: AuthService,
        private location: Location,
        private router: ActivatedRoute,
        private alerts: AlertsService,
        private selectDocument: SelectorDocumentComponent,
        private dataApiService: DataApiService) {
    }

    public isDocumentFormValid = false;
    public isCountryFormValid = false;


    public user: CategoriaInterface = {
       
        Name: '',
       
    };

    public isError = false;
    public msgError = '';

    private persistUser = false;
    private persistConatc = false;
    private persistDocument = false;

    errorObj = {} as ResponseInterface;

    ngOnInit() {

        console.log(this.router.snapshot.queryParamMap.params.id);
    }

    onRegister(form: NgForm): void {
        if (form.valid) {

            let userId = this.router.snapshot.queryParamMap.params.id

            this.authService.editCategoria(userId, this.user.Name).subscribe(                                                                                                                                                          
                
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
