import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CardCreateGraphComponent } from './card-create-graph/card-create-graph.component';
import {MatCardModule} from '@angular/material/card';
import { StepperCreateGraphComponent } from './card-create-graph/stepper-create-graph/stepper-create-graph.component';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './home/home.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolbarComponent,
    CardCreateGraphComponent,
    StepperCreateGraphComponent,
    HomeComponent
  ],
    imports: [
        OverlayModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatExpansionModule,
        MatInputModule,
        MatTooltipModule,
        MatSelectModule,
        MatChipsModule,
        MatListModule,
        MatSliderModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
