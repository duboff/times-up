$(document).ready(function() {
    $("#save-button").click(function() {
        var val = $("#name-input").val();
        var currentCounter = localStorage.getItem("counter")
        if (! currentCounter) {
            currentCounter = 1;
        } else {
            currentCounter = parseInt(currentCounter) + 1;
        }
        localStorage.setItem("counter",currentCounter);
        localStorage.setItem("item-" + currentCounter, val);
        $("#name-input").val('')
    });
    
    $("#load-button").click(function() {
        document.getElementById("result").innerHTML = localStorage.getItem("item-1");
    });
});
