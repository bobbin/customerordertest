import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Dashboard from './Components/Dashboard/Dashboard'
// import DeliveryDetail from './Components/DeliveryDetail/DeliveryDetail'
// import 'antd/dist/antd.css';
// import { Layout, Menu } from 'antd';
import Login from './Components/Login/Login';
import LayoutWraper from './Components/LayoutWrapper/LayoutWrapper';
import {ProtectedRoute} from './Components/ProtectedRoute/ProtectedRoute'

// const { Header, Content, Footer } = Layout;

class  App extends Component {

  // constructor (props) {
  //   super(props);
  //   // this.signIn = this.signIn.bind(this);
  // }

  state = {
    userdata: null,
    token: null
  }

  getUserData = (user) => {
    console.log(user)
    this.setState ( {
      userdata: user.w3,
      token: user.tokenObj.access_token
    });
    console.log(user)
    // localStorage.removeItem('token');
    const token_id = user.tokenObj.id_token
    console.log(token_id)
    let url_auth = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token_id}`

    fetch(url_auth)
      .then(response => response.json())
      .then(data => {
        if (data.hd === "lafargeholcim.com" ) 
          console.log("AUTENTICADO")
          localStorage.setItem('token', user.tokenObj.access_token);
          window.location.replace("./dashboard")
      }
        );
}

componentDidMount () {
  // if (this.state.token === null) {
  //  window.location.replace("./login")
  // }
  // console.log(window.location.pathname)
 }

  render () {
  return (

    <BrowserRouter>
                <Switch>
                    
                   <Route exact path="/" render={() => (   
                        <Login signIn={this.getUserData}/>    
                        
                        ) } />  
                   <Route exact path="/logout" render={() => {   
                        localStorage.removeItem('token')
                        // this.props.history.push("/")
                        window.location.replace("./")
                        
                    } } />  
                   {/* <Route exact path="/dashboard" render={() => (
                        <LayoutWraper 
                        token={this.state.token}
                        dashboard={1}/>
                    ) } />

                  <Route path="/deliverydetail/:customerOrder_id/:shippingPoint_id" component={LayoutWraper} /> */}
                      
                      <ProtectedRoute exact path="/dashboard" 
                      component={LayoutWraper} 
                      token={this.state.token}
                      dashboard={1}
                       />

                      <ProtectedRoute  path="/deliverydetail/:customerOrder_id/:shippingPoint_id"
                      component={LayoutWraper} 
                      token={this.state.token}
                       />

                    {/* <Route exact path="/deliverydetail/:co_id" render={(props) => {
                          return (
                            <LayoutWraper />
                     )
                     } } /> */}
                     
                </Switch>
            </BrowserRouter>

  );
}
}

export default App;

