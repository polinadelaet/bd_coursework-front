export class Victiml {
  id: number;
  person_id: number;
  constructor(private id_: number,
              private p_id: number) {
    this.id = id_;
    this.person_id = p_id;
  }
}
