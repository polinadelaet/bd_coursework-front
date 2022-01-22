export class VisionSuspectCorrect {
  vision_id: number;
  suspect_id: Array<number>;

  constructor(private vis_id: number) {
    this.vision_id = vis_id;
    this.suspect_id = new Array<number>();
  }
}
