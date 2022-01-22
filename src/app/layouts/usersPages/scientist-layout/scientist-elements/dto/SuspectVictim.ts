export class SuspectVictim {
  vision_id: number;
  victim_id: number;
  suspect_id: number;
  constructor(private vis_id: number,
              private vic_id: number,
              private sus_id) {
    this.vision_id = vis_id;
    this.victim_id = vic_id;
    this.suspect_id = sus_id;
  }
}
