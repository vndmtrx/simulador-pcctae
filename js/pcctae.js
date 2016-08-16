"use strict";

var qualificacao = [
	{direta: 0,    indireta: 0,   descricao: 'Mínima do Cargo'},
	{direta: 0.1,  indireta: 0,   descricao: 'Fundamental Completo'},
	{direta: .15,  indireta: 0,   descricao: 'Médio Completo'},
	{direta: .2,   indireta: .1,  descricao: 'Médio Técnico'},
	{direta: .25,  indireta: .15, descricao: 'Graduação Completa'},
	{direta: .3,   indireta: .2,  descricao: 'Especialização'},
	{direta: .52,  indireta: .35, descricao: 'Mestrado'},
	{direta: .75,  indireta: .5,  descricao: 'Doutorado'}
];

var base_salario = [
	{step: 1.038,  base: 1197.67},
	{step: 1.038,  base: 1263.54},
	{step: 1.039,  base: 1326.72},
	{step: 1.0405, base: 1535.84},
	{step: 1.043,  base: 1960.17},
	{step: 1.0455, base: 2501.73}
];

var classe = {
	'A': 1,
	'B': 6,
	'C': 11,
	'D': 17,
	'E': 31
};

var Pcctae = function() {
	this.periodo = 0;
	this._classe = 0;
	this.nivel = 0;
	this.progressao = 0;
	this.carga_horaria = 0;
	this.anuenio = 0;
	this.valor_qualificacao = 0;
	this.area_qualificacao = '';
};

Object.defineProperty(Pcctae.prototype, 'classe', {
	enumerable: false,
	set: function(cls){ (cls in classe) ? this._classe = classe[cls] : this._classe = 0 },
	get: function(){ return this._classe}
});

Object.defineProperty(Pcctae.prototype, 'padrao_vencimento', {
	enumerable: false,
	get: function() {
		return 'P' + (this._classe + this.nivel + this.progressao - 2).toString();
	}
});

Object.defineProperty(Pcctae.prototype, 'vencimento_basico', {
	// Calcula o nível para o vencimento básico somente se as três propriedades estejam setadas. Senão, retorna -1.
	enumerable: false,
	get: function(){
		var bs_sal = base_salario[this.periodo]['base'];
		var st_sal = base_salario[this.periodo]['step'];
		var st_exp = this._classe + this.nivel + this.progressao - 3; // caso no início da carreira, step não é calculado.
		var ch_sal = this.carga_horaria;
		var val = bs_sal * Math.pow(st_sal, st_exp) * ch_sal;
		return Math.round(val * 100) / 100; // Math.round(x * 100) / 100 -> decimal trick
	}
});

Object.defineProperty(Pcctae.prototype, 'incentivo_qualificacao', {
	enumerable: false,
	get: function() {
		var fator = qualificacao[this.valor_qualificacao][this.area_qualificacao];
		var iq = this.vencimento_basico * fator;
		return Math.round(iq * 100) / 100; // Math.round(x * 100) / 100 -> decimal trick
	}
});

Object.defineProperty(Pcctae.prototype, 'valor_anuenio', {
	enumerable: false,
	get: function() {
		var fator = this.anuenio / 100;
		var anuenio = this.vencimento_basico * fator;
		return Math.round(anuenio * 100) / 100; // Math.round(x * 100) / 100 -> decimal trick
	}
});

Object.defineProperty(Pcctae.prototype, 'vencimento_bruto', {
	enumerable: false,
	get: function() {
		var vencimento = this.vencimento_basico + this.incentivo_qualificacao + this.valor_anuenio;
		return Math.round(vencimento * 100) / 100; // Math.round(x * 100) / 100 -> decimal trick
	}
});

Object.defineProperty(Pcctae.prototype, 'vencimento_liquido', {
	enumerable: false,
	get: function() {
		var vencimento = this.vencimento_bruto;
		return Math.round(vencimento * 100) / 100; // Math.round(x * 100) / 100 -> decimal trick
	}
});

/* Memento Design Pattern */

Pcctae.prototype.deflate = function() {
	var memento = JSON.stringify(this);
	return memento;
};

Pcctae.prototype.inflate = function(memento) {
	var m = JSON.parse(memento);
	for (var obj in this) {
		if (typeof this[obj] != 'function' && typeof this[obj] != 'object') {
			this[obj] = m[obj];
		}
	}
};

/* Observer Design Pattern */

Object.defineProperty(Pcctae.prototype, '_observers', {
	configurable: false,
	enumerable: false,
	writable: true,
	value: []
});

Pcctae.prototype.on = function(fn) {
	this._observers.push(fn);
};

Pcctae.prototype.fire = function(o) {
	var ths = this;
	this._observers.filter(function(fn) {
		fn.call(ths, o);
	});
};
