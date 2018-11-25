import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { BattleComponent } from './battle/battle';
import { SelectionComponent } from './selection/selection';
@NgModule({
	declarations: [LoginComponent,
    BattleComponent,
    SelectionComponent],
	imports: [],
	exports: [LoginComponent,
    BattleComponent,
    SelectionComponent]
})
export class ComponentsModule {}
