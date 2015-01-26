/* jshint laxcomma: true */

;(function(factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }

}(function($) {

    $.Plugin = function() {};
    $.Plugin.Extension  = function() {};

    function ClassFactory() {
        var args = arguments; 

        function Klass() {
            for(var i = 0, max = args.length; i < max; i++) {
                args[i].apply(this, arguments);
                $.extend(true, Klass.prototype, args[i].prototype); 
            } 
        }

        return Klass;  
    }

    $.Plugin.prototype.extend = function(extensionName, instanceProps) {
        var parent = this
          , extension; 

        function Extension() {
            this.parent = parent; 
            $.extend(this, instanceProps);
        }

        extension = parent.__extensions[extensionName] = ClassFactory($.Plugin.Extension, Extension) 

        return extension;    
    };

    $.Plugin.prototype.initExtensions = function() {
        var extensions = this.__extensions; 

        $each(extensions, function(name) {
            this.__extensions[name].init(); 
        });        
    };

    $.Plugin.register = function(instanceProps) {
        function Plugin(elem, options) {
            $.extend(this, instanceProps); 
            if (this.init) { this.init(elem, options) }; 
        }

        Plugin.prototype.__extensions = {}; 
        
        return ClassFactory($.Plugin, Plugin); 
    };  
}));


