    var unique = 'test 4';
    // this is a jasmine test
    
	describe("A book", function() {
		
		it("create a book", function() {
			var done = false;
			var jquery, matches;
			runs(function(){

				// go to book create, so dont forget the language param
				cabral.navigateTo('/book/create?lang=pt_BR', function($){

					//make sure that you are in the correct location
					expect($('title').text()).toBe("Criar Book");

					// Fill fields
					$('#name').val("my book " + unique);

					// submit the form
					$('#create').click();

					// wait for next page...
					cabral.waitFor(/\/book\/show\/(.*)/g, function($, m){

						// keep this things for final evaluation
						jquery = $;
						matches = m;
						done = true;
					});
				});
			});

			// timeout to exec navigation
			waitsFor(function() {
		      	return done;
		    }, "The Value should be incremented", 3000);

			// finally execute the end verification
		    runs(function(){
		    	var bookId = matches[1].replace(/[^,\d-]*/g,'');
		    	expect(
		    		jquery('.message').text()
		    	).toBe('Book ' + bookId + ' criado');
		    });
		});

		it("list books", function(){
			var done = false;
			var jquery;
			runs(function(){
				cabral.navigateTo('/book/list', function($){
					jquery = $;
					done = true;
				});
			});

			waitsFor(function() {
		      	return done;
		    }, "The Value should be incremented", 3000);

		    // finally execute the end verification
		    runs(function(){
		    	expect(jquery('title').text()).toBe("Book Listagem");
		    });
		});

		it("delete a book", function(){
			var done = false;
			var jquery, matches;
			runs(function(){
				cabral.navigateTo('/book/list', function($){
					var aLs = $('a').filter(function(){
                        var res = $(this).text() == ("my book " + unique);
                        console.log("a = " + res + "link '" + $(this).text() + "' " + ("my book " + unique));
						return res;
					});

					console.log("clicando no link " + aLs.length);
					cabral.clickLink(aLs[0]);

					cabral.waitFor(/\/book\/show\/(.*)/g, function($, m){
						$('.delete').click();
						matches = m;
						cabral.waitFor('/book/list', function($, m){
							jquery = $;
							done = true;
						});
					});
				});
			});

			waitsFor(function() {
		      	return done;
		    }, "The Value should be incremented", 3000);

		    // finally execute the end verification
		    runs(function(){
		    	var bookId = matches[1].replace(/[^,\d-]*/g,'');
		    	expect(jquery('title').text()).toBe("Book Listagem");
		    	expect(jquery('.message').text()).toBe("Book " + bookId + " removido");
		    });
		});
	});
	