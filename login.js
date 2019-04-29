function login() {

    var payload = {};

    payload.usuario = $('#usuario').val();
    payload.senha = $('#senha').val();
    console.log(payload);
    var data = JSON.stringify(payload);
    console.log(JSON.parse(data));
    $.ajax({
        type: "POST",
        url: "/token/auth",
        dataType: "json",
        contentType: 'application/json',
        data: data,
        success: function (data) {
            var token = data['data']['token'];

            $.cookie('access_token_cookie', token);

            $.ajaxSetup({
                headers: {
                    'Authorization': $.cookie('access_token_cookie')
                }
            });

            $('#login_form').hide();
            $('#logged').show();
            getHome();
        }
        //error: alert("Email e/ou senha incorreto(s)!")
    });

}

function getHome() {

    $.ajax({
        type: "GET",
        url: "/api/company",
        //dataType: "json",
        //contentType: 'application/json',
        success: function () {
            $('#login_form').hide();
            $('#logged').show();

        }
    });
}

$(document).ready(function () {
    $('#logged').hide();
});