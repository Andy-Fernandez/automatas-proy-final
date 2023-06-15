document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('encryptButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const columnOrder = document.getElementById('columnOrder').value.split(',').map(Number);
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
        const columnOrder = document.getElementById('columnOrder').value.split(',').map(Number);
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

        document.getElementById('outputText').value = outputText;
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
});