export class VisionVictimCorrect {
  vision_id: number;
  victim_id: Array<number>;

  constructor(private vis_id: number) {
    this.vision_id = vis_id;
    this.victim_id = new Array<number>();
  }
}
