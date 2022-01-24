export class newOffender {
  id: number;
  suspect_id: number;
  type_of_crime: string;
  arrest_date: string;
  release_date: string;
  constructor(private crime_type: string) {
    this.type_of_crime = crime_type;
  }
}
