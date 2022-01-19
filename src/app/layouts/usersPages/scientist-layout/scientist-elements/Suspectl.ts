export class Suspectl {
  id: number;
  person_id: number;
  mentally_disturbed: boolean;
  murder_weapon: string;
  constructor(private id: number,
              private person_id: number,
              private mentally_disturbed: boolean,
              private murder_weapon: string) {
    this.id = id;
    this.person_id = person_id;
    this.mentally_disturbed = mentally_disturbed;
    this.murder_weapon = murder_weapon;
  }
}
