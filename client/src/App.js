import React, {Component} from "react";
import {BrowserRouter as Router, Route,Switch,Redirect} from "react-router-dom";
import axios from "axios";
import Login from "./components/Login"
import Home from "./pages/Home"
import Fun from "./pages/Fun"
import "./App.css"


class App extends Component{
  state={
    loaded:false,
    authenticated:false,
    name:"",
    lastname:"",
    age:"",
    email:"",
    occupation:"",
    picture:"",
    location:""

  }

  onStateChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
}

   enterPersonalInfo=()=>{
     console.log ("Details: " + this.state)
     axios.post('/personalinfo',this.state)
     .then(()=>console.log("info has been submitted"))
   }

  componentDidMount=()=>{
       axios.get("/auth")
       .then(res=>{this.setState({loaded:true,
                                  authenticated:res.data})})
  }

  setLogin=()=>{
    this.setState({authenticated:true})
  }

  render(){
    const {name,lastname,age,email,location,occupation} = this.state
    const values={name,lastname,age,email,location,occupation}

    if(!this.state.loaded){
      return <h2>Page Waiting to Load </h2>
    }
    return(
      <Router>
        <Switch>
          <Route exact path="/login" render={(props)=><Login {...props} setLogin={this.setLogin}/>}/>
          {!this.state.authenticated  ? <Redirect to="/login" /> : null }
          <Route exact path="/home" render={()=><Home values={values} changeState={this.onStateChange} enterInfo={this.enterPersonalInfo}/>}/>
          <Route exact path='/fun'  component={Fun}/>
          </Switch>
        </Router>

    )
  }
}

export default App;