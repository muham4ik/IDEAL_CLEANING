import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { OrderModal } from '@modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { order } from '@order';

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});
  console.log(item);
  const getData = async () => {
    try {
      const response = await order.get();
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response.data.orders_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteItem = async(id)=>{
    try{
      const response = await order.delete(id)
      if(response.status === 200){
        window.location.reload()
      }
    }catch(error){
      console.log(error);
    }
  }

  const editItem=(item)=>{
    setItem(item)
    setOpen(true)
  }

  return (
    <>
      <div className="container">
        <OrderModal open={open} handleClose={() => setOpen(false)} item={item} />
        <Button variant="contained" className="w-[150px]" onClick={() => setOpen(true)}>Add</Button>
        <TableContainer component={Paper} className="my-4">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead className="bg-primary">
              <TableRow>
                <TableCell align="center">T/R</TableCell>
                <TableCell align="center">Client name</TableCell>
                <TableCell align="center">Client phone</TableCell>
                <TableCell align="center">Service name</TableCell>
                <TableCell align="center">Service price</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell> {/* Added header for actions */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index + 1}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{item.client_name}</TableCell>
                  <TableCell align="center">{item.client_phone_number}</TableCell>
                  <TableCell align="center">{item.service_name}</TableCell>
                  <TableCell align="center">{item.service_price}</TableCell>
                  <TableCell align="center">{item.status}</TableCell>
                  <TableCell align="center" className="flex items-center gap-[8px]">
                    <button className="p-3 bg-primary rounded-md" onClick={() => editItem(item)}>
                      <box-icon name="edit"></box-icon>
                    </button>
                    <button className="p-3 bg-danger rounded-md" onClick={() => deleteItem(item.id)}>
                      <box-icon name="trash"></box-icon>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Index;