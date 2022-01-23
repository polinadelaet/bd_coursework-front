export class Case {
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

// id serial primary key,
//   policeman_id integer not null REFERENCES Policeman (id) ON UPDATE CASCADE,
//   judge_id integer REFERENCES Judge (id) ON UPDATE CASCADE,
//   status case_status not null,
//   date_of_crime timestamp,
//   coordinates point,
//   opening_date timestamp not null,
//   closing_date timestamp
