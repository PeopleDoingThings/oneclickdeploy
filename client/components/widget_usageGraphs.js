import React, { Component } from 'react';
import d3 from 'd3';
import tip from 'd3-tip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import ReactFauxDOM from 'react-faux-dom';
import ReactDom from 'react-dom';

const memGraph = new ReactFauxDOM.Element('div');
const cpuGraph = new ReactFauxDOM.Element('div');
const txGraph = new ReactFauxDOM.Element('div');
const rxGraph = new ReactFauxDOM.Element('div');

function makeChart(data, container, y_Max, title, yLabel) {
  //console.log('data', data)

  let margin = {top: 30, right: 20, bottom: 30, left: 50},
      width = 600 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom

  let duration = 1500;
  let delay = 500;
  let parseDate = d3.time.format("%I %p");

  let x = d3.time.scale().range([0, width]);
  let y = d3.scale.linear().range([height, 0]);

  let xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(12)
      .tickFormat( function(d,i) {
        // console.log('*********************')
        // console.log('parsed d is:', d)
        //return "" + i;
        return "" + parseDate(d);
      });

  let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5);

  let area = d3.svg.area()
      .interpolate("basis")
      .x(function(d) { //console.log('x axis:', d.timestamp); 
        return x(d.timestamp); })
      .y0(height)
      .y1(function(d) { //console.log('y axis:', d.value); 
        return y(d.value); });


  let valueline = d3.svg.line()
      .interpolate("basis")
      .x(function(d) { return x(d.timestamp); })
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
          .ticks(12)
  }

  // function for the y grid lines
  function make_y_axis() {
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
  }

  // Get the data
      data.forEach(function(d) {
          d.timestamp = d.timestamp * 1000
          d.value = +d.value;
      });

      if (y_Max === null) {
        //console.log('max number', d3.max(data, function(d) { return d.timestamp; }))
        y_Max = 20000
        //d3.max(data, function(d) { return d.timestamp; })
      }

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
          .text(yLabel);

      // Add the text label for the Y axis
      svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("x", margin.top - (height / 2))
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yLabel);

      //Add the title
      svg.append("text")
          .attr("x", 0)     
          .attr("y", 0 - (margin.top / 2))
          .attr("class", "title")
          .text(`${title} Graph: Last Day`);
}



export default class MemUsage extends Component { 
  constructor(props){
    super(props);

    let newRXtest = this.props.rxUsage.values.map((item) => {
      console.log(item.value/1000000);
    })

    console.log('memUsage: ', this.props.memUsage);
    console.log('cpuUsage: ', this.props.cpuUsage);
    console.log('rxUsage: ', this.props.rxUsage);
    console.log('txUsage: ', this.props.txUsage);

    const newMem = this.props.memUsage.values;
    const newCPU = this.props.cpuUsage.values;
    const newTX = this.props.txUsage.values;
    const newRX = this.props.rxUsage.values;

    if( this.props.txUsage.values.length !== 0 && 
        this.props.rxUsage.values.length !== 0
      ) {
        console.log('start making charts yo')
        makeChart(newMem, memGraph, null, "RAM usage", 'RAM(mb)');
        makeChart(newCPU, cpuGraph, 100, "CPU usage", 'CPU(%)');
        makeChart(newTX, txGraph, null, "outgoing", 'TX(mb)');
        makeChart(newRX, rxGraph, null, "incoming", 'RX(mb)');
      }

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



