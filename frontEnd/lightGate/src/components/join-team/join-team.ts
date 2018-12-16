import { Component } from '@angular/core';

/**
 * Generated class for the JoinTeamComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'join-team',
  templateUrl: 'join-team.html'
})
export class JoinTeamComponent {

  teams: string[] = ["Dunkey", "Unraveller", "Knack2Baby!"];
  members = [["Mario", "Knight"], ["Link", "Mage"], ["Kirby", "Cleric"], ["Samus", "Knight"]];

  constructor() {
  }

}
