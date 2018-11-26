import React, {Component} from "react"
import AppBar from "material-ui/AppBar"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import NavbarBootStrap from "../components/NavbarBootStrap"
import TextField from "material-ui/TextField"
import axios from "axios"
import ImageResults from "../components/ImageResults"
import SelectField from "material-ui/SelectField"
import MenuItem from "material-ui/MenuItem"



class Fun extends Component{
    state={
        topic:"",
        images:[],
        pixa:false,
        pixaApi:"10693257-e6e49bbac9508fc0b306e0b2d",
        pixaUrl:"https://pixabay.com/api",
        giphyUrl:"http://api.giphy.com/v1/gifs/search",
        giphyApi:"6gRm9WZ0hk8YcvjvVS4tX2HAAnV5WmgE"
    }

    onTopicChange=(e)=>{
        const value=e.target.value
        this.setState({[e.target.name]:value},()=>{
            if(value === ""){
                this.setState({images:[]})
            }
            else if(this.state.pixa === false){
                axios.get(`${this.state.giphyUrl}?q=${this.state.topic}&api_key=${this.state.giphyApi}&limit=${this.state.results}`)
                .then(res=>{console.log(res)
                            this.setState({images:res.data.data})})
            }
            else
                axios.get(`${this.state.pixaUrl}/?key=${this.state.pixaApi}&q=${this.state.topic}&image_type=photo&per_page=${this.state.results}&safesearch=false`)
                .then(res=>{this.setState({images:res.data.hits})
                console.log("Images:")
                console.log(this.state.images)})
        })
    }

    changeSite=(e,index,value)=>{
        this.setState({pixa:value,
                       topic:"",
                       images:[],})
    }

    render(){
        return(
            <MuiThemeProvider>
                <React.Fragment>
               
                    <AppBar title="Da Fun Page!"/>
                    <NavbarBootStrap/>
                    <div className='container'>
                    <div className='row'>
                    <div className='col-md-12 card card-body'>
            <TextField
                 onChange={this.onTopicChange}
                 name="topic"
                 value={this.state.topic}
                 floatingLabelText="Search Topic"
                 fullWidth={true}/>
            <SelectField
                 name="pixa"
                 value={this.state.pixa}
                 onChange={this.changeSite}>
            <MenuItem value={true} primaryText="Pictures"/>
            <MenuItem value={false} primaryText="Goofy Gifs"/>
            </SelectField>
            </div>
            </div>
            </div>
                 <ImageResults
                         images={this.state.images}
                         pixa={this.state.pixa}/>
            </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default Fun