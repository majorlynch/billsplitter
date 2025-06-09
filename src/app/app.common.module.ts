 import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
           AngularFireDatabaseModule
    ],
    exports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ]
})
export class AppCommonModule { }