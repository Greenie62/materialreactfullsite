import React, {Component} from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AppBar from "material-ui/AppBar";
import axios from "axios";
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import BottomNavigation from "material-ui/BottomNavigation"



class Login extends Component{
    state={
        username:"",
        password:"",
        error:""
    }

    onStateChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
        this.setState({error:""})
    }

    enterInfo=()=>{
        axios.post('/login',this.state)
        .then(res=>{
            if(res.data === true || res.data === "newuser"){
                this.props.setLogin()
                this.props.history.push('/home')
            }
            else{
                this.setState({error:"Wrong name/password! :("})
            }
        })
    }

    render(){
        return(
            <MuiThemeProvider>
            <React.Fragment>
            <AppBar title="Justins Material Log-in Page"/>
           
            <div className='container'>
            <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
            <div className='card card-body'>
            <TextField
                 floatingLabelText="Username"
                  hintText="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onStateChange}/>
                  <br/>
                  <TextField
                 floatingLabelText="Pssst...password!"
                  hintText="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onStateChange}/>
                  <hr/>
                  {this.state.error}
                  <RaisedButton primary={true} onClick={this.enterInfo} label="Enter"/>
            </div>
            </div>
            <div className='col-md-3'></div>
            </div>
            </div>
         
            <AppBar title="Footer &copy;"/>
            </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default Login