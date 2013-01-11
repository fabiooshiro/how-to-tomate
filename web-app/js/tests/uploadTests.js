describe("How to", function() {
		
	it("upload a file", function() {
		
		var done = false;
		runs(function(){
			cabral.navigateTo('/book/upload', function($){
				cabral.fillFile($('[name=myFile]')[0], 'file.txt');
				$(".create").click();
				cabral.waitFor('/book/uploaded', function($){
					expect($('#fileContents').text()).toBe('>> The file submitted.');
					done = true;
				});
			});
		});

		// timeout to exec navigation
		waitsFor(function() {
	      	return done;
	    }, "The Value should be incremented", 3000);

	});

});
