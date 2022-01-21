export class Suspectl {
  id: number;
  person_id: number;
  mentally_disturbed: boolean;
  murder_weapon: string;
  constructor(private id_: number,
              private p_id: number,
              private m_d: boolean,
              private m_w: string) {
    this.id = id_;
    this.person_id = p_id;
    this.mentally_disturbed = m_d;
    this.murder_weapon = m_w;
  }
}
