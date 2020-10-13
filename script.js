function post(text, sent=true)
{
    let d = new Date();
    let timestamp = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2);

    $('#messages-wrapper').append( $('<div class="message message_' + (sent ? 'sent' : 'received') + 
                                    '"> <span class="message-text">' + 
                                    text + 
                                    '</span><span class="message-timestamp">' + 
                                    timestamp + 
                                    '</span><div class="arrow arrow_' + 
                                    (sent ? 'sent' : 'received') + 
                                    '"></div></div>') );

    $('#layout').scrollTop($('#layout')[0].scrollHeight);
}

function onsend()
{
    let text = $('#message-input')[0].value;

    if (text === '' || !(/\S/.test(text)))
    {
        return;
    }

    $('#message-input')[0].value = '';
    
    post(text);
    post(text, false);
}

$(document).on('keydown', function(e)
{
    if (e.which == '13' && e.shiftKey === false) { onsend(); }
})

$(document).ready(function()
{

});