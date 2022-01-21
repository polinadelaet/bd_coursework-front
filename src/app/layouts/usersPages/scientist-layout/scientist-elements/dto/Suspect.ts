export class Suspect {
  person_id: number;
  mentally_disturbed: boolean;
  weapon: string;
  constructor(private p_id: number,
              private m_d: boolean,
              private w: string) {
    this.person_id = p_id;
    this.mentally_disturbed = m_d;
    this.weapon = w;
  }
}
