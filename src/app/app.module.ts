import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config/config.service';
import { SelectComponent } from './components/select/select.component';
import { IconComponent } from './components/icon/icon.component';
@NgModule({
  declarations: [AppComponent, SelectComponent, IconComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [ConfigService],
  bootstrap: [AppComponent],
})
export class AppModule {}
