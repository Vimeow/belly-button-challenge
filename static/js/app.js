//Aims: build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogues the microbes that colonise human navels.
//The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


//--------------------//DONE


// 1. Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

// Get the samples endpoint:
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it:
d3.json(url).then(function(data) {
    console.log("Samples data: ", data);
  });


//--------------------//DONE


// Display the default plots
function init() {

  // Select the dropdownMenu location from html:
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
    // console.log("First id: ", id)

    //Call the function to create a  horizontal bar chart, a bubble chart, gaugeChart and an individual's demographic information:
    hbarChart(id);
    bubbleChart(id);
    gaugeChart(id);
    demographic(id);
  });
}

//--------------------//DONE


// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function hbarChart(selectedID){
  d3.json(url).then(function(data){
    // Select samples in the data
    let samples = data.samples;
    console.log("samples: ", samples);

    // Filter samples by using the selected ID
    let filteredSample = samples.filter((sample) => sample.id === selectedID);

    // Assign filtered sample data of the first ID to an object variable:
    let object = filteredSample[0];
    console.log("object: ", object)

     //Create bar chart elements (Vy's note: using slice() to extract the first 10 OTUs found in each individual)
    
    //Use sample_values as the values for the bar chart
     let x = object.sample_values.slice(0, 10).reverse();
    console.log("x: ", x)

    //Use otu_ids as the labels for the bar chart
    let y = object.otu_ids.slice(0, 10).map((otu_ids) => `OTU ${otu_ids}`).reverse();
    console.log("y: ", y)

    //Use otu_labels as the hovertext for the chart
    let text = object.otu_labels.slice(0, 10).reverse();
    console.log("text: ", text)

    // Create a trace for horizontal bar chart
    let trace1 = {
      x: x,
      y: y, 
      text: text,
      type: "bar",
      orientation: "h"
    };

    // Create a data array for the bar chart
    let dataArray = [trace1];
    console.log("trace1: ", dataArray)

    // Create a layout for the chart
    let layout = {
      title: "The top 10 OTUs found in the individual",
      // margin: {
      //   l: 100,
      //   r: 100,
      //   t: 100,
      //   b: 100
      //   },
      // height: 500,
      // width: 500
      };
      console.log("layout: ", layout)

      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", dataArray, layout);
  })
}


//--------------------//DONE


// 3. Create a bubble chart that displays each sample.
function bubbleChart(selectedID){
  d3.json(url).then(function(data){
    // Select samples in the data
    let samples = data.samples;
    console.log("samples: ", samples);

    // Filter samples by using the selected ID
    let filteredSample = samples.filter((sample) => sample.id === selectedID);

    // Assign filtered sample data of the first ID to an object variable:
    let object = filteredSample[0];

    //Create chart elements:
    
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
    let trace1 = {
      x: x,
      y: y, 
      text: text,
      mode: "markers",
      marker: {
        size: makerSize,
        color: colors,
        colorscale: "Rainbow"
      }
    };

    // Create a data array for the bubble chart
    let dataArray = [trace1];
    console.log("trace1: ", dataArray)

    // Create a layout for the chart
    let layout = {
      xaxis: {title: "OTU ID"},
      // margin: {
      //   l: 10,
      //   r: 1,
      //   t: 5,
      //   b: 5
      //   },
      // height: 500,
      // width: 1000
      };
      console.log("layout: ", layout)

      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bubble", dataArray, layout);
  })
}


//--------------------//DONE


// 4. Display the sample metadata, i.e., an individual's demographic information.
// 5. Display each key-value pair from the metadata JSON object somewhere on the page.
function demographic(selectedID){
  d3.json(url).then(function(data){
    // Select metadata in the data
    let metaData = data.metadata;
    console.log("metaData: ", metaData)

    // Filter samples by using the selected ID (Vy's note: the id stored in meta.id is string, but the selectedID is in interger, therefore using '==' to compare loosely the data values and ignore the data type)
    let filteredMetaData = metaData.filter((meta) => meta.id == selectedID);

    // Assign filtered sample data of the first ID to an object variable:
    let object = filteredMetaData[0];
    console.log("object: ", object)

    // Clear the child elements in div with selectedID
    d3.select("#sample-metadata").html("");
    console.log("html object:", d3.select("#sample-metadata"))

    
    //"The Object.entries() static method returns an array of a given object's own enumerable string-keyed property key-value pairs" (ref = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
    let entries = Object.entries(object);
    console.log("entries: ", entries)

    entries.forEach(([key, value]) => {
      d3.select("#sample-metadata").append ("h4").text(`${key}: ${value}`);
    });
  }); 
}


//--------------------//DONE


// 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard.

function optionChanged(selectedID) {
  hbarChart(selectedID);
  bubbleChart(selectedID);
  demographic(selectedID);
  gaugeChart(selectedID)
  
}

init()


//--------------------//


// 7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file


//--------------------//


// Bonus (ref: https://plotly.com/javascript/gauge-charts/)
function gaugeChart(selectedID){

}