
const select_st_yr  = document.querySelector('.start_year')
const select_ed_yr  = document.querySelector('.end_year')
const div_result    = document.querySelector('.result')


function getCookie(name) {

    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {                
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {                    
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {                        
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function  get_years(){
    fetch('https://inflation-calculator-arg-x4iu.onrender.com/api/years/')        
    .then(response => response.json())
    .then(function(data){
        var list = data         

        for (var i in list){
            var item = `<option value="${data[i].year}">${data[i].year}</option>`

            select_st_yr.innerHTML += item  
            select_ed_yr.innerHTML += item  
        }
    })  
}

get_years()



function send_data(){ 
    
    if(div_result !== null){            
        while (div_result.hasChildNodes()){                
            div_result.removeChild(div_result.lastChild);
    }}
       
    
    const start_year = select_st_yr.value
    const end_year   = select_ed_yr.value 
    const amount     = document.querySelector('#amount').value 

    validate_data(start_year,end_year,amount)

    const content  = { 'start_year': start_year,'end_year': end_year,'amount': amount }   
   

   

    

    fetch('https://inflation-calculator-arg-x4iu.onrender.com/',{                            
        method:'POST',
        headers:{
            'Content-Type':'application/json',                
            'X-CSRFToken' : getCookie('csrftoken')          
        },            
        body : JSON.stringify({'content':content}) 
        
    })

    .then((response)=>{       
        
                       
        return response.json();

    }) 

    .then(result => {
        show_result(result)
    })         
}



function validate_data(start_year,end_year,amount){

    

    if (start_year > end_year){
        
        var err = `
        <div class="alert alert-danger" role="alert">
            <h5>¡Cuidado! La fecha inicial no puede ser mayor a la final.</h5>  
        </div>` 

        div_result.innerHTML += err                
        return preventDefault();               
    }
    
    if ( amount < 0 || amount == 0 || amount == null || amount == ""  ){       
        
        var err = `
        <div class="alert alert-danger" role="alert">
            <h5>Porfavor, igrese un monto valido.</h5>  
        </div>` 

        div_result.innerHTML += err                
        return preventDefault();   
    }           
}



function show_result(result){
        
    var new_mt = `    
    <div class="alert alert-light text-center" role="alert">

        <h4 style='padding: 1rem 0 3rem; color: black;'>

            <strong>$ ${result.amount}</strong> en ${result.year1} 
            =
            <strong>$ ${result.new_amount}</strong> en ${result.year2} 

        </h4>

        <p style='font-size: 1.1rem'>
            La tasa de inflación en Argentina entre ${result.year1} y ${result.year2} ha sido de un ${result.cumulative_inflation}%, 
            lo que se traduce en un incremento total de $${result.new_amount}. 
            <strong>Esto significa que ${result.amount} pesos en ${result.year1}  equivalen a ${result.new_amount} pesos en ${result.year2}.</strong>
            En otras palabras, el poder adquisitivo de $${result.amount} en ${result.year1} equivale a $${result.new_amount} en ${result.year2} .
        </p>

    </div>`;

    div_result.innerHTML += new_mt

    var explain = `


    <div class="relevant_data"> 
    <p>Datos a tener en cuenta: </p>        
        <table class="table"> 
            <thead>
                <tr>
                    <th scope="col"><strong>Indicador</strong></th>
                    <th scope="col"><strong>Valor</strong></th>                    
                </tr>
            </thead>
            <tbody>
            <tr>                
                <td><strong>CPI ${result.year1}</strong></td>
                <td>${result.CPI1}</td>                
            </tr>
            <tr>                
                <td><strong>CPI ${result.year2}</strong></td>
                <td>${result.CPI2}</td>                
            </tr>      
            <tr>                
                <td><strong>Inflación Acumulada</strong> <sub class="text-xs">(${result.year1}-${result.year2})</sub></td>
                <td>${result.cumulative_inflation}%</td>                
            </tr>          
            </tbody>
        </table>
        
    </div> 
    
    <h4>¿Cómo calcular el valor del dinero en el tiempo con datos de inflación?</h4>

    <h5>Fórmula IPC</h5>

    <p>
        Hay varias formas de calcular el valor del dinero en el tiempo. Según los datos disponibles,
        los resultados se pueden obtener utilizando la fórmula del índice de precios al consumidor 
        (IPC).
    </p>    

    <p>    
        Para obtener los valores equivalentes en poder adquisitivo entre ${result.year1} y ${result.year2}, utilicamos los valores del IPC correspondientes:
    </p>

    <div class="formula"> 

        <div class="container">
            <div class="row">
            <div class="col ">
                <span class="fdn" style="padding-right:1rem">Valor<sub class="text-xs">${result.year1}</sub></span>  × 
            </div>
            <div class="col-3">
                <div class="fraction">
                    <span class="fup">CPI<sub class="text-xs">${result.year2}</sub></span><span class="bar">/</span><span class="fdn">CPI<sub class="text-xs">${result.year1}</sub></span> 
                </div> 
            </div>
            <div class="col res">
                <span class="mx-4 ">=</span> <h6>Valor<sub class="text-xs">${result.year2}</sub></h6> 
            </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
            <div class="col ">
                ${result.amount} × 
            </div>
            <div class="col">
                <div class="fraction">
                    <span class="fup">${result.CPI2}</span><span class="bar">/</span><span class="fdn">${result.CPI1}</span> 
                </div>
            </div>
            <div class="col res">
                <span class="mx-4">=</span> <h6>${result.new_amount}</h6>
            </div>
            </div>
        </div>    
    
    
    </div>       
        
    `;    

    div_result.innerHTML += explain

    var source =`
    <section class="source pb-4 ">
        <h6>Fuentes:</h6>
        <p>Los datos de inflación anual son extraidos de  
        <a href="https://data.worldbank.org/indicator/NY.GDP.DEFL.KD.ZG?locations=AR" target="_blank">Inflation, GDP deflator: The World Bank</a></li>.
        Los datos del índice de precios al consumidor posteriores a 2021 son extraídos del <a href="https://www.indec.gob.ar/">INDEC</a>.
        <br>
        Los datos del índice de precios al consumidor anteriores fueron extraídos de nuestras propias busquedas.   
        </p>
    </section>` 


    div_result.innerHTML += source


}

