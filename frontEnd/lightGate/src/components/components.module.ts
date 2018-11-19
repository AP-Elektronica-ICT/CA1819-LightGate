import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { BattleComponent } from './battle/battle';
import { JoinCreateComponent } from './join-create/join-create';
import { CreationOptionsComponent } from './creation-options/creation-options';
@NgModule({
	declarations: [LoginComponent,
    BattleComponent,
    JoinCreateComponent,
    CreationOptionsComponent],
	imports: [],
	exports: [LoginComponent,
    BattleComponent,
    JoinCreateComponent,
    CreationOptionsComponent]
})
export class ComponentsModule {}
