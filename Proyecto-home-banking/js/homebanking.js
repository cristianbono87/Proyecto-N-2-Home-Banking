//! USUARIO: cristian87
//! CONTRASEÑA: 1234

//!CUENTAS ASOCIADAS: 
//!cuentaDeJuan ; 1234567
//!cuentaDePedro ; 1010101

//Declaración de variables

var saldoCuenta = 0;
var nombreUsuario = 'offline';
var limiteExtraccion = 0;
var estaAutorizado = false;
var limite;
var luz = 500;
var gas = 700;
var internet = 850;
var agua = 200;

var cuentasAsociadas = [
    {nombre:'cuentaDeJuan',numero: 1234567},
    {nombre:'cuentaDePedro',numero: 1010101}
];

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.

window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

// LA FUNCION INICIO DE SESION SE AGREGA FUERA DEL WINDOW.ONLOAD PARA QUE NO SE EJECUTE TODO EL TIEMPO


iniciarSesion();


//Funciones que tenes que completar


function cambiarLimiteDeExtraccion() {
    if(!estaAutorizado){
        return;
    }else {
        var limiteSalida = prompt('Indique el limite de extraccion que desea');
        limiteSalida = parseInt(limiteSalida);
    if (limiteSalida && limiteSalida%100 == 0) {
            limiteExtraccion = limiteSalida;
            window.onload();
            } else {
            alert("el monto ingresado no es valido");
        }
    }
}


function extraerDinero() {
    if (!estaAutorizado) {
        return;
    } else {
        var salidaDeDinero = prompt("Indique el monto que desea retirar");
        salidaDeDinero = parseInt(salidaDeDinero);
        var saldoAnterior = saldoCuenta;
        if (salidaDeDinero && salidaDeDinero%100 == 0 && salidaDeDinero <= saldoCuenta){
            if(salidaDeDinero > limiteExtraccion){
                alert('el monto excede lo permitido diariamente');
            } else {
                saldoCuenta -= salidaDeDinero;
                alert('extrajiste $' + salidaDeDinero + '\n saldo anterior $' + saldoAnterior + '\n saldo actual $' + saldoCuenta);
            window.onload();
            }   
        }else {
            (salidaDeDinero > saldoCuenta) ? alert('saldo insuficiente') : alert("el monto ingresado no es valido, recuerde que el cajero solo entrega billetes de $100");
        }
    }
}


function depositarDinero() {
    if (!estaAutorizado) {
        return;
    }else {
        var ingresoDeDinero = prompt("Indique el monto que desea depositar");
        ingresoDeDinero = parseInt(ingresoDeDinero);
        var saldoAnterior = saldoCuenta;

    if (ingresoDeDinero) {
            saldoCuenta += ingresoDeDinero;
            alert('depositaste $' + ingresoDeDinero + '\n saldo anterior $' + saldoAnterior + '\n saldo actual $' + saldoCuenta);
            window.onload();
        } else {
            alert("el monto ingresado no es valido");
        } 
    }
}
    
function pagarServicio() {
    if (!estaAutorizado) {
        return;
    } else {
        var impuesto = prompt('ingrese el numero correspondiente al impuesto que desea pagar \n 1-Luz \n 2-Agua \n 3-Gas \n 4-Internet');
        var numeroDeImpuesto = parseInt(impuesto);
        var servicio;
        var saldoAnterior = saldoCuenta;

        switch(true){ 
            case numeroDeImpuesto == '1':                
                servicio = luz;
            case numeroDeImpuesto == '2':
                servicio = agua;                
              break;
            case numeroDeImpuesto == '3':
                servicio = gas;
              break;
            case numeroDeImpuesto == '4':
                servicio = internet;
              break;
            default:
                return;
              break;
        }
        var pagarSiNo = prompt('Pagar servicio? y/n');
        if (pagarSiNo == 'n') {
            return;
        } else if (pagarSiNo == 'y') {
            (saldoCuenta >= servicio) ? saldoCuenta -= servicio : alert('el saldo de su cuenta es insuficiente');
            alert('costo del servicio $' + servicio + '\n saldo anterior $' + saldoAnterior + '\n saldo actual $' + saldoCuenta);
        } else {
            return;
        }
        window.onload();
    }        
}


function transferirDinero() {
    if (!estaAutorizado) {
        return;
    } else {
        var transferenciaDeDinero = prompt("Indique el monto que desea transferir");
        transferenciaDeDinero = parseInt(transferenciaDeDinero);

        if (transferenciaDeDinero) {
            var saldoAnterior = saldoCuenta;
            if (transferenciaDeDinero > saldoCuenta) {
                alert('el saldo de su cuenta es insuficiente para realizar la transacción');
                return;

            } else {
                var elegirCuenta = prompt('ingrese el nombre de la cuenta de destino');
                
                //*LA SIGUIENTE OPERACION SE REALIZA PARA COMPROBAR SI EL NOMBRE DE CUENTA EXISTE EN EL ARRAY 'cuentasAsociadas'
                //*SI EXISTE NOS DEVUELVE UN: comprobarNombreCuenta == True.

                let comprobarNombreCuenta = cuentasAsociadas.some((cuenta) => {
                    return cuenta.nombre == elegirCuenta;
                });

                    if(comprobarNombreCuenta){
                        var elegirNumeroDeCuenta = prompt('ingrese el numero de la cuenta de destino');

                //*LA SIGUIENTE OPERACION SE REALIZA PARA COMPROBAR SI EL NUMERO DE CUENTA EXISTE EN EL ARRAY 'cuentasAsociadas'
                //*SI EXISTE NOS DEVUELVE UN: comprobarNumeroDeCuenta == True.

                        let comprobarNumeroCuenta = cuentasAsociadas.some((cuenta) => {
                            return cuenta.numero == elegirNumeroDeCuenta;
                            console.log(comprobarNumeroCuenta);
                        });

                        if(comprobarNumeroCuenta){
                            saldoCuenta -= transferenciaDeDinero;
                            alert('se transfirieron $' + transferenciaDeDinero + ' a: ' + elegirCuenta + '\n saldo anterior $' + saldoAnterior + '\n saldo actual $' + saldoCuenta);
                        window.onload();
                        }else {
                            alert('solo se pueden realizar transacciones a cuentas amigas');
                            return;    
                        }
                    }else {
                    alert('solo se pueden realizar transacciones a cuentas amigas');
                    return;
                }
            }
        } else {
            alert("el monto ingresado no es valido");
        } 
    }
}



function iniciarSesion() {    
    var nombre = prompt('ingrese su usuario');
    var contraseña = prompt('ingrese su contraseña')

        if (nombre == 'cristian87' && contraseña == '1234') {
            nombreUsuario = nombre;
            estaAutorizado = true;
            alert('Bienvenido/a '+ nombreUsuario + ' ya puedes comenzar a realizar operaciones')
        } else {
            alert('El usuario o la contraseña son incorrectos, tu dinero sera retenido por seguridad');
        } 
}


//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}
