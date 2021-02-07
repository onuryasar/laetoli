import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';
import { Link } from 'react-router-dom';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header={props.errorCode===403 ? 'Login Required' : 'An Error Occurred!'}
      show={!!props.error}
      footer={props.errorCode===403 ? <Link to="/auth"><Button>Login</Button></Link> : <Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.errorCode===403 ? 'You need to login for this action.' : props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
