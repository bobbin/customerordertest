import React, { Component } from 'react'
import { Table, Tag } from 'antd';
import DataSingleDelivery from '../../data/singledelivery-6.json'
import './DeliveryDetail.css'

const datosDelivery = DataSingleDelivery;

export default class DeliveryDetail extends Component {

    state = {
    
    };
    

    componentDidMount () {
     let datos = [];
     datos = this.cargaDatosJson(datosDelivery);
     this.setState({
       datos: datos,
       id: this.props.id,
       shippingPoint: this.props.shippingPoint
      })
    }

    cargaDatosJson = (datosdelivery) => {
      let datos = [];
      const {id} = this.props;
      console.log(id)
      datosdelivery.recordset.map( (elemento, idx) => {

        if (elemento.CUSTORDER_ID === id) {
          let status = 'elemento.ORDER_STATUS_CD';
          if (elemento.ORDER_STATUS_CD === 16) {
            status = 'Finished';
          } else if (elemento.ORDER_STATUS_CD === 17) {
            status = 'Deleted';
          } else {
            status = 'Loading';
          }
          datos.push({
            key: idx,
            CustomerOrderId: elemento.CUSTORDER_ID,
            deliveryNum: elemento.ORDER_NUMBER? elemento.ORDER_NUMBER: "",
            deliveryStatus: [status],
            materialName: elemento.MATERIAL,
            LDSDeliveryNote: elemento.LDS_DELIVERY_NOTE_NO_1 ? elemento.LDS_DELIVERY_NOTE_NO_1 : "",
            deliveryTimeWindow: `${elemento.DELIVERY_FROM_DAT} - ${elemento.DELIVERY_TO_DAT}`,
            estimatedArrival: elemento.DELIVERY_FROM_DAT,
            // shipping: "Shipping Point",
            commercialCarrier: elemento.DISPLAY_NAME,
            vehiculeNo: elemento.TRUCK_PLATE_NO,
            orderedQty: `${elemento.ORDERED_QUANTITY} ${elemento.UOM}`,
            orderedUOM: elemento.UOM.toLowerCase(),
            deliveredQty: `${elemento.DELIVERED_QUANTITY} ${elemento.UOM_1}`,
            deliveredUOM: elemento.UOM_1
          })
        }
      })
      // console.log(datos)
      return datos;
    }

    
    render() {
        const {datos, id, shippingPoint} = this.state;
        // const {id} = this.props;
      
        const columns = [
            {
              title: 'Delivery Num',
              dataIndex: 'deliveryNum',
              onFilter: (value, record) => record.deliveryNum.indexOf(value) === 0,
              sorter: (a, b) => a.deliveryNum - b.deliveryNum,
              sortDirections: ['descend', 'ascend'],
            },
            {
              title: 'Delivery Status',
              dataIndex: 'deliveryStatus',
              render: tags => (
                <span>
                  {tags.map(tag => {
                    //let color = tag.length > 5 ? 'geekblue' : 'green';
                    let color = 'geekblue';
                    if (tag === 'Finished') {
                      color = 'green';
                    } else if (tag === 'Loading') {
                      color = 'orange';
                    } else if (tag === 'Deleted') {
                      color = 'red';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </span>
              ),
              defaultSortOrder: 'descend',
              sorter: (a, b) => a.deliveryStatus - b.deliveryStatus,
            },
            {
                title: 'Material',
                dataIndex: 'materialName',
                sorter: (a, b) => a.materialName.length - b.materialName.length,
                sortDirections: ['descend', 'ascend'],
              },
              // {
              //   title: 'LDS Delivery Note',
              //   dataIndex: 'LDSDeliveryNote',
              //   sorter: (a, b) => a.LDSDeliveryNote - b.LDSDeliveryNote,
              //   sortDirections: ['descend', 'ascend'],
              // },
              {
                title: 'Ordered Qty',
                dataIndex: 'orderedQty',
                sorter: (a, b) => a.orderedQty.length - b.orderedQty.length,
                sortDirections: ['descend', 'ascend'],
              },
              // {
              //   title: 'Uom',
              //   dataIndex: 'orderedUOM',
              //   sorter: (a, b) => a.uom.length - b.uom.length,
              //   sortDirections: ['descend', 'ascend'],
              // },
              {
                title: 'Delivered Qty',
                dataIndex: 'deliveredQty',
                sorter: (a, b) => a.deliveredQty.length - b.deliveredQty.length,
                sortDirections: ['descend', 'ascend'],
              },
              {
                title: 'Delivery Window',
                dataIndex: 'deliveryTimeWindow',
                sorter: (a, b) => a.deliveryTimeWindow.length - b.deliveryTimeWindow.length,
                sortDirections: ['descend', 'ascend'],
              },
              {
                title: 'Estimated Loading Time',
                dataIndex: 'estimatedArrival',
                sorter: (a, b) => a.estimatedArrival.length - b.estimatedArrival.length,
                sortDirections: ['descend', 'ascend'],
              },
              // {
              //   title: 'Shipping',
              //   dataIndex: 'shipping',
              //   sorter: (a, b) => a.shipping.length - b.shipping.length,
              //   sortDirections: ['descend', 'ascend'],
              // },
              {
                title: 'Executing Carrier',
                dataIndex: 'commercialCarrier',
                sorter: (a, b) => a.commercialCarrier.length - b.commercialCarrier.length,
                sortDirections: ['descend', 'ascend'],
              },
              {
                title: 'Plate Number',
                dataIndex: 'vehiculeNo',
                sorter: (a, b) => a.vehiculeNo.length - b.vehiculeNo.length,
                sortDirections: ['descend', 'ascend'],
              },
                    ];
          
          // const data = [
          //   { deliveryNum: "1111", deliveryStatus: "Finished", materialName: "Concr Stone, 14mm", uom: "15 tons", deliveryTimeWindow: "02.04.19 07:00 - 02.02.19 14:00", estimatedArrival: "02.04.19 13:00", shipping: "Agg Olive Hill", commercialCarrier: "Tongaat Plant Hire", vehiculeNo: "FNH113MP"},  
          //   { deliveryNum: "1111", deliveryStatus: "Finished", materialName: "Concr Stone, 14mm", uom: "15 tons", deliveryTimeWindow: "02.04.19 07:00 - 02.02.19 14:00", estimatedArrival: "02.04.19 13:00", shipping: "Agg Olive Hill", commercialCarrier: "Tongaat Plant Hire", vehiculeNo: "FNH113MP"},  
          //   { deliveryNum: "1111", deliveryStatus: "Finished", materialName: "Concr Stone, 14mm", uom: "15 tons", deliveryTimeWindow: "02.04.19 07:00 - 02.02.19 14:00", estimatedArrival: "02.04.19 13:00", shipping: "Agg Olive Hill", commercialCarrier: "Tongaat Plant Hire", vehiculeNo: "FNH113MP"},  
          //   { deliveryNum: "1111", deliveryStatus: "Finished", materialName: "Concr Stone, 14mm", uom: "15 tons", deliveryTimeWindow: "02.04.19 07:00 - 02.02.19 14:00", estimatedArrival: "02.04.19 13:00", shipping: "Agg Olive Hill", commercialCarrier: "Tongaat Plant Hire", vehiculeNo: "FNH113MP"},  
          //   { deliveryNum: "1111", deliveryStatus: "Finished", materialName: "Concr Stone, 14mm", uom: "15 tons", deliveryTimeWindow: "02.04.19 07:00 - 02.02.19 14:00", estimatedArrival: "02.04.19 13:00", shipping: "Agg Olive Hill", commercialCarrier: "Tongaat Plant Hire", vehiculeNo: "FNH113MP"},  
          //  ];
                  
          function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
          }
        // console.log(match); 
        return (
            <div>
                <h2>Customer Order: {id}
                  <span>Shipping Point: {shippingPoint}</span>
                </h2>
                <Table columns={columns} dataSource={datos} onChange={onChange} 
                expandedRowRender={record => <p style={{ margin: 0 }}><span className="expanded-bold">LDS Delivery No: </span>{record.LDSDeliveryNote}</p>}
                />
            </div>
        )
    }
}
