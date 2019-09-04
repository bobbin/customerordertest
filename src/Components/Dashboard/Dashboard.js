import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Button, Icon, Tag} from 'antd';
import Highlighter from 'react-highlight-words';
import {CSVLink} from "react-csv";
import moment from 'moment';
import Filters from '../Filters/Filters'
import Chart from '../Chart/Chart'
import Chart2 from '../Chart2/Chart2'
import './dashboard.css'
import Sumatories from '../Sumatories/Sumatories';
import DataCustomerOrders from '../../data/customerorder-5.json'
import {getCustomerOrder} from '../../services/services'

const datosCustomers = DataCustomerOrders;

const locale = 'es-ES'
  
export default class Dashboard extends Component {
    state = {
        delivered: 1,
        toDeliver: 1,
        qtyOrdered: null,
        qtyScheduled: null,
        qtyLoaded: null,
        qtyDelivered: null,
        qtyToDeliver: null,
        datos: null,
        filasSeleccionadas: null,
        searchText: '',
        finishedOrders: 1,
        onroute: 1,
        pending: 1,
        filteredInfo: null,
        };
        
   
    componentDidMount () {
      let datos = [];
      datos = this.cargaDatosJson(datosCustomers);
      this.setState({
        datos: datos,
        filasSeleccionadas: datos
      })
      let cantidades = this.sumatorioCantidades(datos);
      // console.log(this.state);
      console.log(getCustomerOrder());
    }

    cargaDatosJson = datosCustomers => {
      let datos = [];
      datosCustomers.recordset.map( (elemento, idx) => {
        let status = '';
        if (elemento.CUSTORDER_STATUS_CD === 1) {
          status = 'Pending';
        } else if (elemento.CUSTORDER_STATUS_CD === 2) {
          status = 'On Route';
        } else {
          status = 'Finished';
        }
        datos.push({
          key: idx+elemento.SHIPPINGPOINT_ID,
          CustomerOrderId: elemento.CUSTORDER_ID,
          deliveryPlant: elemento.SHIPPINGPOINT_ID? (elemento.SHIPPINGPOINT_ID).toString() : "",
          customer: elemento.CUSTOMER? elemento.CUSTOMER: "",
          shipTo: elemento.SHIPTO? elemento.SHIPTO: "",
          deliveryFrom: elemento.DELIVERY_FROM_DAT? moment(elemento.DELIVERY_FROM_DAT, moment.ISO_8601).format("YYYY-MM-DD HH:mm") : "",
          deliveryTo: moment(elemento.DELIVERY_TO_DAT, moment.ISO_8601).format("YYYY-MM-DD HH:mm"),
          // orderStatus: elemento.CUSTORDER_STATUS_CD,
          orderStatus: [status],
          customerOrderNum: elemento.CUSTORDER_NUMBER? elemento.CUSTORDER_NUMBER : "",
          // shipTo: elemento.SHIPTO_SAP_BP_ID,
          // shipTo: elemento.NAME1,
          // product: elemento.SAP_MATERIAL_ID,
          product: elemento.TXT,
          qtyOrdered: elemento.ORDERED.toLocaleString(locale, {minimumFractionDigits: 1}),
          qtyScheduled: elemento.SCHEDULED  ? elemento.SCHEDULED.toFixed(1): 0,
          qtyLoaded: elemento.LOADED,
          qtyDelivered: elemento.DELIVERED ? elemento.DELIVERED.toLocaleString(locale, {minimumFractionDigits: 1}): 0,
          qtyToDeliver: elemento.TOBEDEL ? elemento.TOBEDEL.toLocaleString(locale, {minimumFractionDigits: 1}): 0
        })
      })
      // console.log(datos)
      return datos;
    }
    
    sumatorioCantidades = datos => {
      let ordered, scheduled, loaded, delivered, todeliver, finishedOrders, onroute, pending;
      ordered = scheduled = loaded = delivered = todeliver = finishedOrders = onroute = pending = 0;
      datos.map(elemento => {
        ordered += parseInt(elemento.qtyOrdered);
        scheduled += parseInt(elemento.qtyScheduled);
        loaded += parseInt(elemento.qtyLoaded);
        delivered += parseInt(elemento.qtyDelivered);
        todeliver += parseInt(elemento.qtyToDeliver);
        if (elemento.orderStatus[0] === 'Finished') {
          finishedOrders ++;
        } else if (elemento.orderStatus[0] === 'On Route') {
          onroute ++;
        } else pending ++;
      })
      // console.log(window.navigator)
      this.setState({
        qtyOrdered: ordered.toLocaleString(locale, {minimumFractionDigits: 1}),
        qtyScheduled: scheduled,
        qtyLoaded: loaded,
        qtyDelivered: delivered.toLocaleString(locale, {minimumFractionDigits: 1}),
        qtyToDeliver: todeliver.toLocaleString(locale, {minimumFractionDigits: 1}),
        // delivered:[{y: 1, x: delivered}],
        // toDeliver:[{y: 1, x: todeliver}],
        delivered: delivered,
        toDeliver: todeliver,
        finishedOrders: finishedOrders,
        onroute: onroute,
        pending: pending
        // finishedOrders: [{y: 1, x: finishedOrders}] ,
        // onroute: [{y: 1, x: onroute}],
        // pending: [{y: 1, x: pending}]
      })
      return [ordered,scheduled, loaded, delivered, todeliver];
    }
        
    handleChange = (pagination, filters, sorter, selectedRows) => {
        let totales = [];
        // console.log('Various parameters', pagination, filters, sorter, selectedRows);
        console.log('Various parameters',  filters);
        totales = this.sumatorioCantidades(selectedRows.currentDataSource);
        console.log(totales);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
          filasSeleccionadas: selectedRows.currentDataSource
        });
        console.log(this.state)
    };

    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    });
  
    handleSearch = (selectedKeys, confirm) => {
      console.log(selectedKeys)
      confirm();
      this.setState({ searchText: selectedKeys[0] });
    };


    handleSearch2 = (selectedKeys) => {
      console.log(selectedKeys)
      if (selectedKeys) this.setState({ searchText: selectedKeys })
      
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    handleFiltersClick = (values, selectedKeys) => {
      console.log(values)
      if (selectedKeys) {
        this.setState({ searchText: selectedKeys })
      }
      else {
        this.setState({ searchText: '' })
      }
      this.consultaSelectedRows(values,selectedKeys)
      // if (values.deliveryPlant[0] != null)
      this.setState ({
        filteredInfo: values
      })
      // else {
      //   this.setState ({
      //     filteredInfo: null
      //   })
      // }
    }

    consultaSelectedRows = (values,selectedKeys) => {
      let {datos} = this.state;
      const filtrosDP = values.deliveryPlant;
      const filtrosOS = values.orderStatus;
      const filtroDelFrom = values.deliveryFrom;
      const filtroDelTo = values.deliveryTo;
      const filtroSearch = values.customerOrderNum[0];
      console.log (filtroSearch)

      let selectedRows = [];
      
      if (values.deliveryPlant != null)  {
        selectedRows = [];
        filtrosDP.forEach(filtro => {
          selectedRows = selectedRows.concat(datos.filter(row => row.deliveryPlant === filtro))
        });
        datos = selectedRows;
      }
      else {
        selectedRows = datos;
      }
     if (values.orderStatus !=null) {
      selectedRows = [];
      filtrosOS.forEach(filtro => {
        selectedRows = selectedRows.concat(datos.filter(row => row.orderStatus[0] === filtro)) 
      })
      datos = selectedRows
     }
     if (values.deliveryFrom !=null) {
      selectedRows = [];
      filtroDelFrom.forEach(filtro => {
        selectedRows = selectedRows.concat(datos.filter(row => 
           moment(row.deliveryFrom).format('YYYY-MM-DD') === filtro)) 
      })
      datos = selectedRows
     }
     if (values.deliveryTo !=null) {
      selectedRows = [];
      filtroDelTo.forEach(filtro => {
        selectedRows = selectedRows.concat(datos.filter(row => 
           moment(row.deliveryTo).format('YYYY-MM-DD') === filtro)) 
      })
      datos = selectedRows
     }

     if (selectedKeys !=="") {
      selectedRows = [];
        selectedRows = datos.filter(row => row.customerOrderNum.toString() === filtroSearch) 
        // record.deliveryPlant.indexOf(value) === 0
        datos = selectedRows
     }
     
     if ((values.orderStatus !==null) || (values.deliveryPlant !==null) || (values.deliveryFrom !==null) || (values.deliveryTo !==null) || (values.customerOrderNum[0] !== "")) {
      // this.sumatorioCantidades(selectedRows);
      this.setState({
        filasSeleccionadas: selectedRows
      });
      console.log("actualiza selectedRows")
     }
     else {
      
      this.setState({
        filasSeleccionadas: datos
      });
     }
     this.sumatorioCantidades(selectedRows);
      
      // let selectedRows = datos.filter(row => row.deliveryPlant === "4163")
      // console.log(selectedRows)
    }


    render() {

      let {datos, qtyOrdered, qtyScheduled,qtyLoaded, qtyDelivered, qtyToDeliver, finishedOrders, onroute, pending, filasSeleccionadas, filteredInfo } = this.state;

      filteredInfo = filteredInfo || {};

      const  columns = [
        {
          title: 'Customer',
          dataIndex: 'customer',
          key: 'customer',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          // onFilter: (value, record) => record.product.indexOf(value) === 0,
         
          // ...this.getColumnSearchProps('product'),
          
            sorter: (a, b) => a.customer.length - b.customer.length,
            sortDirections: ['descend','ascend'],
        },
        // {
        //   title: 'Ship To',
        //   dataIndex: 'shipTo',
        //   key: 'shipTo',
        //   // specify the condition of filtering result
        //   // here is that finding the name started with `value`
        //   // onFilter: (value, record) => record.product.indexOf(value) === 0,
         
        //   // ...this.getColumnSearchProps('product'),
        //   sorter: (a, b) => a.shipTo.length - b.shipTo.length,
        //   sortDirections: ['descend','ascend'],
        // },
        {
            title: 'Delivery Plant',
            dataIndex: 'deliveryPlant',
            filters: [
              {
                text: '1070',
                value: '1070',
              },
              {
                text: '1067',
                value: '1067',
              },
              {
                text: '1232',
                value: '1232',
              },
              {
                text: '1042',
                value: '1042',
              },
              {
                text: '5740',
                value: '5740',
              },
              {
                text: '2820',
                value: '2820',
              },
              {
                text: '2765',
                value: '2765',
              },
            ],
            key: 'deliveryPlant',
            filteredValue: filteredInfo.deliveryPlant || null,
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.deliveryPlant.indexOf(value) === 0,
            sorter: (a, b) => a.deliveryPlant - b.deliveryPlant,
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: 'Delivery From',
            dataIndex: 'deliveryFrom',
            filters: [
              {
                text: moment().format('YYYY-MM-DD'),
                value: moment().format('YYYY-MM-DD'),
              },
              {
                text: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                value: moment().subtract(1, 'days').format('YYYY-MM-DD'),
              }
            ],
            key: 'deliveryFrom',
            filteredValue: filteredInfo.deliveryFrom || null,
            onFilter: (value, record) => record.deliveryFrom.includes(value),
            // onFilter: (value, record) => record.deliveryFrom.indexOf(value) === 0,
            sorter: (a, b) => a.deliveryFrom.length - b.deliveryFrom.length,
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: 'Delivery To',
            dataIndex: 'deliveryTo',
            filters: [
              {
                text: moment().format('YYYY-MM-DD'),
                value: moment().format('YYYY-MM-DD'),
              },
              {
                text: moment().subtract(1, 'days').format('YYYY-MM-DD'),
                value: moment().subtract(1, 'days').format('YYYY-MM-DD'),
              }
            ],
            key: 'deliveryTo',
            filteredValue: filteredInfo.deliveryTo || null,
            onFilter: (value, record) => record.deliveryTo.includes(value),
            // onFilter: (value, record) => record.deliveryTo.indexOf(value) === 0,
            sorter: (a, b) => a.deliveryTo.length - b.deliveryTo.length,
            sortDirections: ['descend', 'ascend'],
          }, 
          {
            title: 'Customer Order',
            dataIndex: 'customerOrderNum',
            key: 'customerOrderNum',
            ...this.getColumnSearchProps('customerOrderNum'),  
            filteredValue: filteredInfo.customerOrderNum ,
            sorter: (a, b) => a.customerOrderNum - b.customerOrderNum,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: [
              {
                text: 'Pending',
                value: 'Pending',
              },
              {
                text: 'On Route',
                value: 'On Route',
              },
              {
                text: 'Finished',
                value: 'Finished',
              },
            ],
            render: tags => (
              <span>
                {tags.map(tag => {
                  //let color = tag.length > 5 ? 'geekblue' : 'green';
                  let color = 'geekblue';
                  if (tag === 'Finished') {
                    color = 'green';
                  } else if (tag === 'On Route') {
                    color = 'orange';
                  } 
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </span>
            ),
            filteredValue: filteredInfo.orderStatus || null,
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.orderStatus.indexOf(value) === 0,
            sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value, record) => record.product.indexOf(value) === 0,
            ...this.getColumnSearchProps('product'),
            sorter: (a, b) => a.product.length - b.product.length,
            sortDirections: ['descend','ascend'],
          },
          {
            title: 'QTY Ordered',
            dataIndex: 'qtyOrdered',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.qtyOrdered - b.qtyOrdered,
          },
          // {
          //   title: 'QTY Scheduled',
          //   dataIndex: 'qtyScheduled',
          //   sorter: (a, b) => a.qtyScheduled - b.qtyScheduled,
          //   sortDirections: ['descend', 'ascend'],
          // }, 
          // {
          //   title: 'QTY Loaded',
          //   dataIndex: 'qtyLoaded',
          //   sorter: (a, b) => a.qtyLoaded - b.qtyLoaded,
          //   sortDirections: ['descend', 'ascend'],
          // },
          {
            title: 'QTY Delivered',
            dataIndex: 'qtyDelivered',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.qtyDelivered - b.qtyDelivered,
          },
          {
            title: 'QTY to Deliver',
            dataIndex: 'qtyToDeliver',
            sorter: (a, b) => a.qtyToDeliver - b.qtyToDeliver,
            sortDirections: ['descend', 'ascend'],
          },
      ];
      
      
        return (
            <div className="dashboard">
                <Filters onFilterValue={this.handleFiltersClick} 
                onSearchValue={this.handleSearch2}
                /> 
                <div className="charts">
                <Chart
                    chartData1={this.state.delivered}
                    chartData2={this.state.toDeliver}
                    />                    
                <Chart2
                    chartData1={finishedOrders}
                    chartData2={onroute}
                    chartData3={pending}
                    />                    
                </div>
                <div className="exportData">
                  {filasSeleccionadas &&
                  <Button icon="download" size="large">
                      <CSVLink data={filasSeleccionadas} >Download Data</CSVLink>
                  </Button>
                  
                  }
                  
                </div>
                <Sumatories qtyOrdered={qtyOrdered} 
                  qtyScheduled={qtyScheduled}
                  qtyLoaded={qtyLoaded}
                  qtyDelivered={qtyDelivered}
                  qtyToDeliver={qtyToDeliver}  
        />
    <Table onChange={this.handleChange} 
    onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            window.location = `../deliverydetail/${record.CustomerOrderId}/${record.deliveryPlant}`;
          
          console.log(record)}, // click row
          onDoubleClick: event => {}, // double click row
          onContextMenu: event => {}, // right button click row
          onMouseEnter: event => {}, // mouse enter row
          onMouseLeave: event => {}, // mouse leave row
        };
      }}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={datos}
      expandedRowRender={record => <p style={{ margin: 0 }}><span className="expanded-bold">Ship To: </span>{record.shipTo}</p>}
    />
                
            </div>        
        )
    }    
}    






