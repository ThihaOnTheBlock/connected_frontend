import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActionStatus = ({message})=>{
  const notify = () => toast(message);

  return (
    <div>
        <button onClick={notify}>Toast me</button>
      <ToastContainer />
    </div>
  );
}

export default ActionStatus