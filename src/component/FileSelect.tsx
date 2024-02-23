import { CloudUpload } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import { calculateCommonProjectTime, flattenEmployeePairsData } from '../util'
import { EmployeePairI, InputData } from '../interface'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    field: 'empA',
    headerName: 'Employee ID #1',
    flex: 1,
  },
  {
    field: 'empB',
    headerName: 'Employee ID #2',
    flex: 1,
  },
  {
    field: 'projectId',
    headerName: 'Project ID',
    type: 'number',
    flex: 1,
  },
  {
    field: 'days',
    headerName: 'Days Worked',
    type: 'number',
    sortable: true,
    flex: 1,
  },
]

function FileSelect() {
  // This state will store the parsed data
  const [data, setData] = useState<EmployeePairI[]>([])
  const { CSVReader } = useCSVReader()

  return (
    <>
      <Card square>
        <CardHeader
          title={
            <Typography>
              {data?.length ? (
                <>
                  The pair of employees with IDs <b>{data[0].empA}</b> and{' '}
                  <b>{data[0].empB}</b> have worked together on common projects
                  for the longest period of time - <b>{data[0].totalDays}</b>{' '}
                  days!
                </>
              ) : (
                <>
                  Upload a <code>CSV</code> file to display data.
                </>
              )}
            </Typography>
          }
        ></CardHeader>
        <CardContent>
          {data?.length ? (
            <Box sx={{ height: '60vh', width: '100%' }}>
              <DataGrid
                getRowId={(row) => `${row.empA}-${row.empB}-${row.projectId}`}
                rows={flattenEmployeePairsData(data)}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10, 50, 100]}
                disableRowSelectionOnClick
              />
            </Box>
          ) : null}
        </CardContent>
        <CardContent>
          <CSVReader
            config={{ header: true }}
            onUploadAccepted={(results: any) => {
              const { data } = results
              // console.log(results);
              setData(
                calculateCommonProjectTime(
                  data.filter((d: InputData) => !!d.EmpID)
                )
              )
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              // getRemoveFileProps,
            }: any) => (
              <>
                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  {...getRootProps()}
                >
                  Browse file
                </Button>
                <Typography>{acceptedFile && acceptedFile.name}</Typography>
                {/* <Button
                  {...getRemoveFileProps()}
                >
                  Remove
                </Button> */}
                <ProgressBar />
              </>
            )}
          </CSVReader>
        </CardContent>
      </Card>
    </>
  )
}

export default FileSelect
