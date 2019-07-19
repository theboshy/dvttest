import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from 'src/app/components/user/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CategoriaListComponent } from 'src/app/components/categoria/list/categoria.list.component';
import { Page404Component } from './components/page404/page404.component';
import { SelectorComponent } from 'src/app/components/selectorCountry/selector.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from 'src/app/components/categoria/categoria.component';
import { CategoriaEditComponent } from 'src/app/components/categoria/edit/categoria.edit.component';
import { CursoComponent } from 'src/app/components/curso/curso.component';
import { UserListComponent } from 'src/app/components/user/list/list.component';
import { FormsModule } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EstudianteCursoComponent } from 'src/app/components/estudiante/estudiante-curso/estudiante.curso.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SelectorDocumentComponent } from 'src/app/components/selectorDocument/selectorDocument.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstudianteComponent } from 'src/app/components/estudiante/estudiante.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertsModule } from 'angular-alert-module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateViaAuthGuard } from 'src/app/guards/def.guard';
import { DatePipe } from '@angular/common';



@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HeroComponent,
        RegisterComponent,
        Page404Component,
        SelectorComponent,
        SelectorDocumentComponent,
        LoginUserComponent,
        UserListComponent,
        CursoComponent,
        CategoriaComponent,
        CategoriaListComponent,
        CategoriaEditComponent,
        EstudianteCursoComponent,
        EstudianteComponent,
        TruncateTextPipe
    ],
    imports: [AlertsModule.forRoot(), ReactiveFormsModule, BrowserAnimationsModule,
    BsDatepickerModule.forRoot(), AccordionModule,
    TabsModule.forRoot(), BsDropdownModule.forRoot(), BrowserModule,
        AppRoutingModule, HttpClientModule, FormsModule, NgxSpinnerModule,
        NgxPaginationModule, BsDropdownModule.forRoot(), TabsModule.forRoot(), AccordionModule.forRoot()],
    providers: [DataApiService, SelectorDocumentComponent, CursoComponent, CanActivateViaAuthGuard ,DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
