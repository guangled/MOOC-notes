;(function(global, $) {
    
    // 'new' an object
    var Greeter = function(firstname, lastname, language) {
        return new Greeter.init(firstname, lastname, language);
    };
    
    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'cn'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        cn: '嗨'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        cn: '你好'
    };
    
    // logger message
    var logMessage = {
        en: 'Logged in',
        cn: '已登录'
    };
    
    // prototype holds methods (to save memory space)
    Greeter.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function() {
            if (this.language === 'en') {
                return this.firstname + ' ' + this.lastname;
            }
            else if (this.language === 'cn') {
                return this.lastname + this.firstname;
            }
        },
        
        validate: function() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            if (this.language === 'en') {
                return greetings[this.language] + ' ' + this.firstname + '!';
            }
            else if ( this.language === 'cn') {
                return greetings[this.language] + '，' + this.firstname + '！';
            }
        },
        
        formalGreeting: function() {
            if (this.language === 'en') {
                return formalGreetings[this.language] + ' ' + this.fullName();
            }
            else if (this.language === 'cn') {
                return formalGreetings[this.language] + '，' + this.fullName();
            }
            
        },
        
        // chainable methods return their own containing object
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            if (console) {
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function() {
            if(console) {
                console.log(logMessage[this.language] + ': ' + this.fullName());
            }
            
            // make chainable
            return this;
        },
        
        setLang: function(lang) {

            // set the language
            this.language = lang;
            
            // validate
            this.validate();
            

            // make chainable
            return this;
        },
        
        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw 'jQuery not loaded';
            }
            
            if(!selector) {
                throw 'Missing jQuery selector';
            }

            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            // inject the message in the chosen place
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
        
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greeter.init = function(firstname, lastname, language) {
        
        var self =this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
        
        self.validate();
    };
    
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greeter.init.prototype = Greeter.prototype;
    
    // attach our Greetr to the global object, and provide a shorthand '$G' for ease our poor fingers
    global.Greeter = global.G$ = Greeter;
    
}(window, jQuery));