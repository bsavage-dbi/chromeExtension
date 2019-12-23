
// Load JSON alerts file
function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'alerts.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(JSON.parse(xobj.responseText));
      }
    };
    xobj.send(null);  
  }

// for tests only
//   loadJSON(function(json) {
//     console.log(json[0].alert_name); 
//   });


// Show Alert
function showAlert(message, className) {
  // create div
  const div = document.createElement('div');
  // add Classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // Get input 
  const input = document.querySelector('.alerthere');
  // Insert alert
  container.insertBefore(div, input);
  // Timeout after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  // Open Confluence Button Event Listener
    var openConfluenceBtn = document.getElementById('openconf').addEventListener('click', proccessString);

    function proccessString(){
      // Input string label
      var inputString = document.getElementById('input').value;
      loadJSON(function(json){
          for(let i = 0; i < json.length; i++){
            // getting alert_name from JSON
            let alert_name = json[i].alert_name;
            if(inputString.includes(alert_name)){
                chrome.tabs.create({ url: json[i].alert_confluence});
                break;
            }
          }
          showAlert('Alert was not found!', 'error');
      });
    }

    // Open Graphs button
    var graphsBtn = document.getElementById('graphsBtn');
    if (graphsBtn){
        graphsBtn.addEventListener('click', function() {
            chrome.tabs.getSelected(null, function(tab) {
                var GraphURLs = ["https://grafana.dynamicyield.com/d/000000120/services-heartbeat?refresh=5m&orgId=1&var-section=All&var-webPX=All&var-region=All&var-data_source=graphite&var-Feed=All&var-BT_VT=All&var-version=v3-&from=now-12h&to=now", "https://grafana.dynamicyield.com/dashboard/db/operation-dashboard?refresh=5m&orgId=1", "https://grafana.dynamicyield.com/dashboard/db/script-team?refresh=5m&orgId=1","https://grafana.dynamicyield.com/d/000000180/async-collection-pipeline?orgId=1&refresh=5m&from=now-3h&to=now","https://grafana.dynamicyield.com/d/XTcy7C2Wk/webshot-rcom-emails-retina-light?orgId=1&var-region=graphite&var-cwsource=us-east-1&var-section_id=*&var-env=webshot-rcom-email","https://grafana.dynamicyield.com/d/000000147/mcd-api-server?orgId=1","https://grafana.aps2.dy-mcd.com/d/000000147/mcd-aps2-api-server?orgId=1"];
                GraphURLs.forEach(function(graph) {
                    chrome.tabs.create({ url: graph});
                });
        });
    },false);
  }
    // Nagios machines button
    if (nagiosBtn) {
      nagiosBtn.addEventListener('click', function() {
        var nagiosInput = document.getElementById('nagiosInput').value;
        var nagiosURL = "https://nagios.COMPANY.com/nagios/cgi-bin/status.cgi?host=" + nagiosInput;
        chrome.tabs.create({ url: nagiosURL});
      },false);
    }
});