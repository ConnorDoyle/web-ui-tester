javascript:(function(doc, create, setAttr, getElems, scripts) {
	function loadScript(id, url) {
		if (doc.getElementById(id)) return;
		var elem = doc[create+'NS'] && doc.documentElement.namespaceURI;
		elem = elem ? doc[create+'NS'] (elem, 'script') : doc[create]('script');
		elem[setAttr]('id', id);
		elem[setAttr]('type', 'text/javascript');
		elem[setAttr]('src', url);
		(doc[getElems]('head')[0] || doc[getElems]('body')[0]).appendChild(elem);
	}
	for (var id in scripts) loadScript(id, scripts[id]);
})(document, 'createElement', 'setAttribute', 'getElementsByTagName',
{testr: 'https://raw.github.com/ConnorDoyle/web-ui-tester/master/web-ui-tester.js'});
