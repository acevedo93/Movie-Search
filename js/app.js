
/*-----------------js---------//
 Hecho por:David Acevedo
 para:prueba EGO
 2017
//-----------------------------*/
(function(d){ 
    
  
let form = d.getElementById('form');
let container = d.getElementById('container-result');
 
let config = {
    apiKey:'2eef05c086fcf6d9c34d52f54f47812d', 
};
function msnErr (error){
    console.log(error);
}


form.addEventListener("submit", function(event){
    let search = d.getElementById('search').value;
    event.preventDefault();
    if(search != ''){
      $(container).empty();
        callAjax(search,config.apiKey);  
    }else{
     alert('Parece que no hay ninguna busqueda');
    }
})

function callAjax (busqueda,clave) {
    $.ajax({
        url :'https://api.themoviedb.org/3/search/movie?api_key='+clave+'&query='+busqueda,
        method:'GET',
        
        success : function(data){
            
             if(data.results === 0){
                 let errorScreen=d.createElement('p');
                 errorScreen.setAttribute('class','container-result');
                 errorScreen.innerHTML='No hay resultados para esta busqueda';
                 container.appendChild(errorScreen)
                 console.log(container);
             }else{
              for(let i = 0 ; i<data.results.length ; i++){
                    let  title = data.results[i].title
                    let release = data.results[i].release_date;
                    let img = data.results[i].poster_path;
                    show(title,release,img);
                        
                    }
             }
        },
        error: function(data){
            msnErr('existe un problema con la llamada');
        }

    });
}

function show (title ,  release ,img) {
    
    let tituloTag = d.createElement('h2');
        tituloTag.setAttribute('class','tittle');
        tituloTag.innerHTML=title;
    let releaseTag = d.createElement('p');
        releaseTag.setAttribute('class', 'release');
        releaseTag.innerHTML = release;

    let imgTag = d.createElement('img');
        imgTag.setAttribute('src',"https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+ img);
        imgTag.setAttribute('class','movie-img')

    let resultMovie= d.createElement('div');
        resultMovie.setAttribute('class','result-movie');
        resultMovie.appendChild(imgTag);
    
    let descriptionMovie = d.createElement('div');
        descriptionMovie.setAttribute('class','movie-description');
        descriptionMovie.appendChild(tituloTag);
        descriptionMovie.appendChild(releaseTag);
    resultMovie.appendChild(descriptionMovie);
    container.appendChild(resultMovie);
    $(container).hide().fadeIn();
  
    

}


})(document);




