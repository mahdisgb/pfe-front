
import { Button, Typography } from 'antd';
import { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { RegisterPage } from './components/RegisterPage';
import "./login.css";

const { Title, Text, Paragraph } = Typography;


export const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const switchToSignUp = () => setIsSignUp(true);
  const switchToSignIn = () => setIsSignUp(false);



  return (
    <>
      <div className="auth-page">
        <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`}>
          {/* Sign In Container */}
          <div className="form-container sign-in-container" style={{opacity: isSignUp ? 0 : 1}}>
            {/* <SignInForm /> */}
            <RegisterPage />
          </div>

          {/* Sign Up Container */}
          <div className="form-container sign-up-container">
            {/* <SignUpForm /> */}
            <LoginForm />
          </div>

          {/* Overlay Container */}
          <div className="overlay-container">
            <div className="overlay">
              {/* Left Overlay Panel */}
              <div className="overlay-panel overlay-left">
                <Title level={1} style={{color:"white",fontWeight:"bold"}}>Welcome Back!</Title>
                <Paragraph className="overlay-text">
                  To keep connected with us please login with your personal info
                </Paragraph>
                <Button 
                  ghost 
                  size="large"
                  onClick={switchToSignIn}
                  className="overlay-button"
                >
                  Sign In
                </Button>
              </div>

              {/* Right Overlay Panel */}
              <div className="overlay-panel overlay-right">
                <img src="/bg2.png" alt="wajihni" style={{width: "150px", height: "150px", borderRadius: "50%"}} />
                <Title level={1} style={{color:"white",fontWeight:"bold"}}>Welcome to WAJJIHNI</Title>
                <Paragraph className="overlay-text">
                  Enter your personal details and start your formtaion
                </Paragraph>
                <Button 
                  ghost 
                  size="large"
                  onClick={switchToSignUp}
                  className="overlay-button"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
