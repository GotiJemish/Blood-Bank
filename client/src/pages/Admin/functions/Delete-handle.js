import { toast } from 'react-hot-toast';
import API from '../../../services/API';
import { Button } from '@mui/material';

const handleConfirm = async (id, t) => {
  try {
    const { data } = await API.delete(`/admin/delete-donar/${id}`);
    toast.success(data?.message);
    window.location.reload();
  } catch (error) {
    toast.error('Failed to delete Organisation');
    console.error(error);
  } finally {
    toast.dismiss(t.id);
  }
};

const handelDelete = async (id, message) => {
  toast((t) => (
    <div>
      {message}
      <div style={{ marginTop: '1em', display: 'flex', justifyContent: 'space-between' }}>
        <Button  variant="contained" onClick={() => toast.dismiss(t.id)}>Close</Button>
        <Button  variant="contained" color="error" onClick={() => handleConfirm(id, t)}>Confirm</Button>
      </div>
    </div>
  ));
};

export default handelDelete;
