// from data.js
var tableData = data;

// display UFO sightings function
function tableDisplay(ufoSightings) {
    var tbody = d3.select("tbody");
    ufoSightings.forEach((ufoRecord) => {
      var row = tbody.append("tr");
      Object.entries(ufoRecord).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.html(value);
      });
    });
  };
  
  // clear table for new data
  function deleteTbody() {
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
  };
  
  // display all UFO sightings initially
  console.log(tableData);
  tableDisplay(tableData);
  
  // 'Filter Table' button
  var button = d3.select("#filter-btn");
  
  // filter DB & display table
  button.on("click", function(event) {
    d3.event.preventDefault();
    deleteTbody();
    var dateInput = d3.select("#datetime").property("value");
    
    if (dateInput.trim() === "" ) {
      // display entire DB if nothing is entered in Filter Search date entry field
      var filteredData = tableData;
    } else {
      // ELSE display specific subset based on user input in FS date entry field
      var filteredData = tableData.filter(ufoSighting => 
        ufoSighting.datetime === dateInput.trim());
    };
  
    // return message "No Records Found" if FS date field input does not match any DB entry
    if (filteredData.length == 0) {
      d3.select("tbody")
        .append("tr")
        .append("td")
          .attr("colspan", 7)
          .html("<h4>No Records Found</h4>");
    };
  
    console.log(filteredData);
    tableDisplay(filteredData);
  });