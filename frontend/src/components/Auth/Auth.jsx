  import React from 'react'
  import AuthForm from './AuthForm'
  import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { userActions } from '../../store';

  const Auth = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const onResReceived = (data) => {
        console.log(data);
        dispatch(userActions.login());
        localStorage.setItem("userId", data.id);
        navigate("/");
      };
        
      const getData = (data) => {
        console.log(data);
        sendUserAuthRequest(data.inputs, data.signup)
          .then(onResReceived)
          .catch((err) => console.log(err));
      };
    
      return (
        <div>
          <AuthForm onSubmit={getData} isAdmin={false} />
        </div>
      );
  }

  export default Auth 
