describe('Konstruktor Plugin', function() {

    it('jest osiagalny z $.Plugin', function() {
        expect($.Plugin).toBeDefined();
    });

    it('posiada metode pubilczna register', function() {
		expect($.Plugin.register).toBeDefined();
	});    
});

describe('Instancja Plugin', function() {
    var Plugin, plugin;

    beforeEach(function() {
        Plugin = $.Plugin.register('name');
        plugin = new Plugin();         
    });
     
    it('posiada metode extend', function() {
        expect(plugin.extend).toBeDefined();
    });
});

describe('Rozszerzenie instancji Plugin', function() {
    var Plugin, plugin, extensionName, Extension, extension; 

    beforeEach(function() {
        Plugin        = $.Plugin.register('name');
        plugin        = new Plugin(); 
        extensionName = 'foo';
        Extension     = plugin.extend(extensionName);
        extension     = new Extension();
    }); 

    it('jest dodawane do atrybutu __extensions rodzica', function() {
        expect(plugin.__extensions[extensionName]).toBeDefined();
    });

    it('posiada referencje do rodzica', function() {
        expect(extension.parent).toEqual(jasmine.any(Plugin));
    });
});






// describe('Rozszerzenie instancji Plugin', function() {
//     var Plugin = $.Plugin.register('example');
//     var plugin = new Plugin();
    
//     it('ma referecje do rodzica', function(){
//         expect(plugin.parent).toBeDefined();
//     });   
// });