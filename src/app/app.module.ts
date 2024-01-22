import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { EditMarketListComponent } from './edit-market-list/edit-market-list.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    EditMarketListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule

  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT',
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
