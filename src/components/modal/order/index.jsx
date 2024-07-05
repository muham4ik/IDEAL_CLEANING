
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { forwardRef, cloneElement, useState, useEffect } from 'react';
import { Button,  MenuItem,  Select, TextField } from '@mui/material';
import {order} from '@order'
import { service } from '@service';
import {orderValidationSchema} from '@validation'
import { ErrorMessage, Field, Form, Formik } from 'formik';
const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});
Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Index({open,handleClose,item}) {
  const [data,setData] = useState([])
    const initialValues = {
        amount: item.amount || "",
        client_full_name: item.client_full_name || "",
        client_phone_number: item.client_phone_number ||"",
        service_id: item.service_id || ""
    }
    const getData = async()=>{
      try{
        const response = await service.get()
        if(response.status === 200 && response?.data?.services){
          setData(response?.data?.services)
        }
      }catch(error){
        console.log(error);
      }
    }
  
    useEffect(()=>{
      getData()
    },[])
    const handleSubmit = async(values)=>{
        if(item && item.id){
          const paylaod = {id: item.id, ...values}
          try{
            const response = await order.update(paylaod)
            if(response.status === 200){
              window.location.reload()
            }
          }catch(error){
            console.log(error)
          }
        }else {
            try{
                const response = await order.create(values)
                if(response.status === 201){
                  window.location.reload()
                }
              }catch(error){
                console.log(error)
              }
        
        }
        console.log(values);
    }
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h5" sx={{ textAlign:"center"}} component="h2">
              Order
            </Typography>
            <Formik
            initialValues={initialValues}
            validationSchema={orderValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Amount"
                  fullWidth
                  margin="normal"
                  helperText={
                    <ErrorMessage
                      name="amount"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                <Field
                  name="client_full_name"
                  type="text"
                  as={TextField}
                  label="Client_full_name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_full_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />
                  <Field
                  name="client_phone_number"
                  type="text"
                  as={TextField}
                  label="Client_phone_number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                    
                  }
                 
                />
               
                  
              <Field
                  name="service_id"
                  type="text"
                  as={Select}
                  label="Service"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="service_id"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                >
                  {data.map((service, index) => (
                      <MenuItem key={index} value={service.id}>
                        {service.name}
                      </MenuItem>
                    ))}
              
                
                </Field>
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {isSubmitting ? "Submitting" : "Save"}
                </Button>
              </Form>
            )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
