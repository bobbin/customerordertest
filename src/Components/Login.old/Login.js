import React, { Component } from 'react';
import './Login.css';

// import Background from './background-za.jpg';

const credenciales = {
    "user": "daniel@lafargeholcim.com",
    "pass": "Holcim.2019"
}
const credenciales2 = {
    "user": "ruben.martinezesteban@lafargeholcim.com",
    "pass": "Holcim.2019"
}

const credenciales3 = {
    "user": "luis.bernal@lafargeholcim.com",
    "pass": "Holcim.2019"
}

const credenciales4 = {
    "user": "darrel.petersen@lafargeholcim.com",
    "pass": "Holcim.2019"
}

const credenciales5 = {
    "user": "pablo.romeroromeral@lafargeholcim.com ",
    "pass": "Holcim.2019"
}

const credenciales6 = {
    "user": "jose.somolinos@lafargeholcim.com",
    "pass": "Holcim.2019"
}

const credenciales7 = {
    "user": "fernando.bianchetti@lafargeholcim.com",
    "pass": "Holcim.2019"
}

const credenciales8 = {
    "user": "matthias.howald@holcim.com",
    "pass": "Holcim.2019"
}

const credenciales9 = {
    "user": "christian.schuldt@lafargeholcim.com",
    "pass": "Holcim.2019"
}

const credenciales10 = {
    "user": "carlos.terres@lafargeholcim.com",
    "pass": "Holcim.2019"
}

export default class Login extends Component {

    
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.state = {
            errorLogin: null,
        };
    }
    

    sendSignIn = (e) => {
        e.preventDefault();

        const datosRegistro ={
            username: this.usernameRef.current.value.toLowerCase(),
            password: this.passwordRef.current.value,
        }

        console.log(datosRegistro.username)

        if (((datosRegistro.username === credenciales.user) && (datosRegistro.password === credenciales.pass)) 
        || ((datosRegistro.username === credenciales2.user) && (datosRegistro.password === credenciales2.pass)) 
        || ((datosRegistro.username === credenciales3.user) && (datosRegistro.password === credenciales3.pass)) 
        || ((datosRegistro.username === credenciales4.user) && (datosRegistro.password === credenciales4.pass)) 
        || ((datosRegistro.username === credenciales5.user) && (datosRegistro.password === credenciales5.pass)) 
        || ((datosRegistro.username === credenciales6.user) && (datosRegistro.password === credenciales6.pass)) 
        || ((datosRegistro.username === credenciales7.user) && (datosRegistro.password === credenciales7.pass)) 
        || ((datosRegistro.username === credenciales8.user) && (datosRegistro.password === credenciales8.pass)) 
        || ((datosRegistro.username === credenciales9.user) && (datosRegistro.password === credenciales9.pass)) 
        || ((datosRegistro.username === credenciales10.user) && (datosRegistro.password === credenciales10.pass)) 
        ) {
            // this.setState({errorLogin: true});
            window.location.replace("./dashboard")
        }
        else
        {
            this.setState({errorLogin: true});
        }

    }


    render() {
        const { errorLogin } = this.state;
        return (
            <div className="wrapper">
            {/* <img className="background" src={Background} alt="Linkedin" />  */}
            {/* <Download/> */}
            <div className="login-box">
                <div className="contenedor-logo">
                    <img alt="LafargeHolcim logo" title="LafargeHolcim logo" className="logo-login" id="test-sp-logo-img" src="https://af3sggiwq.accounts.ondemand.com/ui/public/cached/59e9b800e4b099b0a2b2f256/v/2/logo" />
                    <h2>Customer Order Reports</h2>
                </div> 
                <div className="contenedor-form">
                    <form className="signInForm" id="signIn" onSubmit={this.sendSignIn}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input className="emailSignInInput" ref={this.usernameRef} type="text" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Password</label>
                            <input className="passwordSignInInput" ref={this.passwordRef} type="password" placeholder="Password"/>
                        </div>
                        <button>Log In</button>
                    </form>
                </div>
                <div className="alternativeLogin">
                {/* <img src={Google} alt="googleLogin" />
                <img src={Linkedin} alt="Linkedin" /> */}

                </div>

                {errorLogin &&
                <h3> Username or Password incorrect </h3>
                    } 
                </div>
            </div>
        )
    }
}

