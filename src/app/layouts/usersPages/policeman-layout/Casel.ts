import {Judge} from "./dto/Judge";

export class Casel {
  id: number;
  policeman_id: number;
  judge_id: Judge;
  status: string;
  date_of_crime: string;
  coordinates: string;
  opening_date: string;
  closing_date: string;
}
