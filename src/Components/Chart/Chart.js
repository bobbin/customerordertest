import React from 'react';
import {
  XYPlot,
  // XAxis,
  // YAxis,
  DiscreteColorLegend,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas
} from 'react-vis';
import './chart.css';

export default class Chart1 extends React.Component {
  state = {
    useCanvas: false
  };

  calculatePercentages = (chartData1, chartData2) => {
    let deliverPercentage = (chartData1 / (chartData1 + chartData2)) * 100;
    let todeliverPercentage = 100 - deliverPercentage;
    return [deliverPercentage.toFixed(2),todeliverPercentage.toFixed(2) ]
  }
  render() {
    const {chartData1, chartData2} = this.props;
    const percentages = this.calculatePercentages(chartData1, chartData2);
    const Data1 = [{y: 1, x: chartData1}];
    const Data2 = [{y: 1, x: chartData2}];
    
    const {useCanvas} = this.state;
    const BarSeries = useCanvas
      ? HorizontalBarSeriesCanvas
      : HorizontalBarSeries;
    return (
      <div className="chart">
        <XYPlot width={500} height={120} stackBy="x">
        <DiscreteColorLegend
            style={{position: 'absolute',color: 'white', left: '50px', top: '35px', display: 'flex', justifyContent: 'space-between', width: '365px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Delivered (' + percentages[0] + '%)',
                // title: {},
                color: 'transparent'
              },
              {
                title: 'To Deliver (' + percentages[1] + '%)',
                color: 'transparent'
              }
            ]}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          {/* <XAxis /> */}
          <BarSeries data={Data1} color="#7b6668"/>
          <BarSeries data={Data2} color="#4c403b"/>
          {/* <BarSeries data={this.props.chartData3} /> */}
        </XYPlot>
      </div>
    );
  }
}