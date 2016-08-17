import PccTae from './pcctae';

const pccTae = new PccTae();

pccTae.on({
  formHasChanged(form) {
    form.querySelector('[name="labelPadraoVencimento"]').value = pccTae.padraoVencimento;
    form.querySelector('[name="labelBase"]').value = pccTae.vencimentoBasico.toFixed(2);
    form.querySelector('[name="labelIQ"]').value = pccTae.incentivoQualificacao.toFixed(2);
    form.querySelector('[name="labelVencimentoBruto"]').value = pccTae.vencimentoBruto.toFixed(2);
    form.querySelector('[name="labelVencimentoLiquido"]').value = pccTae.vencimentoLiquido.toFixed(2);
  }
});

function calculaSalario(form) {
  pccTae.periodo = parseInt(form.querySelector('[name="selectPeriodoPagamento"]').value, 10);
  pccTae.classe = form.querySelector('[name="selectClasse"]').value;
  pccTae.nivel = parseInt(form.querySelector('[name="selectNivel"]').value, 10);
  pccTae.progressao = parseInt(form.querySelector('[name="selectProgressao"]').value, 10);
  pccTae.cargaHoraria = parseFloat(form.querySelector('[name="selectCargaHoraria"]').value);
  pccTae.valorQualificacao = parseInt(form.querySelector('[name="selectQualificacao"]').value, 10);
  pccTae.areaQualificacao = form.querySelector('[name="selectAreaQualificacao"]').value;
  pccTae.anuenio = parseInt(form.querySelector('[name="spinAnuenio"]').value, 10);

  pccTae.fire('formHasChanged', form);
};

function triggerCalc(){
  calculaSalario(document.querySelector('#pcctae_form'));
};

document.querySelectorAll('.selectpicker, .spin').forEach((element) => {
  element.onchange = triggerCalc;
});

triggerCalc();
