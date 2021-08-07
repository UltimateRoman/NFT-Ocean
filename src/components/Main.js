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
    // if(this.state.filesSelected){
    //   var formData = new FormData();
    
    //   formData.append("file", this.fileinput.current.files[0]);
    //   const options = {
    //     headers : {
    //       "Authorization": `Bearer ${process.env.REACT_APP_NFTKEY}`,
    //     }
    //   }
    //   axios.post("https://api.nft.storage/upload", formData, options)
      
    //   .then((result)=>{
    //     this.props.mintItem(this.priceinput.current.value, this.nameinput.current.value, this.descinput.current.value, result.data.value.cid)
    //   console.log(result.data.value.cid+"/"+result.data.value.files[0].name)})
    // }
    this.props.mintItem(this.priceinput.current.value, this.nameinput.current.value, this.descinput.current.value, this.linkinput.current.value)   
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
        <Typography component="h1" variant="h1" align="center" color="inherit" gutterBottom>
          <WhiteTextTypography variant="h1">
            Mint your NFT
          </WhiteTextTypography>
        </Typography>
        <br/><br/>

        <center>
        <div style={{width:700, padding: "10px", borderRadius: "10px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", backgroundColor: '#00e6e6'}} >
          <div style={{width:600}}>
            <form onSubmit={this.onSubmit} noValidate autoComplete="off">
              <div class="mb-3">
                <br/>
                <label for="exampleFormControlTextarea1" class="form-label"><h3 style={{ color: "Navy" }}>Item Name</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.nameinput} placeholder="Enter a Name for the Item" required />
              </div>
              <br/><br/>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3 style={{ color: "Navy" }}>Description or Story</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.descinput} placeholder="Enter a Description or Story for the Item" required />
              </div>
              <br/><br/>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3 style={{ color: "Navy" }}>Base Price</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.priceinput} placeholder="Enter a Base Price for the Item" aria-label="Enter a Base Price for the Item" aria-describedby="basic-addon2" required />
                <span class="input-group-text" id="basic-addon2">MATIC</span>
              </div>
              <br/><br/>

              <div class="mb-3">
                <label for="formFile" class="form-label"><h3 style={{ color: "Navy" }}>Choose File</h3></label>
                <input type="file" class="form-control" id="formFile" ref={this.fileinput} onChange={(event) =>{
                  event.preventDefault();
                  if(this.fileinput.current.files[0]){
                    this.setState({filesSelected:true})
                  }
                  }} />
              </div>
              <br/>
                <h4 style={{ textAlign: "center"}}>OR</h4>
              <br/>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label"><h3>File CID</h3></label>
                <input type="text" class="form-control" id="exampleFormControlInput1" ref={this.linkinput} placeholder="Enter file cid from NFT.storage" />
              </div>
              <br/><br/>

              <button type="submit" class="btn btn-success mb-3">Mint NFT</button>
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