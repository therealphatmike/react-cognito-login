import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import LoaderButton from '../components/LoaderButton';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      props.history.push('/');
    } catch (err) {
      alert(err.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <LoaderButton 
          block bsSize="large" 
          disabled={!validateForm()}
          isLoading={isLoading}
          type="submit">
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
