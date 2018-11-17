import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { BattleComponent } from './battle/battle';
@NgModule({
	declarations: [LoginComponent,
    BattleComponent],
	imports: [],
	exports: [LoginComponent,
    BattleComponent]
})
export class ComponentsModule {}
