import React, { Component } from 'react';
import d3 from 'd3';
import tip from 'd3-tip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import ReactFauxDOM from 'react-faux-dom';
import ReactDom from 'react-dom';
//import { util, Chart, DataSeries, BarChart, XAxis, YAxis } from 'diffract';

const memGraph = new ReactFauxDOM.Element('div');
const cpuGraph = new ReactFauxDOM.Element('div');
const txGraph = new ReactFauxDOM.Element('div');
const rxGraph = new ReactFauxDOM.Element('div');

let data = [
    {date: '1-May-12', close: 58.13},
    {date: '1-May-12', close: 68.13},
    {date: '2-May-12', close: 78.13},
    {date: '2-May-12', close: 58.13},
    {date: '3-May-12', close: 28.13},
    {date: '3-May-12', close: 38.13},
    {date: '3-May-12', close: 28.13}
  ]

function makeChart(data, container, y_Max) {
  //console.log('data', data)
  
  let margin = {top: 10, right: 20, bottom: 10, left: 50},
      width = 700 - margin.left - margin.right,
      height = 170 - margin.top - margin.bottom

  // for (var i = 0; i < data.length; i++) {
  //           data[i].timestamp = parseDate(data[i].Date);
  //       }

  //console.log("data", data)      

  let parseDate = d3.time.format("%Y-%m-%d %H:%M:%S").parse;

  // let x = d3.time.scale()
  //       .domain([timeFormat.parse('2014-03-08T12:00:00'), timeFormat.parse('2014-03-10T00:00:00')])
  //       .range([0, width]);

  let x = d3.time.scale().range([0, width]);
  let y = d3.scale.linear().range([height, 0]);

  let yRamLabel = 'RAM(mb)'

  let xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(24);

  let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(24);

  let area = d3.svg.area()
      .x(function(d) { return x(d.timestamp); })
      .y0(height)
      .y1(function(d) { return y(d.value); });

  let valueline = d3.svg.line()
      .x(function(d) { console.log(+d.timestamp); return x(d.timestamp); })
      .y(function(d) { return y(d.value); });   
      
  let svg = d3.select(container)
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", 
                "translate(" + margin.left + "," + margin.top + ")");
          

  // function for the x grid lines
  function make_x_axis() {
      return d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(24)
  }

  // function for the y grid lines
  function make_y_axis() {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(24)
  }

  // Get the data
      data.forEach(function(d) {
          var date =  new Date(d.timestamp * 1000);
          d.timestamp = date.getHours();
          //parseDate( new Date("" + d.timestamp) )
          d.value = +d.value;
      });

      // Scale the range of the data
      x.domain(d3.extent(data, function(d) { return d.timestamp }));
      y.domain([0, //d3.max(data, function(d) { return d.value; })
        y_Max]);

      // Add the filled area
      svg.append("path")
          .datum(data)
          .attr("class", "area")
          .attr("d", area);

      // Draw the x Grid lines
      svg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + height + ")")
          .call(make_x_axis()
              .tickSize(-height, 0, 0)
              .tickFormat("")
          )

      // Draw the y Grid lines
      svg.append("g")            
          .attr("class", "grid")
          .call(make_y_axis()
              .tickSize(-width, 0, 0)
              .tickFormat("")
          )

      // Add the valueline path.
      svg.append("path")
          .attr("d", valueline(data));
          
      // Add the X Axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
         
      // Add the Y Axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      // // Add the text label for the X axis
      // svg.append("text")
      //     .attr("transform",
      //           "translate(" + (width/2) + " ," + 
      //                          (height+margin.bottom) + ")")
      //     .style("text-anchor", "middle")
      //     .text("time");
      //     console.log('x text label working')

      // Add the white background to the y axis label for legibility

      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("x", margin.top - (height / 2))
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .attr("class", "shadow")
          .text(yRamLabel);

      // Add the text label for the Y axis
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("x", margin.top - (height / 2))
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yRamLabel);

      // Add the title
      // svg.append("text")
      //     .attr("x", (width / 2))     
      //     .attr("y", 0 - (margin.top / 2))
      //     .attr("text-anchor", "middle")
      //     .style("font-size", "16px")
      //     .style("text-decoration", "underline")
      //     .text("RAM Graph: Last Day");
      //     console.log('title working')
}



export default class MemUsage extends Component { 
  constructor(props){
    super(props);
    console.log('memUsage: ', this.props.memUsage);
    console.log('cpuUsage: ', this.props.cpuUsage);
    console.log('rxUsage: ', this.props.rxUsage);
    console.log('txUsage: ', this.props.txUsage);

    const newMem = this.props.memUsage.values;
    const newCPU = this.props.cpuUsage.values;
    const newTX = this.props.txUsage.values;
    const newRX = this.props.rxUsage.values;

    makeChart(newMem, memGraph, 1000);
    makeChart(newCPU, cpuGraph, 1);
    makeChart(newTX, txGraph, 1000);
    makeChart(newRX, rxGraph, 1000);


  }

  render() {      
        return (
        <div>
          <div>{memGraph.toReact()} </div>   
          <div>{cpuGraph.toReact()} </div>   
          <div>{txGraph.toReact()} </div> 
          <div>{rxGraph.toReact()} </div> 
        </div>     
        );
  }
}



