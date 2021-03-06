var datos = ["img/The_phatom_Menace.jpg", "img/Attack_of_the_clones.jpg","img/Revange_of_the_Sith.jpg","img/A_new_hope.jpg","img/The_empires_strikes_back.jpg","img/Return_of_the_Jedi.jpg","img/The_force_awakens.jpg" ];
var salida = "", film, busqueda, pelicula,texto;

//  LLamada al Json general con las 7 peliculas con la que muestro la sección general de la página.
$(document).ready(function(){
	$.getJSON('https://swapi.co/api/films/').done(function(data){
		film = data.results.map(function(item){
			item["imagen"] = datos[item.episode_id - 1]
			return item;
		});
		film.sort(function(item1, item2){
			return item1.episode_id > item2.episode_id;
		});
		console.log(film);
		imprimir();
	});	
});	

// Aquí imprimo la sección principal con la portada de las 7 películas creando un div row cada 4 películas
function imprimir (){

	document.getElementById("info").style.display ="none"

	for(i=0; i < film.length; i++){
		if( i == 0){
			salida+= '<div class="row">';
		} else if( (i % 4) == 0){
			salida += '</div> <div class="row">';
		}
		salida+='<div class="col-12 col-sm-6 col-md-3  text-center contenedorCss mb-3 mt-5" ><img alt="Star Wars film" src='+film[i].imagen+' class="img-rounded imagenes image" style="width:100%"><div class="middle"><h3 class="text-center titles text" style="height:2em">'+film[i].title+'</h3><button id="boton" type="button" class="btn btn-outline-success mt-5 botonInfo" onclick= info(film,'+i+')>+ Info</button></div></div>';
	};
	if (i!=0){
		salida += "</div>";
	};
	document.getElementById("contenedor").innerHTML = salida;
};

// En esta función hago la llamada al Json de la película que el usuario haya buscado y oculto las demás secciones para mostrar las caratulas y el botón de info de las películas que coincidan con la buqueda del usuario.
function search(){
	busqueda = document.getElementById("search").value

	$.getJSON('https://swapi.co/api/films/?search='+busqueda).done(function(data){
		pelicula = data.results.map(function(item){
			item["imagen"] = datos[item.episode_id - 1]
			return item;
		});;
		
		// Aqui ordeno el array película segun el episode_id
		pelicula.sort(function(item1, item2){
			return item1.episode_id > item2.episode_id;
		});
		 console.log(pelicula)
		if(busqueda == ""){
		document.getElementById("search").style.background = "white";	
		$("#contenedor").show();
		$("#info").hide();
		$("#filmSearch").hide();
		}else if(pelicula.length==0){
			document.getElementById("search").style.background = "#FE2E2E";
		}else {
			document.getElementById("search").style.background = "white";
		$("#contenedor").hide();
		$("#info").hide();
		$("#filmSearch").show();
		
		salida ="";
		for(i=0; i < pelicula.length; i++){
			if( i == 0){
			salida+= '<div class="row">';
			}
			else if( (i % 4) == 0){
			salida += '</div> <div class="row mt-2">';
			}

				salida +='<div class="col-12 col-sm-6 col-md-3 text-center contenedorCss mt-5 mb-3"><img alt="Star Wars film" src='+pelicula[i].imagen+' class="img-rounded imagenes image" style="width:100%"><div class="middle"><h3 class="text-center titles text" style="height:2em">'+pelicula[i].title+'</h3><button id="boton" type="button" class="btn btn-outline-success mt-5 botonInfo" onclick= info(pelicula,'+i+')>+ Info</button></div></div>';
				console.log(i);
		}
		if (i!=0){
		salida += "</div>";
		}
		document.getElementById("filmSearch").innerHTML = salida;
		window.location = "#filmSearch";
	}
    });

	
}

// Función para mostrar la tabla de información de cada película
function info (array, indice){
	
	document.getElementById("infoImg").innerHTML ="<img src="+array[indice].imagen+" class='img-rounded imagenes '>"

	console.log(indice);
	document.getElementById("tabla").innerHTML = "<tr><td>"+array[indice].director+"</td><td>"+array[indice].title+"</td><td>"+array[indice].release_date+"</td><td>"+array[indice].opening_crawl+"</td></tr>"
toggle();
}

// Código jQuery para que al presionar enter en el buscador sea como hacer click en el boton de busqueda.
$("#search").keyup(function(event){
    if(event.keyCode == 13){
        $("#buscador").click();
         window.location = "#filmSearch";
    }
});

// función para volver al página principal
function back(){
	$("#info").hide(1000);
	$("#contenedor").show(2000);
	$("#filmSearch").hide(1000);
}

// función para esconder la página principal y la de busqueda para mostrar la de info
function toggle (){

        $("#contenedor").hide(1000);    
        $("#info").show(2000);
        $("#filmSearch").hide(1000);
}
