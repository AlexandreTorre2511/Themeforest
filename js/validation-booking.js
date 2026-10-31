$(document).ready(function () {

    $("#booking_form").on("submit", function (e) {

        e.preventDefault();

        let error = false;

        $(".form-control").removeClass("error_input");
        $("#error_message").hide();

        const service = $("#service").val();
        const date = $("#start_date").val();
        const time = $("#time").val();
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const phone = $("#phone").val().trim();

        if (!service) {
            $("#service").addClass("error_input");
            error = true;
        }

        if (!date) {
            $("#start_date").addClass("error_input");
            error = true;
        }

        if (!time) {
            $("#time").addClass("error_input");
            error = true;
        }

        if (name === "") {
            $("#name").addClass("error_input");
            error = true;
        }

        if (email === "" || email.indexOf("@") === -1) {
            $("#email").addClass("error_input");
            error = true;
        }

        if (phone === "") {
            $("#phone").addClass("error_input");
            error = true;
        }

        if (error) {
            return;
        }

        // Hand the form to Web3Forms, which emails it on. See js/form-config.js.
        const payload = web3formsPayload($("#booking_form"), "New Service Appointment");

        if (payload === null) {
            $("#error_message").show();
            return;
        }

        $("#send_message")
            .prop("disabled", true)
            .val("Sending...");

        $.ajax({
            url: WEB3FORMS_ENDPOINT,
            type: "POST",
            dataType: "json",
            data: payload,

            success: function (result) {

                if (result.success) {

                    let html = "";

                    html += '<table class="table table-bordered table-striped">';
                    html += "<tbody>";

                    html += "<tr><th width='220'>Service</th><td>" + $("#service").val() + "</td></tr>";
                    html += "<tr><th>Preferred Date</th><td>" + $("#start_date").val() + "</td></tr>";
                    html += "<tr><th>Preferred Time</th><td>" + $("#time").val() + "</td></tr>";
                    html += "<tr><th>Full Name</th><td>" + $("#name").val() + "</td></tr>";
                    html += "<tr><th>Email Address</th><td>" + $("#email").val() + "</td></tr>";
                    html += "<tr><th>Phone Number</th><td>" + $("#phone").val() + "</td></tr>";
                    html += "<tr><th>Message</th><td>" + $("#message").val().replace(/\n/g, "<br>") + "</td></tr>";

                    html += "</tbody>";
                    html += "</table>";

                    $("#booking_summary").html(html);

                    // Hide the form
                    $("#booking_form").hide();

                    // Show success message
                    $("#booking_success")
                        .removeClass("d-none")
                        .hide()
                        .fadeIn(500);

                } else {

                    $("#error_message").show();

                    $("#send_message")
                        .prop("disabled", false)
                        .val("Send Appointment");

                }

            },

            error: function () {

                $("#error_message").show();

                $("#send_message")
                    .prop("disabled", false)
                    .val("Send Appointment");

            }

        });

    });

});
