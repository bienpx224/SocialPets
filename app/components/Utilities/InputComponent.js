import React from 'react';
import {FormGroup,ControlLabel,FormControl,InputGroup,Glyphicon,Tooltip,OverlayTrigger} from 'react-bootstrap';
import DatePicker from 'react-datepicker';

module.exports = class InputComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {startDate: null};
  }
  _onChange(event, value){
    if(event && value) {
      this.state.startDate = event;
      this.setState(this.state);
      this.props.onChange(this.props.name, event, this.props.type);
    }
    else{
        this.props.onChange(this.props.name, event, this.props.type);
    }

  }
  render(){
    var   tooltip =  <Tooltip><strong>{this.props.tooltip}!!!</strong></Tooltip>
    if(this.props.type != "date")
    return(
      <OverlayTrigger placement="right" overlay={tooltip}>
        <FormGroup controlId="formValidationSuccess3" validationState={this.props.validate}>

          <FormControl placeholder={this.props.placeholder} type={this.props.type}  onChange={this._onChange.bind(this)}/>
          <FormControl.Feedback />
        </FormGroup>
      </OverlayTrigger>

    )

    else{
      return(
        <DatePicker dateFormat="DD/MM/YYYY" className="form-control" selected={this.state.startDate}
        placeholderText={this.props.placeholder} onChange={this._onChange.bind(this)} />
      )
    }

  }
}
