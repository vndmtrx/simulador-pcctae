"use strict";

var x = new Pcctae();

x.on(function(form) {
	form.labelPadraoVencimento.val(x.padrao_vencimento);
	form.labelBase.val(x.vencimento_basico.toFixed(2));
	form.labelIQ.val(x.incentivo_qualificacao.toFixed(2));
	form.labelVencimentoBruto.val(x.vencimento_bruto.toFixed(2));
	form.labelVencimentoLiquido.val(x.vencimento_liquido.toFixed(2));
});

var calcula_salario = function(form) {
	x.periodo = parseInt(form.selectPeriodoPagamento.val());
	x.classe = form.selectClasse.val();
	x.nivel = parseInt(form.selectNivel.val());
	x.progressao = parseInt(form.selectProgressao.val());
	x.carga_horaria = parseFloat(form.selectCargaHoraria.val());
	x.valor_qualificacao = parseInt(form.selectQualificacao.val());
	x.area_qualificacao = form.selectAreaQualificacao.val();
	x.anuenio = parseInt(form.spinAnuenio.val());

	x.fire(form);
	$('.selectpicker').selectpicker('refresh');
};

// Carregar arquivos do disco: http://jsfiddle.net/mDNFX/1/
