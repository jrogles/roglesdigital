document.getElementById("formId").onsubmit = function () {
    if ((document.getElementById("deadfall").value !== "")) {
    	document.getElementById("contact-submit").disabled = true;
        return false;
    }
}