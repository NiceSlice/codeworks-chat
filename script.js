let resA = [
    'Hi!',
    'Hello!',
    'Hello, I\'ve been waiting to hear from you!',
    'Hi! How have you been lately?',
];

let resB = [
    'Well, it depends',
    'What do you think?',
    'Why don\'t you tell me?',
    'I wouldn\'t know',
    'I can\'t say for sure',
    'Well, it\'s hard to tell',
    'I\'m not sure',
    'I\'ll think about it... ',
    'Why do you ask?',
];

let resC = [
    'Ah yes, sure',
    'Of course',
    'I understand',
    'Yes, yes',
    'Makes sense',
    'I\'m confused',
    'Okay',
];

let resD = [
    'Sorry I have to go, hope we can talk again later',
    'It was great talking to you but I\'m really busy now',
    'Thanks for checking in but I have to go now',
    'I have to go now, hope you have a great day!',
];

let resE = [
    'Okay bye',
    'Bye now',
    'Talk to you later',
    'I\'m busy :/',
    'Can\'t talk right now...',
    'Ok',
];

let n = 0;
let done = false;

function respond(text)
{
    let res = [];

    if(done)
    {
        res.push(resE[Math.floor(Math.random() * resE.length)]);
        n++;
        return res;
    }

    if(n === 0)
    {
        res.push(resA[Math.floor(Math.random() * resA.length)]);
    }

    if(text.includes('?'))
    {
        res.push(resB[Math.floor(Math.random() * resB.length)]);
    }

    else if(text.length <= 4 && n !== 0)
    {
        res.push(text);
    }

    else if (n !== 0)
    {
        res.push(resC[Math.floor(Math.random() * resC.length)]);
    }

    if (n >= 8)
    {
        res.push(resD[Math.floor(Math.random() * resD.length)]);
        done = true;
    }

    n += res.length;
    return res;
}


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


function onsend()
{
    let text = $('#message-input')[0].value;

    if (text === '' || !(/\S/.test(text)))
    {
        return;
    }

    $('#message-input')[0].value = '';
    
    post(text);

    let res = respond(text);

    for (let i in res)
    {
        typing(res[i]);
    }

}


$(document).on('keydown', function(e)
{
    if (e.which == '13' && e.shiftKey === false) { onsend(); }
})


$(window).on('resize', function()
{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

$(document).ready(function()
{
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});