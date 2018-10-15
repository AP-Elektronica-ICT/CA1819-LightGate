import { NgModule } from '@angular/core';
import { ObjectiveCreatorComponent } from './objective-creator/objective-creator';
import { ObjectiveListComponent } from './objective-list/objective-list';
@NgModule({
	declarations: [ObjectiveCreatorComponent,
    ObjectiveListComponent],
	imports: [],
	exports: [ObjectiveCreatorComponent,
    ObjectiveListComponent]
})
export class ComponentsModule {}
