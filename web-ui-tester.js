function loadScript(id, url) {
	if (document.getElementById(id)) return;
	var elem = document.createElementNS && document.documentElement.namespaceURI;
	elem = (elem) ?
		document.createElementNS(elem, 'script') 
		: document.createElement('script');
	elem.setAttribute('id', id);
	elem.setAttribute('type', 'text/javascript');
	elem.setAttribute('src', url);
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(elem);
}

function loadStyle(id, url) {
	if (document.getElementById(id)) return;
	var elem = document.createElementNS && document.documentElement.namespaceURI;
	elem = elem ? document.createElementNS(elem, 'style') : document.createElement('style');
	elem.setAttribute('media', 'all');
	elem.setAttribute('type', 'text/css');
	elem.setAttribute('id', id);
	elem.innerHTML = "@import url("+url+");";
	(doc.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(elem);
}

// during a test run, this collection contains the remaining
// items that will be passed to the reduce function.
var tests = $({});
var numTests = 0;

/** @pre: maptext is a string containing a valid javascript
  *   definition of a function called map.
  * @post: collection == map(testDocument())
  *
  * Evaluates the supplied string as javascript source.
  * Passes a jQuery wrapper of the current test window's DOM to map().
  */
function callMap(maptext) {
	eval(maptext);
	tests = map(testDoc());
	numTests = tests.length;
	$('#results').empty();
}

/** Returns the test page's DOMWindow object (a singleton).
  */
function testWindow() {
	if ($('#data').length == 0) $('body').append("<div id='data' />");
	if ($('#data').data().win == null)
		$('#data').data('win', window.open("http://wikipedia.org"));
	return $('#data').data().win;
}

/** Returns a jQuery object which wraps the test page DOM.
  */
function testDoc() {
	return $(testWindow().document);
}

/** Returns a jQuery object which wraps the #results div.
  * Call testResults().append(...) from within reduce().
  */
function testResults() {
	return $('#results')
}

/** Calls the supplied callback function when the test window
  * has finished loading its DOM.
  */
function onTestLoad(callback) {
	setTimeout(function() { testDoc().ready(callback) }, 500);
}

/** Call this function from within reduce() to continue
  * the test run.
  *
  * This is kind-of clunky, but synchronous calls are basically
  * unsupported in javascript.  The callback model is more js-esque.
  */
function next() {
	eval($('#reduce').val());
	if (tests.length > 0) {
		onTestLoad(function() {
			var item = tests.first();
			reduce(item);
			tests = tests.slice(1);
		});
		if (numTests > 0) {
			var progress = Math.ceil((numTests - tests.length) / numTests * 100)
			$('#progress').progressbar({ value: progress });
			$("#results").animate({ scrollTop: 900000 });
		}
	}
}

/** This convenience function simulates a native click
  * event on a link element.
  *
  * Currently broken for some relative paths.
  */
function followLink(item) {
	var href = item.prop('href');
	if (typeof href !== 'undefined' && href !== false)
		testWindow().location = href;
	else item.click();
}

/******************************************************************************/
loadScript('jquery', 'http://staging.41where.com/jsTest/jquery-ui/js/jquery-1.7.1.min.js');

var delay = 500; // half a second
function awaitJQ() {
	if ($()) { // jQuery is loaded
		init();
	}
	else setTimeout(awaitJQ, delay);
}

awaitJQ();

function init() {
	console.log($('body'));
	loadScript('jqueryui', 'http://staging.41where.com/jsTest/jquery-ui/js/jquery-ui-1.8.18.custom.min.js');
}