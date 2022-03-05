import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FolderComponentComponent } from './folder-component/folder-component.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FolderComponentComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
