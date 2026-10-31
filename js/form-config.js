/* Web3Forms relays the contact and booking forms by email. GitHub Pages is
   static hosting, so contact.php and booking.php cannot run there.

   Get a key at https://web3forms.com by entering the address that should
   receive the submissions. The key is public by design and meant to sit in
   client-side code, so it is safe to commit.

   Until the key is filled in, both forms refuse to submit and log a warning. */

var WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
var WEB3FORMS_ACCESS_KEY = "";

/* Returns the serialized form fields plus the Web3Forms parameters, or null
   when the key is missing. */
function web3formsPayload(form, subject){
    if(WEB3FORMS_ACCESS_KEY == ""){
        console.warn("WEB3FORMS_ACCESS_KEY is empty in js/form-config.js - the form cannot be sent.");
        return null;
    }

    var fields = form.serializeArray();
    fields.push({name: 'access_key', value: WEB3FORMS_ACCESS_KEY});
    fields.push({name: 'subject', value: subject});

    return $.param(fields);
}
