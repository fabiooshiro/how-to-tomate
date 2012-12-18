
	// isso eh um teste
	describe("How to", function() {
		
		it("create a book", function() {
			var done = false;
			var jquery, matches;
			runs(function(){

				// go to book create, so dont forget the language param
				cabral.navigateTo('/book/create?lang=pt_BR', function($){

					//make sure that you are in the correct location
					expect($('title').text()).toBe("Criar Book");

					// Fill fields
					$('#name').val("my book");

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
		    	expect(
		    		jquery('.message').text()
		    	).toBe('Book ' + matches[1] + ' criado');
		    	console.log("create a book: " + (jquery('.message').text() == 'Book ' + matches[1] + ' criado'));
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
		    	console.log("list books: " + (jquery('title').text() == "Book Listagem"));
		    });
		});

        it("edit a book", function(){
            var done = false;
    		var jquery, matches;
			runs(function(){
				cabral.navigateTo('/book/list', function($){
                    var aLs = $('a').filter(function(){
						return $(this).text() == 'my book';
					});

					cabral.clickLink(aLs[0]);

					cabral.waitFor(/\/book\/show\/(.*)/g, function($, m){
                        cabral.clickLink($('.edit')[0]);
                        cabral.waitFor(/\/book\/edit\/(.*)/g, function($, m){
                            $('#name').val('meu livro');
                            $('.save').click();
                            cabral.waitFor(/\/book\/show\/(.*)/g, function($, m){
                                done = true;
                                jquery = $;
                            });
                        });
					});
				});
			});
            
            waitsFor(function() {
    	      	return done;
		    }, "The Value should be incremented", 3000);
            
            // finally execute the end verification
    	    runs(function(){
		    	expect(jquery('title').text()).toBe("Ver Book");
		    	console.log("edig book: " + (jquery('title').text() == "Ver Book"));
		    });
        });
        
		it("delete a book", function(){
			var done = false;
			var jquery, matches;
			runs(function(){
				cabral.navigateTo('/book/list', function($){
					var aLs = $('a').filter(function(){
						return $(this).text() == 'meu livro';
					});

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
		    	expect(jquery('title').text()).toBe("Book Listagem");
                var bookId = matches[1].replace(/[^,\d-]*/g,'');
		    	expect(jquery('.message').text()).toBe("X Book " + bookId + " removido");
		    	console.log("delete book: " + (jquery('.message').text() == "X Book " + bookId + " removido"));
		    });
		});
	});
	
	

