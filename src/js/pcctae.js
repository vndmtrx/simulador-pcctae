const qualificacao = [
  {
    direta: 0,
    indireta: 0,
    descricao: 'Mínima do Cargo'
  },
  {
    direta: 0.1,
    indireta: 0,
    descricao: 'Fundamental Completo'
  },
  {
    direta: .15,
    indireta: 0,
    descricao: 'Médio Completo'
  },
  {
    direta: .2,
    indireta: .1,
    descricao: 'Médio Técnico'
  },
  {
    direta: .25,
    indireta: .15,
    descricao: 'Graduação Completa'
  },
  {
    direta: .3,
    indireta: .2,
    descricao: 'Especialização'
  },
  {
    direta: .52,
    indireta: .35,
    descricao: 'Mestrado'
  },
  {
    direta: .75,
    indireta: .5,
    descricao: 'Doutorado'
  }
];

const baseSalario = [
  {
    step: 1.038,
    base: 1197.67
  },
  {
    step: 1.038,
    base: 1263.54
  },
  {
    step: 1.039,
    base: 1326.72
  },
  {
    step: 1.0405,
    base: 1535.84
  },
  {
    step: 1.043,
    base: 1960.17
  },
  {
    step: 1.0455,
    base: 2501.73
  }
];

const classe = {
  A: 1,
  B: 6,
  C: 11,
  D: 17,
  E: 31
};

function arredondarValores(value) {
  return Math.round(value * 100) / 100;
}

export default class PccTae {
  constructor() {
    this.periodo = 0;
    this._classe = 0;
    this.nivel = 0;
    this.progressao = 0;
    this.cargaHoraria = 0;
    this.anuenio = 0;
    this.valorQualificacao = 0;
    this.areaQualificacao = '';
    this._listeners = [];
  }

  set classe(cls) {
    if(cls in classe){
      this._classe = classe[cls];
    } else {
      this._classe = 0;
    }
  }

  get classe() {
    return this._classe;
  }

  get padraoVencimento() {
    return `P${(this._classe + this.nivel + this.progressao - 2)}`;
  }

  get vencimentoBasico() {
    const {
      base: bsSal,
      step: stSal
    } = baseSalario[this.periodo];

    // caso no início da carreira, step não é calculado.
    const stExp = this._classe + this.nivel + this.progressao - 3;
    const val = bsSal * Math.pow(stSal, stExp) * this.cargaHoraria;

    return arredondarValores(val);
  }

  get incentivoQualificacao() {
    const fator = qualificacao[this.valorQualificacao][this.areaQualificacao];
    const iq = this.vencimentoBasico * fator;

    return arredondarValores(iq);
  }

  get valorAnuenio() {
    const fator = this.anuenio / 100;
    const anuenio = this.vencimentoBasico * fator;

    return arredondarValores(anuenio);
  }

  get vencimentoBruto() {
    const vencimento = this.vencimentoBasico + this.incentivoQualificacao + this.valorAnuenio;

    return arredondarValores(vencimento);
  }

  get vencimentoLiquido() {
    return arredondarValores(this.vencimentoBruto);
  }

  on(listeners = {}) {
    for (let name in listeners) {
      this._listeners.push({ name, executor: listeners[name] });
    }
  }

  fire(listenerName, ...props) {
    this._listeners
      .find((listener) => listener.name === listenerName)
      .executor(...props);
  }
}
