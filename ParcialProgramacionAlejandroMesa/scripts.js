

document.getElementById('nombre').addEventListener('keypress',(event)=>{
    if(!(/[a-zA-Z\s]/.test(event.key))){
      event.preventDefault()
    }
 })
 document.getElementById('apellido').addEventListener('keypress',(event)=>{
    if(!(/[a-zA-Z\s]/.test(event.key))){
      event.preventDefault()
    }
 })
 document.getElementById('salario').addEventListener('keypress',(event)=>{
    if(!(/[0-9]/.test(event.key))){
      event.preventDefault()
    }
    })


const xmlhttp = new XMLHttpRequest();

xmlhttp.open('GET', 'departments.json', true);

xmlhttp.onload = function () {
    if (xmlhttp.status === 200) {
        const jsonData = JSON.parse(xmlhttp.responseText);
        const selectDepartamentos = document.getElementById("deparment");

        jsonData.forEach(departamento => {
            const option = document.createElement("option");
            option.value = departamento.code;
            option.text = departamento.name;
            selectDepartamentos.appendChild(option);
        });
    } else {
        console.error("No se pudo cargar el archivo JSON.");
    }
};

xmlhttp.send();

const xmlhttpm = new XMLHttpRequest();

xmlhttpm.open('GET', 'towns.json', true);

xmlhttpm.onload = function () {
    if (xmlhttpm.status === 200) {
        const jsonData = JSON.parse(xmlhttpm.responseText);
        const selectDepartamentos = document.getElementById("deparment");
        const selectMunicipios = document.getElementById("municipio");


        const municipiosPorDepartamento = {};


        jsonData.forEach(item => {
            const option = document.createElement("option");
            option.value = item.code;
            option.text = item.name;
            selectDepartamentos.appendChild(option);

            if (!municipiosPorDepartamento[item.department]) {
                municipiosPorDepartamento[item.department] = [];
            }
            municipiosPorDepartamento[item.department].push(item);
        });


        selectDepartamentos.addEventListener("change", function () {
            const departamentoSeleccionado = selectDepartamentos.value;
            selectMunicipios.innerHTML = ''; 

            if (departamentoSeleccionado !== '') {
    
                const municipiosDelDepartamento = municipiosPorDepartamento[departamentoSeleccionado];


                municipiosDelDepartamento.forEach(municipio => {
                    const option = document.createElement("option");
                    option.value = municipio.code;
                    option.text = municipio.name;
                    selectMunicipios.appendChild(option);
                });
            }
        });
    } else {
        console.error("No se pudo cargar el archivo JSON.");
    }
};

xmlhttpm.send();

let filaID = 1; 
const empleados = []; 


function agregarOpcionesSpecie() {
    const selectId = document.getElementById("empleado");
    selectId.innerHTML = '<option value="">Todos</option>'; 
    
    empleados.forEach(empleado => {
        const option = document.createElement("option");
        option.value = empleado.id;
        option.text = empleado.id;
        selectId.appendChild(option);
    });
}


function filtrarPorID() {
    const selectId = document.getElementById("empleado");
    const valorSeleccionado = selectId.value;
    const tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
    tabla.innerHTML = ""; 
    empleados.forEach(empleado => {
        if (valorSeleccionado === "" || empleado.id === valorSeleccionado) {
            const fila = tabla.insertRow();
            const celdaID = fila.insertCell(0);
            const celdaApellido = fila.insertCell(1);
            const celdaNombre = fila.insertCell(2);
            const celdaDepartamento = fila.insertCell(3);
            const celdaMunicipio = fila.insertCell(4);
            const celdaFecha = fila.insertCell(5);
            const celdaSalario = fila.insertCell(6);

            celdaID.innerHTML = empleado.id;
            celdaApellido.innerHTML = empleado.apellido;
            celdaNombre.innerHTML = empleado.nombre;
            celdaDepartamento.innerHTML = empleado.departamento;
            celdaMunicipio.innerHTML = empleado.municipio;
            celdaFecha.innerHTML = empleado.fecha;
            celdaSalario.innerHTML = empleado.salario;
        }
    });
}

function agregarEmpleado() {

    const apellido = document.getElementById("apellido").value;
    const nombre = document.getElementById("nombre").value;
    const departamento = document.getElementById("deparment").value;
    const municipio = document.getElementById("municipio").value;
    const fecha = document.getElementById("fecha").value;
    const salario = document.getElementById("salario").value;

    const empleado = {
        id: filaID,
        apellido: apellido,
        nombre: nombre,
        departamento: departamento,
        municipio: municipio,
        fecha: fecha,
        salario: salario
    };
    empleados.push(empleado);

    filaID++;


    document.getElementById("apellido").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("deparment").value = "";
    document.getElementById("municipio").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("salario").value = "";


    agregarOpcionesSpecie();
}
