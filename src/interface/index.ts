export type InputData = {
  EmpID: number
  ProjectID: number
  DateFrom: string
  DateTo: string
}

export interface GroupedByProjectIDI {
  [ProjectID: number]: {
    EmpID: number
    startDate: Date
    endDate: Date
  }[]
}

export interface EmployeePairI {
  empA: number
  empB: number
  totalDays: number
  details: {
    projectId: number
    days: number
  }[]
}

export interface EmployeePairsObjectI {
  [empAempB: string]: EmployeePairI
}

export interface FlatEmployeePairI {
  empA: number
  empB: number
  projectId: number
  days: number
}
