import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ContacInfoInterface } from 'src/app/models/contactinfo-interface';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

    @ViewChild('formCountry') ngForm: NgForm;


    constructor(private dataApiService: DataApiService) {

    }

    public contactInfo: ContacInfoInterface = {
        CountryID: '',
        Address: '',
        City: '',
        Phone: '',
        CellPhone: '',
        EmergencyName: '',
        EmergencyPhone: '',
    };

    public coutr = [];
    public selectedCountry = '';
    public isError = false;
    public msgError = '';

    @Output() formCountryChangeEvent = new EventEmitter<boolean>();
    @Output() formCountryChangeDataEvent = new EventEmitter<ContacInfoInterface>();

    onRegisterFormChange(ngform: NgForm): void {
        ngform.form.valueChanges.subscribe(x => {
            this.formCountryChangeEvent.emit(ngform.valid && 0 !== this.contactInfo.CountryID.length);
            if (ngform.valid && 0 !== this.contactInfo.CountryID.length) {
                this.formCountryChangeDataEvent.emit(this.contactInfo);
            }
        });
    }

    ngOnInit() {
        this.onRegisterFormChange(this.ngForm);
        this.dataApiService.getCtrs().
            subscribe((data: any[]) => {
                this.coutr = data;
                this.coutr.unshift("");
            }, error => this.msgError = <any>error);
    }

    onRegister() { }

    onChange(newValue) {
        this.contactInfo.CountryID = newValue;
    }

}
