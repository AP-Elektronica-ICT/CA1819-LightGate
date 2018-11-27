import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { BattleComponent } from './battle/battle';
import { JoinCreateComponent } from './join-create/join-create';
import { CreationOptionsComponent } from './creation-options/creation-options';
import { DeclareGuildNamesComponent } from './declare-guild-names/declare-guild-names';
@NgModule({
	declarations: [LoginComponent,
    BattleComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent],
	imports: [],
	exports: [LoginComponent,
    BattleComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent]
})
export class ComponentsModule {}
