import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import { Button} from 'antd';
import './Login.css'


export default class Login extends Component {

    // constructor (props) {
    //   super(props);
    //   // this.signIn = this.signIn.bind(this);
    // }

    responseGoogle = (response) => {
      // console.log(response.w3);
      this.props.signIn(response)
      // console.log(this)
    }

    render() {
        return (
          <div>
            <div className="loginTitleContainer">
              <h1 className="loginTitle">Customer Order Dashboard</h1>
            </div>
            <div className="loginButtonContainer">
              <GoogleLogin
              clientId="725907369444-7jebmc2l8pr4o4anussv3niikc5o343p.apps.googleusercontent.com"
              render={renderProps => (
                <Button
                type="primary"
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled}
                size="large"
                icon="google"
                >
                  Login With Google
                </Button>
                  // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                  )}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  />
              </div>
              <footer>
              <p> 
                        © {new Date().getFullYear()}, Property of
                        {` `} LafargeHolcim
                    </p>
              </footer>
          </div>
        )
    }
}
