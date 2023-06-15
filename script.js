document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('encryptButton').addEventListener('click', function() {
    let inputText = document.getElementById('inputText').value;
    const fecha = document.getElementById('fecha').value;
    let columnOrder;
    if (fecha == "") {
        columnOrder = document.getElementById('columnOrder').value.split(',').map(Number);
    }else{
        while(inputText.length < 6) {
            inputText += '*';
        }
        columnOrder = enumerarFecha(fecha).split(',').map(Number);
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

    // Llenar las columnas con los caracteres del mensaje original
    for (let i = 0; i < inputText.length; i++) {
        columns[i % numColumns].push(inputText[i]);
    }

    // Leer las columnas en el orden establecido y concatenar los caracteres
    for (let i = 0; i < numColumns; i++) {
        let columnIndex = columnOrder[i] - 1;
        outputText += columns[columnIndex].join('');
    }

    document.getElementById('outputText').value = outputText;
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
});