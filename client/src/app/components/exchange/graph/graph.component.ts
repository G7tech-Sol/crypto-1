import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit
{
  chart=new Chart (
  {
    chart:{
      type:'line'
    },
    title:{
      text:'Crypto Graph'
    },
    credits:{
      enabled: false
    },
    series:[
    {
      name:'Line 1',
      data:[10,20,30,50,40,50]
    }]
  });

  add()
  {
    this.chart.addPoint(Math.floor(Math.random()*20));
  }

  constructor(private authService:AuthService) { }

  ngOnInit()
  {
  }

}
