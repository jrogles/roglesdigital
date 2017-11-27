class ContactForm {
  constructor() {
    this.form = document.getElementById("insightly_web_to_contact");
    this.init();
    this.submit();
  }
  init() {
    this.form.onsubmit = this.submit();
  }
  submit() {
    this.validate();
  }
  validate() {
    var pitfall = document.getElementById("deadfall").value;
    if (pitfall !== "") {
      document.getElementById("contact-submit").disabled = true;
      return false;
    } else {return true}
  }
}

export default ContactForm;
