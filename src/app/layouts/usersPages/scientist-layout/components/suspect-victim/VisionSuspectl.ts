export class VisionSuspectl {
  vision_id: number;
  person_id: number;
  mentally_disturbed: boolean;
  weapon: string;
  constructor(private vis_id: number,
              private per_id: number,
              private m_d: boolean,
              private weap: string) {
    this.vision_id = vis_id;
    this.person_id = per_id;
    this.mentally_disturbed = false;
    this.weapon = weap;
  }
}
