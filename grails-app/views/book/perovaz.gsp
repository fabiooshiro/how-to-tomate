
<%@ page import="how.to.tomate.Book" %>
<!DOCTYPE html>
<html>
	<head>
		<meta name="layout" content="main">
		<g:set var="entityName" value="${message(code: 'book.label', default: 'Book')}" />
		<title><g:message code="default.show.label" args="[entityName]" /></title>
		<r:require modules="perovaz, tomate , handlebars" />
		<style type="text/css">
			div.container-result{
				overflow:hidden;
				width:100%;
				position: relative;
				border-style: solid;
				border-width: 1px;
				background: rgba(23,232,79,0.3);
			}
			pre #result,#generated{
				overflow: hidden;
			}
		</style>
	</head>
	<body>
		<div class="container-result">
			<p>
				<legend>Expected</legend>
				<pre id="result01">&lt;?xml version="1.0" encoding="UTF-8" ?>
					&lt;testsuite errors="0" failures="0" hostname="Brunos-MacBook-Air.local" name="br.com.investtools.funds.FixedIncomeReconcileServiceTests" tests="1" time="4.269" timestamp="2013-01-15T22:11:49">
						
							&lt;testcase classname="test_bradesco_foda" name="blabla" time="2.988" > &lt;/testcase>
						
							&lt;testcase classname="test_fixed_income_foda" name="gluglu" time="2.988" > &lt;/testcase>
						
					&lt;/testsuite>
				</pre>
			</p>
			<p>
				<legend>To Be</legend>
				<pre id="generated"></pre>
			</p>
		</div>
		<script type="text/javascript">
			describe("Perovaz", function(){
				it("deve escrever um xml que diz que 1 teste passou", function(){
					var perovaz = new Perovaz();
					var report = {
						errors: 0,
						failures: 0,
						tests: 1,
						time: 4.269,
						name: 'br.com.investtools.funds.FixedIncomeReconcileServiceTests',
						hostname: 'Brunos-MacBook-Air.local',
						timestamp: '2013-01-15T22:11:49'
					};
					report.testcases = [{name:"blabla", time:2.988, classname:"test_bradesco_foda"}, {name:"gluglu", time:2.988, classname:"test_fixed_income_foda"}]
					var content = perovaz.write(report);
					$("#generated").text(content);
					expect(content.replace(/( )|(\s)/g,'')).toBe($('#result01').text().replace(/( )|(\s)/g,''));
				});
			});
		</script>

		<script type="text/javascript">

	  		var jasmineEnv = jasmine.getEnv();
	  		jasmineEnv.updateInterval = 250;
	  		var htmlReporter = new jasmine.HtmlReporter();
	  		console.log(htmlReporter);
	  		jasmineEnv.addReporter(htmlReporter);

	  		// aqui entra o filtro do teste
	  		jasmineEnv.specFilter = function(spec) {
	  			var res = htmlReporter.specFilter(spec);
	  			if(res){
	  				console.log("Running " + spec.description);
	        	}
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
		</script>
		<script id="report-template" type="text/x-handlebars-template"><?xml version="1.0" encoding="UTF-8" ?>
			<testsuite errors="{{errors}}" failures="{{failures}}" hostname="{{hostname}}" name="{{name}}" tests="{{tests}}" time="{{time}}" timestamp="{{timestamp}}">
				{{#each testcases}}
					<testcase classname="{{classname}}" name="{{name}}" time="{{time}}"></testcase>
				{{/each}}
			</testsuite>
		</script>
	</body>
</html>
