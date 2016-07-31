//BQChJs_3xtZ1NMWHrvNGXc_XSGovP_XeePXRmuS

var opcionBusqueda = "cancion";
var ahoraSuena = null;
var playlist = [];


function doClickResultados(e) {
    e.preventDefault();
    mostrarResultados();
}

function mostrarResultados() {
    $("#optResultados").addClass("active");
    $("#optRecomendaciones").removeClass("active");
    $("#optAhoraSuena").removeClass("active");

    $("#divResultados").show();
    $("#divRecomendaciones").hide();
    $("#divAhoraSuena").hide();
}

function doClickRecomendaciones(e) {
    e.preventDefault();
    mostrarRecomendaciones();
    obtenerRecomendaciones();
}

function mostrarRecomendaciones() {
    $("#optResultados").removeClass("active");
    $("#optRecomendaciones").addClass("active");
    $("#optAhoraSuena").removeClass("active");

    $("#divResultados").hide();
    $("#divRecomendaciones").show();
    $("#divAhoraSuena").hide();
}

function doClickAhoraSuena(e) {
    e.preventDefault();
    mostrarAhoraSuena();
    obtenerAhoraSuena();
}

function mostrarAhoraSuena() {
    $("#optResultados").removeClass("active");
    $("#optRecomendaciones").removeClass("active");
    $("#optAhoraSuena").addClass("active");

    $("#divResultados").hide();
    $("#divRecomendaciones").hide();
    $("#divAhoraSuena").show();
}

function doClickCancion() {
    opcionBusqueda = "cancion";
    $("#btnTipoBusqueda").text("Canción");
}

function doClickAlbum() {
    opcionBusqueda = "album";
    $("#btnTipoBusqueda").text("Album");
}

function doClickArtista() {
    opcionBusqueda = "artista";
    $("#btnTipoBusqueda").text("Artista");
}


function crearItemCancion(resultadoCancion, fuente, imagen) {
    var urlImagen = "http://placehold.it/400x400";
    switch(fuente) {
        case "track":
            if (resultadoCancion.album.images != null && resultadoCancion.album.images.length > 0) {
                urlImagen = resultadoCancion.album.images[0].url;
            }
        break;
        case "artista":
            urlImagen = imagen;
            break;
        case "album":
            urlImagen = imagen;
            break;
    }

    var bloqueHTML = '<div class="row item-resultado">'+
                    '<div class="col-xs-4">'+
                        '<img src="' +  urlImagen + '" class="img-responsive">'+
                    '</div>'+
                    '<div class="col-xs-8">'+
                        '<p class="cancion">' + resultadoCancion.name + '</p>'+
                        '<p class="album">' + resultadoCancion.album.name + '</p>'+
                        '<p class="artista">' + resultadoCancion.artists[0].name + '</p>'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<button class="btn btn-default btnAgregarReproduccion" type="button" idtrack="' + resultadoCancion.id + '">'+
                                   '<i class="fa fa-plus" aria-hidden="true"></i>'+
                                '</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    return bloqueHTML;
}

function crearItemAhoraSuena(cancion) {
    var urlImagen = "http://placehold.it/400x400";
    if (cancion.album.images != null && cancion.album.images.length > 0) {
        urlImagen = cancion.album.images[0].url;
    }
    var bloqueHTML = '<div class="row item-resultado">'+
                    '<div class="col-xs-4">'+
                        '<img src="' + urlImagen + '" class="img-responsive">'+
                    '</div>'+
                    '<div class="col-xs-8">'+
                        '<p class="cancion">' + cancion.name + '</p>'+
                        '<p class="album">' + cancion.album.name + '</p>'+
                        '<p class="artista">' + cancion.artists[0].name + '</p>'+
                        '<p class="artista">' + formatearMilisegundos(parseInt(cancion.duration_ms)) + '</p>' +
                    '</div>'+
                '</div>';
    return bloqueHTML;
}

function crearItemArtista(resultadoArtista) {
    var urlImagen = "http://placehold.it/400x400";
    if (resultadoArtista.images != null && resultadoArtista.images.length > 0) {
        urlImagen = resultadoArtista.images[0].url;
    }

    var bloqueHTML = '<div class="row item-resultado">'+
                    '<div class="col-xs-4">'+
                        '<img src="' +  urlImagen + '" class="img-responsive">'+
                    '</div>'+
                    '<div class="col-xs-8">'+
                        '<p class="cancion"><a href="#" class="link-artista" idartista="' + resultadoArtista.id + '" src="' +  urlImagen + '">' + resultadoArtista.name + '</a></p>'+
                    '</div>'+
                '</div>';
    return bloqueHTML;
}

function crearItemAlbum(resultadoAlbum) {
    var urlImagen = "http://placehold.it/400x400";
    if (resultadoAlbum.images != null && resultadoAlbum.images.length > 0) {
        urlImagen = resultadoAlbum.images[0].url;
    }
    var bloqueHTML = '<div class="row item-resultado">'+
                    '<div class="col-xs-4">'+
                        '<img src="' +  urlImagen + '" class="img-responsive">'+
                    '</div>'+
                    '<div class="col-xs-8">'+
                        '<p class="cancion"><a href="#" class="link-album" idalbum="' + resultadoAlbum.id + '" src="' +  urlImagen + '">' + resultadoAlbum.name + '</a></p>'+
                    '</div>'+
                '</div>';
    return bloqueHTML;
}

function doClickPlay(uriTrack) {
    for(i in playlist) {
        if (playlist[i].uri == uriTrack) {
            ahoraSuena = playlist[i];
            break;
        }
    }
    $("#containerPlayer").empty();
    $("#containerPlayer").append(
        '<iframe  id="frPlayer" src="https://embed.spotify.com/?uri=' + uriTrack + '" width="100%" frameborder="0" allowtransparency="true"></iframe>'
    );
    obtenerAhoraSuena();
}

function crearItemReproduccion(cancion) {
    var urlImagen = "http://placehold.it/400x400";
    if (cancion.album.images != null && cancion.album.images.length > 0) {
        urlImagen = cancion.album.images[0].url;
    }

    var bloqueHTML = '<div class="row item-reproduccion">' +
                    '<div class="col-xs-4">'+
                        '<img src="' + urlImagen + '" class="img-responsive">'+
                    '</div>'+
                    '<div class="col-xs-8">'+
                        '<p class="cancion">' + cancion.name + '</p>'+
                        '<p class="album">' + cancion.album.name + '</p>'+
                        '<p class="artista">' + cancion.artists[0].name + '</p>'+
                        '<div class="row">'+
                            '<div class="col-md-12">'+
                                '<button class="btn btn-default" type="button" id="btnPlay" idtrack="' + cancion.id + '" onclick="doClickPlay(\'' + cancion.uri + '\');">'+
                                    '<i class="fa fa-play" aria-hidden="true"></i>'+
                               '</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    
    return bloqueHTML;
}

function agregarTrack(idtrack) {
    $.ajax({
        url: 'https://api.spotify.com/v1/tracks/' + idtrack ,
        data: {
        },
        success: function (response) {
            playlist.push(response);
            window.localStorage.setItem("playlist", JSON.stringify(playlist));
            $("#contenedorReproduccion").append(crearItemReproduccion(response));
        }
    });
}

function doClickAgregarReproduccion() {
    $(this).hide();
    agregarTrack($(this).attr("idtrack"));
}

function obtenerRecomendaciones() {
    $("#contenedorRecomendaciones").empty();
    var idsArtistas = [];
    if (playlist.length > 0) {
        for (i in playlist) {
            for (j in playlist[i].artists) {
                idsArtistas.push(playlist[i].artists[j].id);
            }
        }

        for (i in idsArtistas) {
            $.ajax({
                url: 'https://api.spotify.com/v1/artists/' + idsArtistas[i] + '/related-artists',
                data: {
                },
                success: function (response) {
                    for(i in response.artists) {
                        $("#contenedorRecomendaciones").append(crearItemArtista(response.artists[i]));
                    }
                    $(".link-artista").click(doClickLinkArtista);
                }
            });
        }
    } else {
        $("#contenedorRecomendaciones").append("<h3>Escucha canciones para obtener recomendaciones</h3>");
    }

}

function obtenerAhoraSuena() {
    $("#contenedorAhoraSuena").empty();
    if (ahoraSuena != null) {
        $("#contenedorAhoraSuena").append(crearItemAhoraSuena(ahoraSuena));
    } else {
        $("#contenedorAhoraSuena").append("<h3>No se ha reproducido ninguna canción</h3>");
    }
    
}

function buscarCancionesAlbum(idalbum, nombreAlbum, imagenAlbum) {
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + idalbum + '/tracks',
        data: {
            /*q: query,
            type: 'track'*/
        },
        success: function (response) {
            for(i in response.items) {
                response.items[i].album = {
                    name : nombreAlbum
                };
                $("#contenedorResultados").append(crearItemCancion(response.items[i],"album",imagenAlbum));
            }
            $(".btnAgregarReproduccion").click(doClickAgregarReproduccion);
        }
    });
}

function buscarCancionesArtista(idartista,imagenAlbum) {
    $.ajax({
        url: 'https://api.spotify.com/v1/artists/' + idartista + '/top-tracks?country=ES',
        data: {
            /*q: query,
            type: 'track'*/
        },
        success: function (response) {
            console.log(response);
            for(i in response.tracks) {
                $("#contenedorResultados").append(crearItemCancion(response.tracks[i],"artista",imagenAlbum));
            }
            $(".btnAgregarReproduccion").click(doClickAgregarReproduccion);
        }
    });
}

function buscarCanciones(query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track'
        },
        success: function (response) {
            for(i in response.tracks.items) {
                $("#contenedorResultados").append(crearItemCancion(response.tracks.items[i],"track"));
            }
            $(".btnAgregarReproduccion").click(doClickAgregarReproduccion);
        }
    });
}

function buscarArtistas(query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'artist'
        },
        success: function (response) {
            for(i in response.artists.items) {
                $("#contenedorResultados").append(crearItemArtista(response.artists.items[i]));
            }
            $(".link-artista").click(doClickLinkArtista);
        }
    });
}

function buscarAlbumes(query) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'album'
        },
        success: function (response) {
            for(i in response.albums.items) {
                $("#contenedorResultados").append(crearItemAlbum(response.albums.items[i]));
            }
            $(".link-album").click(doClickLinkAlbum);
        }
    });
}

function doClickBuscar() {
    if ($("#txtBusqueda").val() && $("#txtBusqueda").val() != "") {
        mostrarResultados();
        $("#contenedorResultados").empty();
        switch(opcionBusqueda) {
            case "cancion" :
                buscarCanciones($("#txtBusqueda").val());
                break;
            case "artista" :
                buscarArtistas($("#txtBusqueda").val());
                break;
            case "album" :
                buscarAlbumes($("#txtBusqueda").val());
                break;
        }
    } else {
        alert('Ingresa un texto para buscar');
    }
    
}

function doClickLinkArtista(e) {
    $("#contenedorResultados").empty();
    mostrarResultados();
    buscarCancionesArtista($(this).attr('idartista'),$(this).attr("src"));
}

function doClickLinkAlbum(e) {
    $("#contenedorResultados").empty();
    buscarCancionesAlbum($(this).attr('idalbum'), $(this).text(),$(this).attr("src"));
}

function formatearMilisegundos( ms ) {
    var segundos = ms / 1000;
    var horas = parseInt( segundos / 3600 ); 
    segundos = segundos % 3600;
    var minutos = parseInt( segundos / 60 );
    segundos = parseInt(segundos % 60);
    if (horas > 0) {
        return "" + horas + ":" + minutos + ":" +segundos;
    } else {
        return "" + minutos + ":" +segundos;
    }
}

function inicializar() {
    opcionBusqueda = "cancion";

    $('#ex1').slider({
        formatter: function(value) {
            return 'Volumen: ' + value;
        }
    });
    $("#optResultados").click(doClickResultados);
    $("#optRecomendaciones").click(doClickRecomendaciones);
    $("#optAhoraSuena").click(doClickAhoraSuena);
    $("#btnCancion").click(doClickCancion);
    $("#btnAlbum").click(doClickAlbum);
    $("#btnArtista").click(doClickArtista);
    $("#btnBuscar").click(doClickBuscar);

    $("#divRecomendaciones").hide();
    $("#divAhoraSuena").hide();

    if(window.localStorage.getItem("playlist") != null) {
        playlist = JSON.parse(window.localStorage.getItem("playlist"));
        if (playlist.length && playlist.length > 0) {
            for (i in playlist) {
                $("#contenedorReproduccion").append(crearItemReproduccion(playlist[i]));
            }
        }
    }
}

$(function () {
    inicializar();
});