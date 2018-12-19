import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login';
import { BattleComponent } from './battle/battle';
import { JoinCreateComponent } from './join-create/join-create';
import { CreationOptionsComponent } from './creation-options/creation-options';
import { DeclareGuildNamesComponent } from './declare-guild-names/declare-guild-names';
import { SelectBattleScreenComponent } from './select-battle-screen/select-battle-screen';
import { EnterPlayernameComponent } from './enter-playername/enter-playername';
import { OverviewScreenComponent } from './overview-screen/overview-screen';
import { JoinTeamComponent } from './join-team/join-team';

@NgModule({
	declarations: [LoginComponent,
    BattleComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    SelectBattleScreenComponent,
    EnterPlayernameComponent,
    OverviewScreenComponent,
    JoinTeamComponent],
	imports: [],
	exports: [LoginComponent,
    BattleComponent,
    JoinCreateComponent,
    CreationOptionsComponent,
    DeclareGuildNamesComponent,
    SelectBattleScreenComponent,
    EnterPlayernameComponent,
    OverviewScreenComponent,
    JoinTeamComponent]
})
export class ComponentsModule {}
