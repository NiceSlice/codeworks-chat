let n = 0;


function post(text, sent=true)
{
    let d = new Date();
    let timestamp = d.getHours() + ":" + d.getMinutes();

    $('#messages-wrapper').append( $('<div id="message-' + n.toString() + 
                                    '" class="message message_' + (sent ? 'sent' : 'received') + 
                                    '"> <span class="message-text">' + 
                                    text + 
                                    '</span><span class="message-timestamp">' + 
                                    timestamp + 
                                    '</span><div class="arrow arrow_' + 
                                    (sent ? 'sent' : 'received') + 
                                    '"></div></div>') );
    n++;

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