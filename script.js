document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('encryptButton').addEventListener('click', function() {
        let inputText = document.getElementById('inputText').value;
        const fecha = document.getElementById('fecha').value;
        let columnOrder;
        if (fecha == "") {
            columnOrder = document.getElementById('columnOrder').value.split(',').map(Number);
        }else{
            columnOrder = enumerarFecha(fecha).split(',').map(Number);
            document.getElementById('columnOrder').value = "";
            document.getElementById('columnOrder').value = columnOrder.join(',');
        }
        const numColumns = columnOrder.length;
        while(inputText.length % numColumns != 0) {
            inputText += ' ';
        }
        let outputText = '';

        // Crear una matriz para almacenar las columnas
        let columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push([]);
        }

        // Llenar las columnas con los caracteres del mensaje original
        for (let i = 0; i < inputText.length; i++) {
            columns[i % numColumns].push(inputText[i]);
        }
        console.log(columns);
        // Agregar aquí el nuevo código
        let numberedText = '';
        for (let i = 0; i < inputText.length; i++) {
            numberedText += inputText[i] + (i % numColumns + 1);
        }

        numberedText = numberedText.split('').reverse().join('');

        document.getElementById('numberText').value = numberedText;


        // Leer las columnas en el orden establecido y concatenar los caracteres
        for (let i = 0; i < numColumns; i++) {
            let columnIndex = columnOrder[i] - 1;
            outputText += columns[columnIndex].join('');
        }

        document.getElementById('outputText').value = outputText;

        // Limpiar las pilas
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`pile${i}`).textContent = '';
        }

        // Rellenar las pilas con datos de columnas
        for (let i = 0; i < columns.length; i++) {
            let pileElement = document.getElementById(`pile${i + 1}`);
            //columns[i] = columns[i].reverse();  // Revertir el orden de los elementos en la columna
            pileElement.innerHTML = columns[i].join('<br>');
        }
    });
    document.getElementById('decryptButton').addEventListener('click', function() {
        const inputText = document.getElementById('inputText').value;
        const fecha = document.getElementById('fecha').value;
        let columnOrder;
        if (fecha == "") {
            columnOrder = document.getElementById('columnOrder').value.split(',').map(Number);
        }else{
            columnOrder = enumerarFecha(fecha).split(',').map(Number); // eliminamos 'const'
            document.getElementById('columnOrder').value = "";
            document.getElementById('columnOrder').value = columnOrder.join(',');
        }
        const numColumns = columnOrder.length;
        let outputText = '';

        // Crear una matriz para almacenar las columnas
        let columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push([]);
        }

        // Llenar las columnas con los caracteres del mensaje cifrado
        let j = 0;
        for (let i = 0; i < numColumns; i++) {
            let columnIndex = columnOrder[i] - 1;
            let columnLength = Math.ceil((inputText.length - j) / (numColumns - i));
            columns[columnIndex] = inputText.slice(j, j + columnLength).split('');
            j += columnLength;
        }

        // Leer las columnas en el orden original y concatenar los caracteres
        let k = 0;
        while (k < inputText.length) {
            for (let i = 0; i < numColumns; i++) {
                if (columns[i].length > 0) {
                    outputText += columns[i].shift();
                    k++;
                }
            }
        }
        function eliminarAsteriscos(outputText) {
            return outputText.replace(/\*/g, '');
        }
        document.getElementById('outputText').value = eliminarAsteriscos(outputText);
    });
    const themeToggleButton = document.getElementById('themeToggleButton');

    themeToggleButton.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('bg-gray-100')) {
            // Si actualmente estamos en el modo claro, cambiamos al oscuro
            body.classList.remove('bg-gray-100', 'text-gray-900');
            body.classList.add('bg-gray-900', 'text-gray-100');
            document.querySelectorAll('.border-gray-300').forEach(el => {
                el.classList.remove('border-gray-300', 'bg-gray-100', 'text-gray-900');
                el.classList.add('border-gray-700', 'bg-gray-800', 'text-gray-300');
            });
        } else {
            // Si actualmente estamos en el modo oscuro, cambiamos al claro
            body.classList.remove('bg-gray-900', 'text-gray-100');
            body.classList.add('bg-gray-100', 'text-gray-900');
            document.querySelectorAll('.border-gray-700').forEach(el => {
                el.classList.remove('border-gray-700', 'bg-gray-800', 'text-gray-300');
                el.classList.add('border-gray-300', 'bg-gray-100', 'text-gray-900');
            });
        }
        var outputFields = document.getElementsByClassName('output-field');
        for (var i = 0; i < outputFields.length; i++) {
            if (body.classList.contains('bg-gray-100')) {
                outputFields[i].style.backgroundColor = '#ffffff'; // Color de fondo para el modo claro
                outputFields[i].style.color = '#000000'; // Color de texto para el modo claro
            } else {
                outputFields[i].style.backgroundColor = '#4a5568'; // Color de fondo para el modo oscuro
                outputFields[i].style.color = '#ffffff'; // Color de texto para el modo oscuro
            }
        }
    });
    function enumerarFecha(fecha) {
        // Descomponemos la fecha en un array de caracteres
        let chars = fecha.split('');
        let enumeracion = Array(chars.length).fill(0);
        let counter = 1;

        // Recorremos los números del 0 al 9
        for(let i = 0; i <= 9; i++) {
            // Recorremos los caracteres de la fecha
            for(let j = 0; j < chars.length; j++) {
                // Si encontramos el número y no es una barra
                if(chars[j] == i && chars[j] != '/') {
                    // Asignamos el contador a la posición correspondiente en la enumeración
                    enumeracion[j] = counter;
                    // Incrementamos el contador
                    counter++;
                }
            }
        }

        // Filtramos la enumeración para excluir las barras (representadas por 0's)
        let enumeracionFiltrada = enumeracion.filter(num => num != 0);

        // Retornamos la enumeración separada por comas
        return enumeracionFiltrada.join(',');
    }
    document.getElementById('fechaButton').addEventListener('click', function() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
        let aa = String(today.getFullYear()).substr(-2);
        let fechaHoy = dd + '/' + mm + '/' + aa;
        document.getElementById('fecha').value = fechaHoy;
    });
    document.getElementById('copyButton').addEventListener('click', function() {
        var outputText = document.getElementById('outputText');
        outputText.select();
        document.execCommand('copy');
    });
    
});