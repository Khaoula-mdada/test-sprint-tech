export interface Author {
    first_name: string
    last_name: string
    birth_date: string
    sex: string
    email: string
  }
  export interface Reporting {
    author: Author
    description: string
    observations: number[]
  }
  export interface Observation{
    id:number,
    name:string,
  }
  export interface ReportingAnswer {
    id:number
    author: Author
    description: string
    observations: Observation[]
  }
  