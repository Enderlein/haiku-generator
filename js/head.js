createListeners()
$("#author").val("")
function createListeners() {
    triggeredp1 = false
    triggeredp2 = false
    $(document).ready(
        function() {
            $("#author").click(
                function() {

                    if(!triggeredp1) {
                        $("#instruction").html("type in the name of someone who would have a lot of documented quotes <br>" +
                                           "like George Washington, for example <br>" +
                                           "(it's case sensitive!)")
                        triggeredp1 = true
                    }
                    
                    
                    if ($(this).attr("placeholder")) {
                        $(this).removeAttr("placeholder")
                    }
                }
            )

            $("#author").keypress(
                function(event) {
                    if(event.which && !triggeredp2) {
                        $("#instruction").html("press Enter")
                        triggeredp2 = true
                    }

                    if(event.which == 13) {
                        getQuotes()
                        $("#instruction").html("")
                    }
                }
            )
        }

        
    )
}