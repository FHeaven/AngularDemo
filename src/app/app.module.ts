import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FoundationService, ProgCodeDataService, BaseApiService, GetLoginDataApiService } from 'app/services';
import { PipesModule } from 'app/pipes/pipes.module';
import { GetLoginDataResolver } from 'app/services/api/core/get-login-data.resolver';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        PipesModule
    ],
    providers: [
        ProgCodeDataService,
        BaseApiService,
        FoundationService,
        GetLoginDataApiService,
        GetLoginDataResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


