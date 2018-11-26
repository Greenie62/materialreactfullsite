import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import TextField from "material-ui/TextField"
import RaisedButton from "material-ui/RaisedButton"
import axios from "axios"
import {List, ListItem} from "material-ui/List"
import NavbarBootStrap from "../components/NavbarBootStrap"
import NewItemModel from "../components/NewItemModel"
import FlatButton from "material-ui/FlatButton"
import Dialog from "material-ui/Dialog"



class Home extends Component{
    state={
        newMember:true,
        loaded:false,
        usersInfo:"",
        itemname:"",
            price:"",
            quantity:"",
            image:"",
        quote:"",
        open:false
    }

    componentDidMount=()=>{
      
        axios.get('/newornot').then(res=>{
            //render the users info version
            if(res.data === true){
                this.setState({newMember:false,
                               loaded:true})
        axios.get('/getuserinfo').then(userdata=>{
            console.log(userdata)
            this.setState({usersInfo:userdata.data})
        })
                }
                //render the forum version
             else if(res.data === "newuser"){
                 this.setState({loaded:true,
                                newMember:true})
             }
            
        })
    }


    submitInfo=()=>{
        console.log("Submit info clicked")
        this.props.enterInfo()
        window.location.reload()
    }

    itemOrQuoteInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    enterItemName=()=>{
        console.log('function fired!')
        this.setState({open:true})
        console.log(document.querySelector("#itemName").value)
        axios.post("/newitemname",this.state)
        .then(()=>console.log("itemname sent back"))
    }

    onStateChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    enterItem=()=>{
       
        var newItem={
             price:this.state.price,
             quantity:this.state.quantity,
             image:this.state.image
        }
        console.log(newItem)
        axios.post('/newitem',newItem)
        .then(()=>{this.setState({open:false})
            console.log("Item sent back!")})
    }

    handleClose=()=>{
        this.setState({open:false})
        axios.get('/cancelItem')
        .then(()=>console.log("itemname canceled"))
    }

   


    render(){

        const actions=[
            <FlatButton onClick={this.handleClose}
                         label="Close"
                         primary={true}/>,
            <FlatButton secondary={true}
                         label="Post it"
                         onClick={this.enterItem}/>
      ]
      
        //dereference state and props
        const {newMember}=this.state
        const {values, changeState} =this.props
  
    if(!this.state.loaded){
        return "waiting to figure things out"
    }
        switch(newMember){

            case true:
            return(
                <MuiThemeProvider>
                <React.Fragment>
                <AppBar title="Welcome home, it looks like your a new member!"/>
                    <div className='container'>
                    <div className='row'>
                    <div className='col-md-6'>
                    <TextField
                         floatingLabelText="Your name"
                         hintText="Name"
                         name="name"
                         value={values.name}
                         onChange={changeState}/>
                         <TextField
                         floatingLabelText="Your lastname"
                         hintText="Lastname"
                         name="lastname"
                         value={values.lastname}
                         onChange={changeState}/>
                         <TextField
                         floatingLabelText="Your age"
                         hintText="Age"
                         name="age"
                         value={values.age}
                         onChange={changeState}/>
                         </div>
                         <div className='col-md-6'>
                    <TextField
                         floatingLabelText="Your email"
                         hintText="Email"
                         name="email"
                         value={values.email}
                         onChange={changeState}/>
                         <TextField
                         floatingLabelText="Occupation"
                         hintText="Occupation"
                         name="occupation"
                         value={values.occupation}
                         onChange={changeState}/>
                         <TextField
                         floatingLabelText="Where you call home"
                         hintText="Location"
                         name="location"
                         value={values.location}
                         onChange={changeState}/>
                      
                         <br/>
                         <RaisedButton secondary={true} onClick={this.submitInfo} label="Enter_info"/>
                         </div>
                         </div>
                         </div>
                    </React.Fragment>
                </MuiThemeProvider>
                
            )
            break;
          case false:
        return(
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Welcome home you stunning bastard!"/>
                    <NavbarBootStrap/>
                    <div className='container'>
                    <div className='row'>
                    <div className='col-md-6'>
                    {this.state.usersInfo.username} 's Profile Info
                    <List>
                        
                        <ListItem
                             primaryText="Full Name"
                             secondaryText={this.state.usersInfo.name}>
                             </ListItem>
                             <ListItem
                             primaryText="Email"
                             secondaryText={this.state.usersInfo.email}>
                             </ListItem>
                             <ListItem
                             primaryText="Age"
                             secondaryText={this.state.usersInfo.age}>
                             </ListItem>
                             <ListItem
                             primaryText="Location"
                             secondaryText={this.state.usersInfo.location}>
                             </ListItem>
                             <ListItem
                             primaryText="Occupation"
                             secondaryText={this.state.usersInfo.occupation}>
                             </ListItem>
                             
                 
                   
                    </List>
                    </div>
                    <div className='col-md-6'>
                   <img src="./assets/friends.jpg"/>
                   <h4>Contribute To the Community! :)</h4>
                    <div className='card card-body'>
                    <TextField
                         floatingLabelText="Make some money!"
                         hintText="Post an Item"
                         onChange={this.itemOrQuoteInput}
                         name="itemname"
                         id="itemName"
                         value={this.state.itemname}/>
                    <RaisedButton primary={true} label="Post item" onClick={this.enterItemName}/>
                   
                    <Dialog
             title="New Item Additional Material"
             actions={actions}
             modal={false}
             open={this.state.open}>
             <div>
            <TextField
                  floatingLabelText="$$$$"
                  hintText="How much ya charging?"
                  name="price"
                  onChange={this.onStateChange}
                  value={this.state.price}/>
                  <br/>
                  <TextField
                  floatingLabelText="Quantity"
                  hintText="How many are ya selling?"
                  name="quantity"
                  onChange={this.onStateChange}
                  value={this.state.quantity}/>
                  <br/>
                  <TextField
                  floatingLabelText="Picture of product"
                  hintText="Picture of product"
                  name="image"
                  onChange={this.onStateChange}
                  value={this.state.image}/>
                  <br/>
                  </div>
                  </Dialog>

                    <hr/>
                    <TextField
                          floatingLabelText="Inspire someone!"
                          hintText={`Quoth the ${this.state.usersInfo.username}...`}
                          onChange={this.itemOrQuoteInput}
                          name="quote"
                          value={this.state.quote}/>
                    <RaisedButton secondary={true} label="Publish Quote"/>
                    </div>
                    </div>
                    </div>
                    </div>
                    </React.Fragment>
                </MuiThemeProvider>
        )
        break;
    }
    }
}

export default Home;