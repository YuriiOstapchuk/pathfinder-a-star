import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArenaComponent } from './arena/arena.component';
import { TerrainComponent } from './terrain/terrain.component';
import { AbsoluteObjectComponent } from './absolute-object/absolute-object.component';

@NgModule({
  declarations: [
    AppComponent,
    ArenaComponent,
    TerrainComponent,
    AbsoluteObjectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
