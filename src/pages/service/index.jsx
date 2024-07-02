import { Button } from '@mui/material'
import React, { useState } from 'react'
import { ServiceModal } from '@modal'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs};
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 'nimadur'),

];

const index = () => {
  const [open,setOpen] = useState(false)
  return (
   <>
   <div className="container">
   <ServiceModal open={open} handleClose={()=>setOpen(false)}/>
   <Button variant='contained' className='w-[150px] ' onClick={()=>setOpen(true)}>Add</Button>
    <TableContainer component={Paper} className='my-4'>
      <Table sx={{ minWidth: 650 }} size="small"  aria-label="a dense table">
        <TableHead className='bg-primary'>
          <TableRow>
            <TableCell align='center'>T/R</TableCell>
            <TableCell align="center">Service name</TableCell>
            <TableCell align="center">Service price</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center"> {row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


   </div>

   </>
  )
}

export default index