/*
Funcion creada para ejecutar el modal del boton Nuevo Contacto 
*/

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

/* Variables Generales*/
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
/*function validar(contacto){
	if(arrayContactos.length === null){
		arrayContactos.push(contacto);
	}else{
		for (var i =0; i <arrayContactos.length;i++ ){
			if (contacto.nombre === arrayContactos[i].nombre) {
				alert("ESTE NOMBRE DE CONTACTO YA SE ENCUENTRA REGISTRADO");
			}
			return contacto;		
		}	
		
	}
}*/


/*
Funcion agregar contacto 
paramentros: nombre, direccion, telefono
creado para guardar el contacto en una lista de contactos.
*/
function agregarContacto(nombre,direccion,telefono){
	var contacto = {
		nombre:nombre,
		direccion:direccion,
		telefono:telefono
	}
	arrayContactos.push(contacto);
}

/*
Funcion Limpiar
Limpiar valores de los datos ingresados
 en el formulario de registrar Contactos
*/
function limpiar(){
	nombre.value="";
	direccion.value="";
	telefono.value="";
}

/*
Funcion event obsubmit
creada para funcionamiento del boton registrar que se encuentra en el formulario
la cual se encarga de toamr los valores y validar que los valores ingresados sean correctamente.
*/
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

/* 
Funcion guardarDatosLocales
esta funcion es para agregar los datos a la local Storage
y cargar la pagina al momento de agregar un nuevo contacto para eliminar o agregar los nuevos
*/
function guardarDatosLocales(){
	localStorage.setItem("contactos", JSON.stringify(arrayContactos));
	mostrarDatosLocales();
	location.reload();	
}

/*
Funcion mostrarDatosLocales
esta funcion es encargada de realizar el proceso de trasformar los datos que se encontraban en la local storage
ademas de realizar el ordenamiento de el arrayContactos para ordenarlo de forma alfabetica y crear cada uno de los cuarpos 
de HTML de cada Contacto
*/
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

/*
Funcion onclick
esta funcion se encarga de realizar la busqueda del objeto boton borrar o editar
tambien realiza el proceso de elimar un contacto y de editar un contacto
*/
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

/*
Funcion eliminarContacto
funcion encargada de recorrer el arrayContactos y realizar la eliminacion de todo el contenido de cada contacto 
*/
function eliminarContacto(nombreEliminar){
	arrayContactos.forEach((elemento,index)=>{
		if(elemento.nombre==nombreEliminar){
			arrayContactos.splice(index,1);
		}
	});
	guardarDatosLocales();
}

/*
Funcion editarContacto
funcion creada para cambiar los datos que ya se encuentran en el arrayContactos de alguno de los contactos todos seran editados.
*/
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

