import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const WhiteTextTypography = withStyles({
  root: {
    color: "darkblue"
  }
})(Typography);

class Main extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.filesSelected){
      var formData = new FormData();
    
      formData.append("file", this.fileinput.current.files[0]);
      const options = {
        headers : {
          "Authorization": `Bearer ${process.env.REACT_APP_NFTKEY}`,
        }
      }
      axios.post("https://api.nft.storage/upload", formData, options)
      .catch((error) => {
        console.log('error: ', error.message);
      })
      .then((result)=>{
        this.props.mintItem(this.priceinput.current.value, this.nameinput.current.value, this.descinput.current.value, result.data.value.cid)
      console.log(result.data.value.cid+"/"+result.data.value.files[0].name)})
    }
    //   this.props.mintItem(this.priceinput.current.value, this.nameinput.current.value, this.descinput.current.value, this.linkinput.current.value)   
  }

  constructor(props) {
    super(props);
    this.fileinput = React.createRef();
    this.nameinput = React.createRef();
    this.descinput = React.createRef();
    this.priceinput = React.createRef();
    this.linkinput = React.createRef();

    this.state={
      filesSelected: false
    }
  }

  render() {
    return (
      <React.Fragment>
        <br/><br/>          
        <Typography component="h1" variant="h2" align="center" color="inherit" gutterBottom>
            <WhiteTextTypography variant="h3">
                  Mint your NFT
            </WhiteTextTypography>
        </Typography>
        <br/><br/>
        <center>
        <div style={{width:700, backgroundColor: '#00e6e6'}} >
          <div style={{width:600}}>
            <form onSubmit={this.onSubmit} noValidate autoComplete="off">
              <div class="mb-3">
                <br/>
                <label for="exampleFormControlTextarea1" class="form-label"><h3>Enter a Name</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.nameinput} placeholder="Name"/>
              </div>
              <br/><br/>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3>Enter Description</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.descinput} placeholder="Description"/>
              </div>
              <br/><br/>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3>Enter a  Base Price (in MATIC)</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.priceinput} placeholder="Price"/>
              </div>
              <br/><br/>
              <div class="mb-3">
                <label for="formFile" class="form-label"><h3>Choose Image file</h3></label>
                <input type="file" class="form-control" id="formFile" ref={this.fileinput} onChange={(event) =>{
                  event.preventDefault();
                  if(this.fileinput.current.files[0]){
                    this.setState({filesSelected:true})
                  }
                  }} />
              </div> 
              {/* <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3>Image link</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.linkinput} placeholder="link"/>
              </div> */}
              <br/><br/>
              <button type="submit" class="btn btn-primary mb-3">Mint NFT</button>
              <br/><br/>
            </form>
          </div>
        </div>
        </center>
      </React.Fragment>
      );
    }
  }
  
  export default Main;