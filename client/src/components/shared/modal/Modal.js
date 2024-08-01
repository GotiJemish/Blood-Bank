import React, { useState } from 'react';
import { Button, RadioGroup, Radio, FormControlLabel, FormControl, InputLabel, Select, MenuItem, Box, Modal } from '@mui/material';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InputType from '../Form/InputType';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import API from '../../../services/API';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

const Model = ({ open, handleClose, title }) => {
  const [inventoryType, setInventoryType] = useState('in');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState('');

  const { user } = useSelector(state => state.auth);

  const handleChange = (event) => {
    setBloodGroup(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return toast.error('Check blood group or quantity');
      }
      const { data } = await API.post('/inventory/create-inventory', {
        inventoryType,
        bloodGroup,
        quantity: parseFloat(quantity),
        email,
        organisation: user && user._id
      });
      if (data && data.success) {
        toast.success('Record successfully added');
        handleClose();
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      window.location.reload();
      console.error(error);
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      TransitionComponent={Transition}
    >
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box>
          <RadioGroup
            row
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <FormControlLabel value="in" control={<Radio />} label="Donate" />
            <FormControlLabel value="out" control={<Radio />} label="Require" />
          </RadioGroup>

          <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
            <InputLabel>Blood Group</InputLabel>
            <Select
              variant="standard"
              value={bloodGroup}
              onChange={handleChange}
            >
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"Rh+"}>Rh+</MenuItem>
              <MenuItem value={"Rh-"}>Rh-</MenuItem>
            </Select>
          </FormControl>

          <InputType
            labelText={inventoryType === 'out' ? "Hospital Email" : "Donor Email"}
            inputType="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            Focus={false}
          />

          <InputType
            labelText="Quantity (ML)"
            inputType="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            Focus={false}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" m={1}>
          <Button autoFocus onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default Model;
