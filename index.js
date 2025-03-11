const otpInputs = Array.from(document.querySelectorAll('.otp'));
const verifyButton = document.querySelector('#verify');

otpInputs.forEach((otpInput, index) => {
  otpInput.addEventListener('focus', () => {
    const previousInput = otpInputs[index - 1];

    if (previousInput && previousInput.value.length === 0) {
      previousInput.focus();
    }
  });

  otpInput.addEventListener('input', (event) => {
    const { target: input } = event;
    const { value: inputValue } = input;

    if (inputValue.length === 0) {
      input.classList.remove('filled');
      const previousInput = otpInputs[index - 1];
      previousInput && previousInput.focus();
      enableVerifyButtonIfAllFieldsWereFilled();
      return;
    }

    if (inputValue.length > 1) {
      input.classList.add('filled');
      fillInputs(otpInputs.slice(index, otpInputs.length), inputValue);
      enableVerifyButtonIfAllFieldsWereFilled();
      return;
    }

    if (inputValue.length === 1) {
      input.classList.add('filled');
      const nextInput = otpInputs[index + 1];
      nextInput && nextInput.focus();
      enableVerifyButtonIfAllFieldsWereFilled();
      return;
    }
  });
})

function fillInputs(inputs, value) {
  inputs.forEach((input, index) => {
    input.value = value[index] || '';
    input.focus();
  });
}

function enableVerifyButtonIfAllFieldsWereFilled() {
  const allFieldsWereFilled = otpInputs.every(input => input.value.length != 0);
  
  if (allFieldsWereFilled) {
    verifyButton.removeAttribute('disabled');
    return;
  }

  verifyButton.setAttribute('disabled', '');
}

verifyButton.addEventListener('click', () => {
  const spinner = document.createElement('span');
  spinner.classList.add('spinner');

  verifyButton.innerText = 'Verifying...';
  verifyButton.prepend(spinner);
  verifyButton.setAttribute('disabled', '');
  verifyButton.classList.add('verifying');
});
