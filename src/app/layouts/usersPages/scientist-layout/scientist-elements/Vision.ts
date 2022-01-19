

export class Vision {
  seer_id: number;
  case_id: number;
  date_of_vision: string;
  description: string;
  constructor(private sid: number,
              private cid: number) {
    this.seer_id = sid;
    this.case_id = cid;
  }
}
