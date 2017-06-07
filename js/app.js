var calculadora = (function() {
    var calcular = {
        pantalla: '.calculadoraFondo',
        teclado: '.teclado',
        tecla: '.tecla'
    };

    var largoDisplay = 8,
        ultOperador = '',
        teclaOprimidaId = '',
        iniciarBoleano = 1,
        puntoBoleano = 0,
        ultNumeroCalc = 0,
        numEspBoleano = 0,
        operacionPendiente = "no",
        displayValor = "0",
        resultadoInterno = 0;

    function mouseDown(tecla) {
        tecla.target.setAttribute("style", "transform:scale(0.9,0.9)")
        //    setTimeout(doSomething_hover($(this)), 3000);
        //    retardador(1000);
        //    tecla.target.setAttribute("style", "transform:scale(1.0,1.0)")
    }

    function retardador(tiempo) {
        //    setTimeout(doSomething_hover($(this)), 3000);
        var i = 1
        if (i < tiempo) {
            i++;
        } else {
            return;
        }
    }

    function oprimioNumero(tecla) {
        var numOprimido = tecla.target.id;
        if (numOprimido == "punto") {
            numOprimido = ".";
        };
        mouseDown(tecla);
        if (ultOperador == '=') {
            displayValor = "0";
            ultOperador = "";
        }
        if (displayValor == "0" || numEspBoleano == 1) {
            displayValor = numOprimido;
            pantalla.innerHTML = displayValor;
            if (numOprimido == ".") {
                displayValor = "0.";
                pantalla.innerHTML = displayValor;
                puntoBoleano = 1;
            }
        } else {
            if (numOprimido == "." && puntoBoleano == 0) {
                displayValor += numOprimido;
                pantalla.innerHTML = displayValor;
                puntoBoleano = 1;
            } else if (numOprimido == "." && puntoBoleano == 1) {

            } else {
                if (displayValor.length > 8) {
                    alert("El valor Introducido sobrepasa los 8 dígitos");
                } else {
                    displayValor += numOprimido;
                    pantalla.innerHTML = displayValor;
                }
            }
            iniciarBoleano = 0;
        }
        iniciarBoleano = 0
    }

    function teclaOperacion(tecla) {
        var targetElement = tecla.target || tecla.srcElement;
        var teclaOprimidaId = targetElement.id;
        mouseDown(tecla);
        switch (teclaOprimidaId) {
            case "dividido":
                operacion = "/";
                break;
            case "por":
                operacion = "*";
                break;
            case "menos":
                operacion = "-";
                break;
            case "mas":
                operacion = "+";
                break;
        };
        if (operacionPendiente != "no") {
            if (ultOperador != "=") {
                resultadoInterno = calcularRespuesta(resultadoInterno, operacionPendiente, displayValor);
            }
            operacionPendiente = operacion;
            ultNumeroCalc = displayValor;
        } else {
            resultadoInterno = displayValor;
        };
        operacionPendiente = operacion;
        displayValor = "0";
        puntoBoleano = 0;
        iniciarBoleano = 1;
    };

    function borradoTotal(tecla) {
        mouseDown(tecla);
        displayValor = "0";
        pantalla.innerHTML = displayValor;
        puntoBoleano = 0;
        numEspBoleano = 0;
        operacionPendiente = "no";
    }

    function cambiarSigno(tecla) {
        mouseDown(tecla);
        var resultado = Number(displayValor);
        resultado = -resultado;
        displayValor = String(resultado);
        pantalla.innerHTML = displayValor;
    }

    function raizCuadrada(tecla) {
        mouseDown(tecla);
        var solucionNumero = Math.sqrt(displayValor);
        if (solucionNumero == "NAN") {
            displayValor = "Error";
        } else {
            displayValor = solucionNumero.toString().substr(0, largoDisplay);
        }
        pantalla.innerHTML = displayValor;
        operacionPendiente = "no";
        iniciarBoleano = 1;
    }

    function mostrarResultado(tecla) {
        mouseDown(tecla);
        displayValor = calcularRespuesta(resultadoInterno, operacionPendiente, ultNumeroCalc);
        pantalla.innerHTML = displayValor.substr(0, largoDisplay);
        ultOperador = '=';
    }

    function calcularRespuesta(valorAlmac, operacionPen, valorNuevo) {
        if (ultOperador == "=") {
            ultNumeroCalc = Number(valorNuevo);
        } else {
            ultNumeroCalc = displayValor;
        }
        var solucionNumero = eval(String(valorAlmac + operacionPen + ultNumeroCalc));
        var texto_Display = solucionNumero.toString();
        resultadoInterno = texto_Display;
        return texto_Display;
    }

    window.onload = function() {
        pantalla = document.getElementById("display");
        //   ----------------------------------------------------------------------
        document.getElementById('1').onclick = oprimioNumero;
        document.getElementById('2').onclick = oprimioNumero;
        document.getElementById('3').onclick = oprimioNumero;
        document.getElementById('4').onclick = oprimioNumero;
        document.getElementById('5').onclick = oprimioNumero;
        document.getElementById('6').onclick = oprimioNumero;
        document.getElementById('7').onclick = oprimioNumero;
        document.getElementById('8').onclick = oprimioNumero;
        document.getElementById('9').onclick = oprimioNumero;
        document.getElementById('0').onclick = oprimioNumero;
        document.getElementById('punto').onclick = oprimioNumero;
        // ----------------------------------------------------------------------
        document.getElementById('on').onclick = borradoTotal;
        document.getElementById('sign').onclick = cambiarSigno;
        document.getElementById('raiz').onclick = raizCuadrada;
        document.getElementById('igual').onclick = mostrarResultado;
        // ----------------------------------------------------------------------
        document.getElementById('dividido').onclick = teclaOperacion;
        document.getElementById('por').onclick = teclaOperacion;
        document.getElementById('menos').onclick = teclaOperacion;
        document.getElementById('mas').onclick = teclaOperacion;
        // ----------------------------------------------------------------------
    }
    return {}
})();
