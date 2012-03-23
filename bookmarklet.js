javascript:(function(doc, create, setAttr, getElems, scriptURL, name, id) {
	if (doc.getElementById(name)) {
		return;
	}
	id = doc[create+'NS'] && doc.documentElement.namespaceURI;
	id = id ? doc[create+'NS'] (id, 'script') : doc[create]('script');
	id[setAttr]('id', name);
	id[setAttr]('src', scriptURL);
	(doc[getElems]('head')[0] || doc[getElems]('body')[0]).appendChild(id);
})(document, 'createElement', 'setAttribute', 'getElementsByTagName',
'C:\Users\18871\Desktop\browserLinkTest\testUtils.js', 'testFramework', '#tfStart');
