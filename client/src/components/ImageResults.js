import React, {Component} from "react";
import PropTypes from "prop-types"
import {GridList, GridTile} from "material-ui/GridList"
import FlatButton from "material-ui/FlatButton"
import IconButton from "material-ui/IconButton"
import ZoomIn from "material-ui/svg-icons/action/zoom-in"
import Dialog from "material-ui/Dialog"

class ImageResults extends Component{
    state={
        currentImg:"",
        open:false
    }

    handleOpen=(img)=>{
        this.setState({open:true,
                       currentImg:img})
    }

    handleClose=()=>{
        this.setState({open:false})
    }
    render(){
        let imageContent=""
        const {images} =this.props

        if(images && this.props.pixa === true){
            imageContent=(
                <GridList cols={3}>
               {images.map(img=>(
                   <GridTile
                        title={img.tags}
                        key={img.id}
                        subtitle={
                            <span>
                                By:<strong>{img.user}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton onClick={()=>this.handleOpen(img.largeImageURL)}>
                            <ZoomIn color="white"/>
                            </IconButton>
                        }
                        >
                        <img src={img.largeImageURL}/>
                        </GridTile>
               ))}
                </GridList>
            )
        }
        else if(images && this.props.pixa === false){
            imageContent=(
                <GridList cols={3}>
               {images.map(img=>(
                   <GridTile
                        title={img.title}
                        key={img.id}
                        subtitle={
                            <span>
                                Rating:<strong>{img.rating}</strong>
                            </span>
                        }
                        actionIcon={
                            <IconButton onClick={()=>this.handleOpen(img.images.fixed_height.url)}>
                            <ZoomIn color="white"/>
                            </IconButton>
                        }
                        >
                        <img src={img.images.fixed_height_still.url}/>
                        </GridTile>
               ))}
                </GridList>
            )
        }

        else{imageContent=null}

        const action=[
            <FlatButton primary={true}
                        onClick={this.handleClose}
                        label="Close"/>
        ]
        
        return(
            <div>
           {imageContent}
           <Dialog
                 action={action}
                 open={this.state.open}
                 onRequestClose={this.handleClose}
                 >

          <img src={this.state.currentImg} style={{width:"100%"}}/>
            </Dialog>
                </div>
        )
    }
}

ImageResults.propTypes={
    images:PropTypes.array.isRequired
}

export default ImageResults