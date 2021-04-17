import Chart from 'chart.js';
// import {getArtistInfoAndRecommendations} from './spotify_modules';
// import getMyTopArtists from './App';
import {getFeaturesById} from'./spotify_modules';
import scrollIntoView from 'scroll-into-view';
import React from 'react';
let featuresChart

export default class AudioFeatures extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.getFeaturesById = getFeaturesById.bind(this)
  }
  componentDidMount() {

  }

  render() {
    let topTracksForFeatures = this.props.tracks
    let trackIds = topTracksForFeatures.map(track => track.id);
    let labelArr = [];
    let dataArr = [];
    for (var key in this.state.chosenTrackFeatures) {
        if(this.state.chosenTrackFeatures[key] >= 0 && this.state.chosenTrackFeatures[key] <=1 && key !== 'mode' && key !== 'key'){
        labelArr.push(key);
        dataArr.push(this.state.chosenTrackFeatures[key])
        let index = labelArr.indexOf('valence');
        if(index !== -1){
          labelArr[index] = 'positivity'
        }
      }
};

    let trackNames = topTracksForFeatures.map(track => <button id="round-button" className="btn btn-secondary" style={{whiteSpace: 'normal'}} key={track.id} onClick={(e)=> this.getFeaturesById(track.id)}>{track.artists[0].name + ' - ' + track.name}</button>);
    if(this.state.chosenTrackFeatures){
    featuresChart && featuresChart.chart && featuresChart.chart.destroy();

      let ctx = document.getElementById("featuresChart").getContext('2d');
        featuresChart = new Chart(ctx, {
       type: 'doughnut',
       data: {
         labels: labelArr,
         datasets: [
           {
             data: dataArr,
             backgroundColor: [
               'rgba(80,81,79, 0.9)',
               'rgba(242,95,92, 0.9)',
               'rgba(255,224,102, 0.9)',
               'rgba(36,123,160, 0.9)',
               'rgba(172,127,141, 0.9)',
               'rgba(0, 0,0,0.8)',
               'rgba(214,40,40, 0.9)',
               'rgba(244,162,97, 0.9)',
               'rgba(0,168,232, 0.9)',
               'rgba(81,59,86, 0.9)',
               'rgba(80,81,79, 0.9)',
               'rgba(242,95,92, 0.9)',
               'rgba(255,224,102, 0.9)',
               'rgba(36,123,160, 0.9)',
               'rgba(172,127,141, 0.9)',
               'rgba(0, 0,0,0.8)',
               'rgba(214,40,40, 0.9)',
               'rgba(244,162,97, 0.9)',
               'rgba(0,168,232, 0.9)',
               'rgba(81,59,86, 0.9)'
             ],
             borderColor: [
               'rgba(80,81,79, 1)',
               'rgba(242,95,92, 1)',
               'rgba(255,224,102, 1)',
               'rgba(36,123,160, 1)',
               'rgba(172,127,141, 1)',
               'rgba(0, 0,0,1)',
               'rgba(214,40,40, 1)',
               'rgba(244,162,97, 1)',
               'rgba(0,168,232, 1)',
               'rgba(81,59,86, 1)',
               'rgba(80,81,79, 1)',
               'rgba(242,95,92, 1)',
               'rgba(255,224,102, 1)',
               'rgba(36,123,160, 1)',
               'rgba(172,127,141, 1)',
               'rgba(0, 0,0,1)',
               'rgba(214,40,40, 1)',
               'rgba(244,162,97, 1)',
               'rgba(0,168,232, 1)',
               'rgba(81,59,86, 1)'
             ],
             borderWidth: 1
           }
         ]
       },
       options: {
         maintainAspectRatio: false,
         legend: {
             labels: {
                 fontColor: "white",
                 fontSize: 14,
                 textAlign: 'center'
             }
         },
         ids: trackIds,
         onClick: function(e) {
           var element = featuresChart.getElementAtEvent(e);
           if (element.length > 0) {
             // let clickedElementindex = element[0]["_index"];
             // let label = featuresChart.data.labels[clickedElementindex];
             // chosenId = element[0]._chart.options.ids[clickedElementindex]
             // let value = featuresChart.data.datasets[0].data[clickedElementindex];
           }
           },
         animation: {
           animateRotate: true,
           duration: 5000
         },
         tooltips: {
           mode: 'dataset'
         },
         legend: {
           onHover: function (e) {
             e.target.style.cursor = 'pointer';
           }
         },
         hover: {
           onHover: function (e) {
             var point = this.getElementAtEvent(e);
             if (point.length) e.target.style.cursor = 'pointer';
             else e.target.style.cursor = 'default';
           }
         },
         scaleShowValues: false,
         scaleShowGridLines: false,
         scales: {
           yAxes: [
             {
               ticks: {
                 beginAtZero: true,
                 autoSkip: false,
                 display: false
               }
             }
           ],
           xAxes: [
             {
               ticks: {
                 autoSkip: false,
                 display: false
               }
             }
           ]
         }
       }
     });
    }
    return (
      
      <div id="audioFeaturesContainer" className="container">
        <div className="empty-space" style={{ height: "100px", width: "100%" }}></div>

      <div className="wrapper text-center">
      <h3 className="grey-text">Click one of your favorite tracks to get an analysis of its musical features</h3>
          <h3 className="grey-text underline cursor-pointer" onClick={() => scrollIntoView(document.getElementById("customizedButtonsContainer"))}>OR search for tracks based on musical features</h3>
      <div className="btn-group text-center features-section-btn-group">
      {trackNames}
      </div>


      </div>
      <div className="chart-container" style={{position:"relative", height:"100%", width: "100%"}}>
      <canvas width="800" height="400" minwidth='200' id="featuresChart"></canvas>

      </div>
      </div>)

    }

  }
