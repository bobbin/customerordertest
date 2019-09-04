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
import './chart2.css';

export default class Chart2 extends React.Component {
  state = {
    useCanvas: false
  };

  calculatePercentages = (chartData1, chartData2, chartData3) => {
    let finished = (chartData1 / (chartData1 + chartData2 + chartData3)) * 100;
    let onroute = (chartData2 / (chartData1 + chartData2 + chartData3)) * 100;
    let pending = 100 - finished - onroute;
    // console.log('chartData1 ' + chartData1);
    // console.log('chartData2 ' + chartData2);
    // console.log('chartData3 ' + chartData3);
    return [finished.toFixed(2),onroute.toFixed(2),pending.toFixed(2)]
  }

  generaItems = percentages => {
    let items = [];
    if (percentages[0] > 2) {
      items.push({
        title: 'Finished (' + percentages[0] + '%)',
        color: 'transparent'
      })
    }
    if (percentages[1] > 2) {
      items.push({
        title: 'On Route (' + percentages[1] + '%)',
        color: 'transparent'
      })
    }
    if (percentages[2] > 2) {
      items.push({
        title: 'Pending (' + percentages[2] + '%)',
        color: 'transparent'
      })
    }
    return items;
  }

  render() {
    const {chartData1, chartData2, chartData3} = this.props;
    const Data1 = [{y: 1, x: chartData1}];
    const Data2 = [{y: 1, x: chartData2}];
    const Data3 = [{y: 1, x: chartData3}];
    const percentages = this.calculatePercentages(chartData1, chartData2, chartData3);
    let items = this.generaItems (percentages);
    

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
            // items={[
            //   {
            //     title: 'Finished (' + percentages[0] + '%)',
            //     color: 'transparent'
            //   },
            //   {
            //     title: 'On Route',
            //     color: 'transparent'
            //   },
            //   {
            //     title: 'Pending',
            //     color: 'transparent'
            //   }
            // ]}
            items= {items}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          {/* <XAxis /> */}
          <BarSeries data={Data1} color="#7b6668"/>
          <BarSeries data={Data2} color="#4c403b"/>
          <BarSeries data={Data3} color="#a78b8e"/>
        </XYPlot>
      </div>
    );
  }
}

