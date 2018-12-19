import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { BattleComponent } from './battle/battle';
import { SelectionComponent } from './selection/selection';
import { JoinCreateComponent } from './join-create/join-create';
import { CreationOptionsComponent } from './creation-options/creation-options';
import { DeclareGuildNamesComponent } from './declare-guild-names/declare-guild-names';
import { SelectBattleScreenComponent } from './select-battle-screen/select-battle-screen';
import { EnterPlayernameComponent } from './enter-playername/enter-playername';

@NgModule({
	declarations: [LoginComponent,
    BattleComponent,
    SelectionComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    SelectBattleScreenComponent,
    EnterPlayernameComponent],
	imports: [],
	exports: [LoginComponent,
    BattleComponent,
    SelectionComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    SelectBattleScreenComponent,
    EnterPlayernameComponent]
})
export class ComponentsModule {}
