// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var mm = G$('MM', 'Hou', 'en');

// use our chainable methods
mm.greet().setLang('cn').greet(true).log();

// let's use our object on the click of the login button
$('#login').click(function() {
    
    // create a new 'Greetr' object (let's pretend we know the name from the login)
    var loginGrtr = G$('MM', 'Hou');
    
    // hide the login on the screen
    $('#logindiv').hide();
    
    // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language, and log the welcome as well
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});