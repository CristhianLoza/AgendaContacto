if(document.getElementById("botonModal")){
	var modal = document.getElementById("modalPrincipal");
	var btn = document.getElementById("botonModal");
	var span = document.getElementsByClassName("cerrar")[0];
	var body = document.getElementsByTagName("body")[0];

	btn.onclick = function() {
		modal.style.display = "block";
		body.style.position = "static";
		body.style.height = "100%";
		body.style.overflow = "hidden";
	}

	span.onclick = function() {
		modal.style.display = "none";
		body.style.position = "inherit";
		body.style.height = "auto";
		body.style.overflow = "visible";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
			body.style.position = "inherit";
			body.style.height = "auto";
			body.style.overflow = "visible";
			}
		}
	}

var formulario = document.getElementById("formulario");
var nombre = document.getElementById("nombre");
var direccion = document.getElementById("direccion");
var telefono = document.getElementById("telefono");
var listaContactos = document.getElementById("listaContactos");

var arrayContactos=[];

var contacto = {
	nombre:"",
	direccion:"",
	telefono:""
}
//Funcion Creada para validacion de 
function validar(contacto){
	if(arrayContactos.length === null){
		arrayContactos.push(contacto);
	}else{
		for (var i =0; i <arrayContactos.length;i++ ){
			if (contacto.nombre != arrayContactos[i].nombre) {
				arrayContactos.push(contacto);
			}else{
				alert("ESTE NOMBRE DE CONTACTO YA SE ENCUENTRA REGISTRADO");
			}
			
		}	
	}
	
}

function agregarContacto(nombre,direccion,telefono){
	var contacto = {
		nombre:nombre,
		direccion:direccion,
		telefono:telefono
	}
	validar(contacto);
}

function limpiar(){
	nombre.value="";
	direccion.value="";
	telefono.value="";
}

formulario.onsubmit=function(e){
	e.preventDefault();
	var nombreContacto = document.getElementById("nombre").value;
	var direccion = document.getElementById("direccion").value;
	var telefono = document.getElementById("telefono").value;

	if (nombreContacto ===null || nombreContacto ==="") {
		alert("Porfavor Ingrese Nombre De Contacto ");
	}else if (direccion === null || direccion ==="") {
		alert("Porfavor Ingrese Direccion Del Contacto ");
	}else if (telefono === null || telefono === "" || !(/^\d{10}$/.test(telefono)) ) {
		alert("Porfavor Ingrese Un Numero de telefono ");
	}else{
		agregarContacto(nombreContacto,direccion,telefono);
		guardarDatosLocales();
		limpiar();
	}
}


function guardarDatosLocales(){
	localStorage.setItem("contactos", JSON.stringify(arrayContactos));
	mostrarDatosLocales();
	location.reload();	
}

document.addEventListener("DOMContentLoaded",mostrarDatosLocales);
function mostrarDatosLocales(){
	arrayContactos = JSON.parse(localStorage.getItem("contactos"));
		arrayContactos.sort(function(prev, next){if (prev.nombre > next.nombre) {
    	return 1;
  		}
  		if (prev.nombre < next.nombre) {
    	return -1;
  		}
  		return 0;});
	for (var i =0; i <arrayContactos.length; i++) {
		listaContactos.innerHTML+=`
			<div class="panelContactos">
                <div style="width: 550px;">
                    <div style="padding: 3px;">
                        <label class="titulo3" > NOMBRE </label>
                        <strong class="textoContacto" style="padding: 38px;" >${arrayContactos[i].nombre}</strong>
                    </div>
                    <div style="padding: 3px;">
                        <label class="titulo3" > DIRECCION </label>
                        <strong class="textoContacto">${arrayContactos[i].direccion}</strong>
                    </div>
                    <div style="padding: 3px;">
                        <label class="titulo3" > TELEFONO </label>
                        <strong class="textoContacto" style="padding: 19px;">${arrayContactos[i].telefono}</strong>
                    </div>  
                </div>
                <div class="botonProceso">
                        <button class="boton2 borrar" > BORRAR </button>
                        <button class="boton2 editar" > EDITAR </button> 
                </div>          
        	</div>
        	<br>
		`;
	}
}


listaContactos.onclick=function(e){
	e.preventDefault();
	if(e.target.classList[1]==="borrar"|| e.target.classList[1]==="editar"){
		var nombreEliminar = e.target.parentNode.parentNode.querySelector("strong").innerHTML;
		if(e.target.classList[1]==="borrar"){
			eliminarContacto(nombreEliminar);
		}else{
			var nombreEdi = prompt(" Ingresa el nombre ");
            var direccionEdi = prompt(" Ingresa la direccion ");
            var telefonoEdi = prompt(" Ingresa el telefono ");

            if (nombreEdi ===null || nombreEdi ==="") {
			alert("Porfavor Ingrese Nombre De Contacto " + " NO SE GUARDARON LAS MODIFICACIONES");

			}else if (direccionEdi === null || direccionEdi ==="") {
				alert("Porfavor Ingrese Direccion Del Contacto " + " NO SE GUARDARON LAS MODIFICACIONES");

			}else if (telefonoEdi === null || telefonoEdi === "" || !(/^\d{10}$/.test(telefonoEdi)) ) {
				alert("Porfavor Ingrese Un Numero de telefono "+ " NO SE GUARDARON LAS MODIFICACIONES");

			}else{
				editarContacto(nombreEliminar,nombreEdi,direccionEdi,telefonoEdi);
			}  
		}
	}
}

function eliminarContacto(nombreEliminar){
	arrayContactos.forEach((elemento,index)=>{
		if(elemento.nombre==nombreEliminar){
			arrayContactos.splice(index,1);
		}
	});
	guardarDatosLocales();
}


function editarContacto(nombreEliminar,a,b,c) {
	for (var i =0;i < arrayContactos.length;i++) {
		if (arrayContactos[i].nombre == nombreEliminar ) {
			arrayContactos[i].nombre=a;
			arrayContactos[i].direccion=b;
			arrayContactos[i].telefono=c;
		}
	}
	guardarDatosLocales();
}

