(() => {
  const INPUT_ID = 'input';
  const SUBMIT_ID = 'submit';
  const RESULT_ID = 'result';
  const SELECT_ID = 'select';

  let currentInput = null;
  let currentFunc = 'A';

  function fToC(num) {
    return ((num - 32) * (5/9)).toFixed(2);
  }

  function cToF(num) {
    return ((num * (9/5)) + 32).toFixed(2);
  }

  function setResult(res) {
    document.getElementById(RESULT_ID).textContent = res;
  }

  document.getElementById(INPUT_ID).addEventListener('keyup', e => {
    currentInput = e.target.value;
  });

  document.getElementById(SELECT_ID).addEventListener('change', e => {
    currentFunc = e.target.value;
  });
  
  document.getElementById(SUBMIT_ID).addEventListener('click', e => {
    const num = parseInt(currentInput);
    if (currentFunc === 'A') {
      setResult(`${currentInput} Fahrenheit = ${fToC(num)} Celsius`);
    }
    else {
      setResult(`${currentInput} Celsius = ${cToF(num)} Fahrenheit`);
    }
  });
})();