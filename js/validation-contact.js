$(document).ready(function(){
        $('#send_message').click(function(e){
            
            //Stop form submission & check the validation
            e.preventDefault();
            
            // Variable declaration
            var error = false;
            var name = $('#name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var message = $('#message').val();
            
            $('#name,#email,#phone,#message').click(function(){
                $(this).removeClass("error_input");
            });
            
            // Form field validation
            if(name.length == 0){
                var error = true;
                $('#name').addClass("error_input");
            }else{
                $('#name').removeClass("error_input");
            }
            if(email.length == 0 || email.indexOf('@') == '-1'){
                var error = true;
                $('#email').addClass("error_input");
            }else{
                $('#email').removeClass("error_input");
            }
            if(phone.length == 0){
                var error = true;
                $('#phone').addClass("error_input");
            }else{
                $('#phone').removeClass("error_input");
            }
            if(message.length == 0){
                var error = true;
                $('#message').addClass("error_input");
            }else{
                $('#message').removeClass("error_input");
            }
            
            // If there is no validation error, next to process the mail function
            if(error == false){
                var payload = web3formsPayload($("#contact_form"), 'New Contact Message');
                if(payload == null){
                    $('#error_message').fadeIn(500);
                    return;
                }

               // Disable submit button just after the form processed 1st time successfully.
                $('#send_message').attr({'disabled' : 'true', 'value' : 'Sending...' });
                
                /* Hand the form to Web3Forms, which emails it on. See js/form-config.js. */
                $.ajax({
                    url: WEB3FORMS_ENDPOINT,
                    type: 'POST',
                    dataType: 'json',
                    data: payload,
                    success: function(result){
                        //Check the result set returned by Web3Forms.
                        if(result.success){
                            //If the email is sent successfully, hide the fields and the button
                            $('#contact_form').children().not('#success_message, #error_message').fadeOut(300);
                            //Display the success message
                            $('#success_message').fadeIn(500);
                        }else{
                            //Display the error message
                            $('#error_message').fadeIn(500);
                            // Enable the submit button again
                            $('#send_message').removeAttr('disabled').attr('value', 'Send The Message');
                        }
                    },
                    error: function(){
                        //Network or service failure
                        $('#error_message').fadeIn(500);
                        $('#send_message').removeAttr('disabled').attr('value', 'Send The Message');
                    }
                });
            }
        });    
    });
