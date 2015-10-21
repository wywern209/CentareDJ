$(function () {

    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;

    // Create a function that the hub can call back to display messages.
    chat.client.addNewMessageToPage = function (name, message) {
        // Add the message to the page.
        $chatbox = $('#discussion');
        $chatbox.append('<div><strong>' + htmlEncode(name)
            + '</strong>: ' + htmlEncode(message) + '</div>');
        $chatbox.animate({ scrollTop: $chatbox.prop("scrollHeight") - $chatbox.height() });
    };
    // Set initial focus to message input box.
    $('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        chat.server.send(curUser, curUser + " has joined the room.");

        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            chat.server.send(curUser, $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
    });
});
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}