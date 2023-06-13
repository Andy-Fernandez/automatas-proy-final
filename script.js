document.getElementById('convertButton').addEventListener('click', function() {
  const rot = parseInt(document.getElementById('rotSelect').value);
  const inputText = document.getElementById('inputText').value;
  let outputText = '';

  for (let i = 0; i < inputText.length; i++) {
      let ascii = inputText.charCodeAt(i);

      if (ascii >= 65 && ascii <= 90) {
          outputText += String.fromCharCode((ascii - 65 + rot) % 26 + 65);
      } else if (ascii >= 97 && ascii <= 122) {
          outputText += String.fromCharCode((ascii - 97 + rot) % 26 + 97);
      } else {
          outputText += inputText.charAt(i);
      }
  }

  document.getElementById('outputText').value = outputText;
});
