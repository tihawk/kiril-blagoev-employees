import moment from 'moment'
import {
  EmployeePairI,
  EmployeePairsObjectI,
  FlatEmployeePairI,
  GroupedByProjectIDI,
  InputData,
} from '../interface'

const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds

export function calculateCommonProjectTime(
  _data: InputData[]
): EmployeePairI[] {
  // grouping of employees by project
  const groupedByProjectID = _data.reduce(
    (acc: GroupedByProjectIDI, { EmpID, ProjectID, DateFrom, DateTo }) => {
      const startDate = moment(DateFrom).toDate()
      const endDate =
        DateTo.toLowerCase().trim() !== 'null'
          ? moment(DateTo).toDate()
          : new Date()
      const value = { EmpID, startDate, endDate }
      return {
        ...acc,
        [ProjectID]: acc[ProjectID] ? [...acc[ProjectID], value] : [value],
      }
    },
    {}
  )

  // pairing of employees per project
  const employeePairs: EmployeePairsObjectI = {}
  for (const projectId in groupedByProjectID)
    for (let i = 0; i < groupedByProjectID[projectId].length - 1; i++)
      for (let j = i + 1; j < groupedByProjectID[projectId].length; j++) {
        const empA = groupedByProjectID[projectId][i]
        const empB = groupedByProjectID[projectId][j]

        if (
          (empA.endDate <= empB.endDate && empA.endDate > empB.startDate) ||
          (empB.endDate <= empA.endDate && empB.endDate > empA.startDate)
        ) {
          // calculating days working together on project
          const commonStartDate =
            empA.startDate > empB.startDate ? empA.startDate : empB.startDate
          const commonEndDate =
            empA.endDate < empB.endDate ? empA.endDate : empB.endDate
          const days = Math.floor(
            (commonEndDate.getTime() - commonStartDate.getTime()) / oneDay
          )
          const key = `${empA.EmpID}-${empB.EmpID}`

          employeePairs[key] = employeePairs[key] ?? {
            empA: empA.EmpID,
            empB: empB.EmpID,
            totalDays: 0,
            details: [],
          }
          employeePairs[key].details.push({
            projectId: Number(projectId),
            days,
          })
          employeePairs[key].totalDays += days
        }
      }

  const result: EmployeePairI[] = Object.entries(employeePairs)
    .sort((a: any, b: any) => b[1].totalDays - a[1].totalDays)
    .map(([k, v]) => v)

  // console.table(result)

  return result
}

export function flattenEmployeePairsData(
  _input: EmployeePairI[]
): FlatEmployeePairI[] {
  const result: FlatEmployeePairI[] = []
  for (const { empA, empB, details } of _input) {
    const flatDetails = details.reduce(
      (acc, current: any) => acc.concat(current),
      []
    )
    result.push(
      ...flatDetails.map(({ projectId, days }) => ({
        empA,
        empB,
        projectId,
        days,
      }))
    )
  }

  // console.table(result)

  return result.sort((a, b) => b.days - a.days)
}
