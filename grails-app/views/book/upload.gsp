<!DOCTYPE html>
<html>
<head>
	<meta name="layout" content="main" />
	<title>how-to-tomate file upload</title>
</head>
<body>
	Upload Form: <br />
	<pre id="fileContents">${fileContents}</pre>
	<g:uploadForm action="uploaded">
	    <input type="file" name="myFile" />
	    <input type="submit" class="create" />
	</g:uploadForm>
</body>
</html>