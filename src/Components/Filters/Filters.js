import React from "react"
import 'antd/dist/antd.css';
import './filters.css'
import { DatePicker, Button, Select, Input} from 'antd';
import moment from 'moment';

const dateFormatList = ['YYYY-MM-DD', 'DD/MM/YY'];
const { RangePicker } = DatePicker;
// 

export default class IndexPage extends React.Component {
  state = {
    deliveryPlant: "",
    orderStatus: "",
    customerOrderNumber: "",
    dateFrom: "",
    dateTo: "",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    console.log(event)

    this.setState({
      [name]: value
    })
  }

  clearFilters = () => {
    this.setState ({
      deliveryPlant: "",
      orderStatus: "",
      customerOrderNumber: "",
      dateFrom: "",
      dateTo: "",
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    
    const values = {
      deliveryPlant: this.state.deliveryPlant ? this.state.deliveryPlant[0]:null,
      orderStatus: this.state.orderStatus ? this.state.orderStatus[0]:null,
      deliveryFrom: this.state.dateFrom ? [`${this.state.dateFrom}`]:null,
      deliveryTo: this.state.dateTo ? [`${this.state.dateTo}`]:null,
      customerOrderNum: this.state.customerOrderNumber ? [`${this.state.customerOrderNumber.substr()}`]: [""]
    }
    const valor = this.state.customerOrderNumber;
    this.props.onFilterValue(values, valor)
    
  }

  handleChange = (value, option) => {
    
    
    if (value.indexOf(",") === 0) {
      if (option === "deliveryPlant" ) {
        this.setState({
          deliveryPlant: value.split(",")
        })
      }
      if (option === "orderStatus" ) {
        this.setState({
          orderStatus: value.split(",")
        })
      }
    }
    else if (value.length !== 0){
      
      if (option === "deliveryPlant" ) {
        this.setState({
          deliveryPlant: [value]
        })
      }
      if (option === "orderStatus" ) {
        this.setState({
          orderStatus: [value]
        })
      }
      
    }
    else {
      {
        if (option === "deliveryPlant" ) {
          this.setState({
            deliveryPlant: null
          })
        }
        if (option === "orderStatus" ) {
          this.setState({
            orderStatus: null
          })
        }
      }
    }
    
    // console.log(`selected ${value}`);
  }

  handleSearch = (event) => {
    this.setState ({
      customerOrderNumber: event.target.value
    })
  }

  handleChangeDP = (value) => {
    this.handleChange(value,"deliveryPlant")
  }

  handleChangeOS = (value) => {
    this.handleChange(value,"orderStatus")
  }

  onChangeDates = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      dateFrom: dateString[0],
      dateTo: dateString[1]
    })
  }


  render() {

    const options = [];
    const optionsOrderStatus = [];
    const status = ['Pending', 'On Route', 'Finished'];
    const plants = ["1070","1067","1232","1265","1042","2815","2835","5740"];
    plants.map (plant => {
      options.push(<Select.Option key={plant}>{plant}</Select.Option>);
    }) 
    status.map (stat => {
      optionsOrderStatus.push(<Select.Option key={stat}>{stat}</Select.Option>);
    }) 
    return (
        <div className="filtersForm">
            <form onSubmit={this.handleSubmit}>
              
                <label>Delivery Plant
                <Select size="large"
                mode="multiple"
                style={{ width: 250 }}
                placeholder="Select Delivery Plant"
                defaultValue={[]}
                onChange={this.handleChangeDP}
                >
                 {options}
                </Select>
                </label>

                <label>
                Delivery From - Delivery To

              <RangePicker size="large" onChange={this.onChangeDates} style={{ width: 350 }} 
               defaultValue={[moment().subtract(1, 'days'), moment()]}
               format={dateFormatList[0]}
              />
                </label>
                
                <label>
                Customer Order Number
                    <Input size="large"
                    placeholder="Search Customer Order Number"
                     
                    style={{ width: 250, height: 40 }}
                   onChange={this.handleSearch}
                    />
                </label>

              <label>Order Status
                <Select size="large"
                mode="multiple"
                style={{ width: 200 }}
                placeholder="Select Order Status"
                defaultValue={[]}
                onChange={this.handleChangeOS}
                >
                 {optionsOrderStatus}
                </Select>
                </label>

                <Button size="large" onClick={this.handleSubmit}>Submit</Button>
            </form>
        </div>
    )
  }
}