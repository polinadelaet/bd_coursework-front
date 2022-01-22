export class SuspectVictiml {
  vision_id: number;
  num_victims: number;
  num_suspects: number;
  constructor(private v_id: number,
              private n_v: number,
              private n_s: number) {
    this.vision_id = v_id;
    this.num_victims = n_v;
    this.num_suspects = n_s;
  }
}
