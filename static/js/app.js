//Aims: build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogues the microbes that colonise human navels.
//The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


//--------------------//


// 1. Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

// Get the samples endpoint:
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it:
d3.json(url).then(function(data) {
    console.log("Samples data: ", data);
  });


//--------------------//


// Initialize the dashboard:
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

    //Call the function to create a  horizontal bar chart, a bubble chart and an individual's demographic information:
    hbarChart(id);
    bubbleChart(id);
    gaugeChart(id);
    demographic(id)
  });
}

// Call the initialize function

init();


//--------------------//


// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function hbarChart(selectedID){
  d3.json(url).then(function(data){
    // Select samples in the data
    let samples = data.samples;
    console.log("samples: ", samples);

    // Filter samples by using the selected ID
    let filteredSample = samples.filter((sample) => sample.id === selectedID);

    // Assign the first index in the filtered sample data to an object variable:
    let object = filteredSample[0];
    console.log("object: ", object)

    // Create bar chart elements (Vy's note: using slice() to extract the first 10 OTUs found in each individual)
    
    // Use sample_values as the values for the bar chart
     let x = object.sample_values.slice(0, 10).reverse();
    console.log("x: ", x)

    // Use otu_ids as the labels for the bar chart
    let y = object.otu_ids.slice(0, 10).map((otu_ids) => `OTU ${otu_ids}`).reverse();
    console.log("y: ", y)

    // Use otu_labels as the hovertext for the chart
    let text = object.otu_labels.slice(0, 10).reverse();
    console.log("text: ", text)

    // Create a trace for horizontal bar chart
    let trace1 = {
      x: x,
      y: y, 
      text: text,
      type: "bar",
      orientation: "h",
      marker: {
        color: "#ff3399",
        width: 1
      },
    };

    // Create a data array for the bar chart
    let dataArray = [trace1];
    console.log("trace1: ", dataArray)

    // Create a layout for the chart
    let layout = {
      title: "<b>The top 10 OTUs found in the individual<b>",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        },
      height: 500,
      width: 500
      };
      console.log("layout: ", layout)

      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", dataArray, layout);
  })
}


//--------------------//


// 3. Create a bubble chart that displays each sample.
function bubbleChart(selectedID){
  d3.json(url).then(function(data){
    // Select samples in the data
    let samples = data.samples;
    console.log("samples: ", samples);

    // Filter samples by using the selected ID
    let filteredSample = samples.filter((sample) => sample.id === selectedID);

    // Assign the first index in the filtered sample data to an object variable
    let object = filteredSample[0];

    // Create chart elements:
    
    // Use otu_ids for the x values
    let x = object.otu_ids;
    console.log("x: ", x)
    
    // Use sample_values for the y values
    let y = object.sample_values;
    console.log("y: ", y)

    // Use sample_values for the marker size
    let makerSize = object.sample_values;
    console.log("makerSize: ", makerSize)

    // Use otu_ids for the marker colors
    let colors = object.otu_ids;
    console.log("colors: ", colors)

    // Use otu_labels for the text values
    let text = object.otu_labels;
    console.log("text: ", text)

    // Create a trace for the bubble chart
    // Colorscale picker ref: https://plotly.com/python/builtin-colorscales/
    let trace1 = {
      x: x,
      y: y, 
      text: text,
      mode: "markers",
      marker: {
        size: makerSize,
        color: colors,
        colorscale: "sunsetdark"
      }
    };

    // Create a data array for the bubble chart
    let dataArray = [trace1];
    console.log("trace1: ", dataArray)

    // Create a layout for the chart
    let layout = {
      xaxis: {title: "OTU ID"}
      };

      console.log("layout: ", layout)

      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bubble", dataArray, layout);
  })
}


//--------------------//


// Creating a gauge chart (ref: https://plotly.com/javascript/gauge-charts/)

function gaugeChart(selectedID){
  d3.json(url).then(function(data){
    // Select metadata in the data
    let metaData = data.metadata;
    console.log("metadata: ", metaData);

    // Filter samples by using the selected ID (Vy's note: the id stored in meta.id is string, but the selectedID is in interger, therefore using '==' to compare loosely the data values and ignore the data type)
    let filteredSample = metaData.filter((meta) => meta.id == selectedID);

    // Assign the first index in the filtered sample data to an object variable:
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
      title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
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

    // Render the plot to the div tag with id "gauge"
    Plotly.newPlot('gauge', dataArray, layout);
  });
};


//--------------------//


// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
function demographic(selectedID){
  d3.json(url).then(function(data){
    // Select metadata in the data
    let metaData = data.metadata;
    console.log("metaData: ", metaData)

    // Filter samples by using the selected ID (Vy's note: the id stored in meta.id is string, but the selectedID is in interger, therefore using '==' to compare loosely the data values and ignore the data type)
    let filteredMetaData = metaData.filter((meta) => meta.id == selectedID);

    // Assign the first index in the filtered sample data to an object variable:
    let object = filteredMetaData[0];
    console.log("object: ", object)

    // Clear the child elements html in <div id="sample-metadata" class="panel-body"></div> with selectedID
    d3.select("#sample-metadata").html("");
    console.log("html object:", d3.select("#sample-metadata"))
    
    // Use Object.entries() to return key-value pairs from an object and then add each pairs to the <div id="sample-metadata" class="panel-body"></div>
    // "The Object.entries() static method returns an array of a given object's own enumerable string-keyed property key-value pairs" (ref = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
    let entries = Object.entries(object);
    console.log("entries: ", entries)

    entries.forEach(([key, value]) => {
      d3.select("#sample-metadata").append ("h4").text(`${key}: ${value}`);
    });
  }); 
}


//--------------------//


// 6. Update all the plots when a new sample is selected.

function optionChanged(selectedID) {
  hbarChart(selectedID);
  bubbleChart(selectedID);
  gaugeChart(selectedID);
  demographic(selectedID)
};


//--------------------//


// 7. Deploy the app to a free static page hosting service, such as GitHub Pages

// https://vimeow.github.io/belly-button-challenge/


//--------------------//


//END