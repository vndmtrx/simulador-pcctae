"use strict";

// Avoid `console` errors in browsers that lack a console.
(function() {
		var method;
		var noop = function () {};
		var methods = [
				'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
				'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
				'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
				'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
				method = methods[length];

				// Only stub undefined methods.
				if (!console[method]) {
						console[method] = noop;
				}
		}
}());

// Place any jQuery/helper plugins in here.
var func = function(){
	/*var selected = $(this).find("option:selected").val();alert(selected);*/
	var frm = $('form#pcctae_form').fields();
	calcula_salario(frm);
};

$(function() {
	$('.selectpicker, .spin').on('change', func);
	func();

	/*$('#selectClasse').on('change', function() {
		troca_qualificacao(this.form, this.form.selectQualificacao.value);
	});*/

});
