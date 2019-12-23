document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("jiraCopyBtn").addEventListener("click", jiraCopy);
  });
  
// Copying template to clipboard
function jiraCopy() {
    // content to be copied
    var copyText = `Template to copy to your clipboard here`;
    // create a textarea element
    let input = document.createElement('textarea');
    // setting it's type to be text
    input.setAttribute('type','text');
    // setting the input value to equal to the Jira template
    input.value = copyText;
    // appending it to the document
    document.body.appendChild(input);
    // calling the select, to select the text displayed
    // if it's not in the doc I wont be able to do that
    input.select()
    // calling the copy cmd
    document.execCommand('copy');
    document.querySelector('#jiraCopyBtn').innerHTML = "COPIED";
    // removing the input from the document
    document.body.removeChild(input);
  }