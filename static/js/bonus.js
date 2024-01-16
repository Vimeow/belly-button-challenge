
// Display the default plots:
function init() {

    // Select the dropdownMenu location from html
    let dropdownMenu = d3.select("#selDataset");
  
    // Add the idList into the dropdownMenu:
    // Obtain the ids and stored in the idList
    d3.json(url).then(function(data){
      let idList = data.names;
  
      // Checking the dropdownList by log it to the console
      console.log("idList: ", idList);
  
      // Add the idList into the dropdownMenu
      // iterate through the idList -> 
      // append each id as an "option" to the dropdownMenu
      idList.forEach((id) => {
        dropdownMenu.append("option").text(id).property("value", id);
      });
  
      //Assign the first id to the id variable:
      let id = idList[0]
      console.log("First id: ", id)
  
      //Call the function to create a gaugeChart:
      gaugeChart(id);
    });
}


//--------------------//


// Bonus gauge chart (ref: https://plotly.com/javascript/gauge-charts/)

function gaugeChart(selectedID){
    d3.json(url).then(function(data){
      // Select metadata in the data
      let metaData = data.metadata;
      console.log("metadata: ", metaData);
  
      // Filter samples by using the selected ID (Vy's note: the id stored in meta.id is string, but the selectedID is in interger, therefore using '==' to compare loosely the data values and ignore the data type)
      let filteredSample = metaData.filter((meta) => meta.id == selectedID);
  
      // Assign filtered sample data of the first ID to an object variable:
      let object = filteredSample[0];
      console.log("object: ", object)
  
      // Use wfreg as the value for the gauge chart
      let value = object.wfreq
      console.log("Wash frequency: ", value)
  
      // Create a trace for the gauge chart
      // Color picker ref: https://www.w3schools.com/colors/colors_picker.asp
      let trace1 = {
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        title: { text: "<b><b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: { axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
          bar: {color: "black"},
          steps: [
            {range: [0, 1], color: "#ffffff"},
            {range: [1, 2], color: "#ffcce6"},
            {range: [2, 3], color: "#ff99cc"},
            {range: [3, 4], color: "#ff66b3"},
            {range: [4, 5], color: "#ff3399"},
            {range: [5, 6], color: "#ff0080"},
            {range: [6, 7], color: "#cc0066"},
            {range: [7, 8], color: "#99004d"},
            {range: [8, 9], color: "#660033"},
            {range: [9, 10], color: "#33001a"},
        ]}
      };
  
      // Create a data array for the gauge chart
      let dataArray = [trace1];
      console.log("trace1: ", dataArray)
  
      // Create a layout for the chart
      var layout = {
        width: 600,
        height: 500
      };
  
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot('gauge', dataArray, layout);
    });
  };


//--------------------//


// Update the chart when a new sample is selected
function optionChanged(selectedID) {gaugeChart(selectedID)};


//--------------------//


// Call the initialize function
init();