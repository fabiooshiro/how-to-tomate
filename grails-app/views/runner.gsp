<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
	<title>introduction.js</title>
	<meta name="layout" content="main">
	<script type="text/javascript">
	var config = {
		contextPath: "${request.contextPath}"
	};	

	var cabral = new function(){

		var regexComparator = function(uri){
			return uri.exec(window.opener.location.href);
		};

		var endsWithComparator = function(uri){
			var local = window.opener.location.href.substr(uri.length * -1);
			return local == uri;
		};

		var waitForUrl = function(uri, comparator, callback){
			var loadListener = function(){
				var t;
				if(t = comparator(uri)){
					console.log("esta em " + window.opener.location.href + " acionado " + uri);
					callback(window.opener.$, t);
				}else{
					setTimeout(loadListener, 250);
				}
			}
			setTimeout(loadListener, 250);
		};

		this.navigateTo = function(uri, callback){
			window.opener.location.href = config.contextPath + uri;
			waitForUrl(uri, endsWithComparator, callback);
		};

		this.waitFor = function(uri, callback){
			waitForUrl(uri, typeof(uri) == 'string' ? endsWithComparator : regexComparator, callback);
		};
	};
	</script>
	<r:require module="jquery" />
	<r:require module="tomate" />
</head>
<body>
	<script type="text/javascript">
	
	// isso eh um teste
	describe("A book suite", function() {
		var done = false;
		var jquery, matches;
		it("should create a book", function() {
			
			runs(function(){

				// go to book create, so dont forget the language param
				cabral.navigateTo('/book/create?lang=pt_BR', function($){

					//make sure that you are in the correct location
					expect(window.opener.document.title).toBe("Criar Book");

					// Fill fields
					$('#name').val("meu livro");

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

			waitsFor(function() {
		      	return done;
		    }, "The Value should be incremented", 10000);

		    runs(function(){
		    	expect(
		    		jquery('.message').text()
		    	).toBe('Book ' + matches[1] + ' criado');
		    });
		});
	});

	</script>
	<script type="text/javascript">
	// aqui entra o runner
	(function() {
  		var jasmineEnv = jasmine.getEnv();
  		jasmineEnv.updateInterval = 250;
  		var htmlReporter = new jasmine.HtmlReporter();
  		jasmineEnv.addReporter(htmlReporter);

  		// aqui entra o filtro do teste
  		jasmineEnv.specFilter = function(spec) {
  			//console.log("spec");
  			//console.log(spec);
  			var res = htmlReporter.specFilter(spec);
  			//console.log("res");
  			//console.log(res);
    		return res;
  		};

  		var currentWindowOnload = window.onload;
		window.onload = function() {
			if (currentWindowOnload) {
				currentWindowOnload();
		    }

		    //document.querySelector('.version').innerHTML = jasmineEnv.versionString();
		    execJasmine();
		};

		function execJasmine() {
			jasmineEnv.execute();
		}
	})();
	</script>
</body>