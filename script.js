function animation(pace, size1, size2)
{
    setTimeout(
        function(){
            $('#dot-1').css({'height': size2, 'width': size2});

            setTimeout(
                function(){
                    $('#dot-1').css({'height': size1, 'width': size1});
                    $('#dot-2').css({'height': size2, 'width': size2});

                    setTimeout(
                        function(){
                            $('#dot-2').css({'height': size1, 'width': size1});
                            $('#dot-3').css({'height': size2, 'width': size2});

                            setTimeout(
                                function(){
                                    $('#dot-3').css({'height': size1, 'width': size1});
                                }, pace);
                        }, pace);
                }, pace);
        }, pace);
}


function typing(text)
{
    let pace = 300;
    let size1 = $('.dot').css('height');
    let size2 = $('.dot-wrapper').css('height');
    

    let n = Math.min((Math.ceil(text.length / 30)), 5);
    let i = -1;

    let int = setInterval(function()
    {
        $('#typing-bubble').css('display', 'flex');

        animation(pace, size1, size2);
        i++;

        if(i === n)
        {
            $('#typing-bubble').css('display', 'none');
            post(text, false);
            clearInterval(int);
        }
    },
    pace*4);
    
}



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

let promise;

function onsend()
{
    let text = $('#message-input')[0].value;

    if (text === '' || !(/\S/.test(text)))
    {
        return;
    }

    $('#message-input')[0].value = '';
    
    post(text);
    typing(text);
}

$(document).on('keydown', function(e)
{
    if (e.which == '13' && e.shiftKey === false) { onsend(); }
})

$(document).ready(function()
{

});