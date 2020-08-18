(() => {
    'use strict';

    
    const contenido = document.querySelector('#tarjetas');
    const soltar_productos = document.getElementById('carrito');
    let img_seleccionada="";
    let articulo ="";
    let cantidad_0=100;
    let cantidad_1=100;
    let cantidad_2=100;
    let cantidad_3=100;
    let cantidad_4=100;
    let cantidad_5=100;

    let frutas = [
        {   
            id: "0",
            content: 'Kiwi verde al peso (peso aproximado de la unidad 130g).',
            price: 3.89,
            imagen:'img/KIWIS.png'
        },
        {
            id: "1",
            content: 'Melocotón selección al peso (peso aproximado de la unidad 150g).',
            price: 3.95,
            imagen:'img/melocotones.png'
        },
        {
            id: "2",
            content: 'Melón piel de sapo pieza 3,5kg peso aproximado.',
            price: 3.47,
            imagen:'img/melon.png'
        },
        {
            id: "3",
            content: 'Manzana golden al peso (peso aproximado de la unidad 200g).',
            price: 1.75,
            imagen:'img/manzanas.png'
        },
        {
            id: "4",
            content: 'Paraguayo al peso (peso aproximado de la unidad 130g)',
            price: 1.69,
            imagen:'img/paraguayos.png'
        },
        {
            id: "5",
            content: 'Sandía cuarto pieza 1,5 kg peso aproximado',
            price:0.99,
            imagen:'img/sandia.png'
        },
    ];

    for (let valor of frutas) {
        
        contenido.innerHTML += `
        <article class="col-md-4" id="articulo_tarjeta${valor.id}" >

        <div class="card" style="width: 18rem;">
            <img src=${valor.imagen} id="tarjeta${valor.id}" class="card-img-top draggable="true">
            <div class="card-body">
                <span class="precio">${valor.price}€/Kg</span>
                <p class="card-text">${valor.content}</p>
                <div id="cantidad">
                    <button class="btn restar_cantidad_${valor.id}">-</button>
                    <span id="mostrar_cantidad${valor.id}">100</span>     
                    <button class="btn sumar_cantidad_${valor.id}">+</button>
                </div>
                <p>Arrastrar al carrito de compra</p>
            </div>
        </div>
        
        </article>
		`;
      
    }
 
    
    
    document.addEventListener('dragstart',(e)=>{

       
        img_seleccionada = document.getElementById(e.target.id);
        articulo = document.querySelector('#articulo_'+ e.target.id);
        
    });

    
    soltar_productos.addEventListener('dragover',(e)=>{

        e.preventDefault();
    });
    
    soltar_productos.addEventListener('drop',(e)=>{
        e.preventDefault();        
        soltar_productos.appendChild(img_seleccionada);
        articulo.style.display="none";
       
        
         
    });



    const boton_sumar_0=document.querySelector('.sumar_cantidad_0');
    const boton_sumar_1=document.querySelector('.sumar_cantidad_1');
    const boton_sumar_2=document.querySelector('.sumar_cantidad_2');
    const boton_sumar_3=document.querySelector('.sumar_cantidad_3');
    const boton_sumar_4=document.querySelector('.sumar_cantidad_4');
    const boton_sumar_5=document.querySelector('.sumar_cantidad_5');

    boton_sumar_0.addEventListener('click',()=>{

    
        cantidad_0+=50;
        document.querySelector('#mostrar_cantidad0').innerHTML=cantidad_0;
        
    });

    boton_sumar_1.addEventListener('click',()=>{

        cantidad_1+=50;
        document.querySelector('#mostrar_cantidad1').innerHTML=cantidad_1;
        
    });

    boton_sumar_2.addEventListener('click',()=>{

        cantidad_2+=50;
        document.querySelector('#mostrar_cantidad2').innerHTML=cantidad_2;
        
    });

    boton_sumar_3.addEventListener('click',()=>{

        cantidad_3+=50;
        document.querySelector('#mostrar_cantidad3').innerHTML=cantidad_3;
        
    });


    boton_sumar_4.addEventListener('click',()=>{

        cantidad_4+=50;
        document.querySelector('#mostrar_cantidad4').innerHTML=cantidad_4;
        
    });
    boton_sumar_5.addEventListener('click',()=>{

        cantidad_5+=50;
        document.querySelector('#mostrar_cantidad5').innerHTML=cantidad_5;
        
    });

    const boton_restar_0=document.querySelector('.restar_cantidad_0');
    const boton_restar_1=document.querySelector('.restar_cantidad_1');
    const boton_restar_2=document.querySelector('.restar_cantidad_2');
    const boton_restar_3=document.querySelector('.restar_cantidad_3');
    const boton_restar_4=document.querySelector('.restar_cantidad_4');
    const boton_restar_5=document.querySelector('.restar_cantidad_5');

    boton_restar_0.addEventListener('click',()=>{

        if (cantidad_0===100) {

            cantidad_0=100;
            
        }
        else{
            cantidad_0-=50;
            document.querySelector('#mostrar_cantidad0').innerHTML=cantidad_0;
        }
        
        

    });
    
    boton_restar_1.addEventListener('click',()=>{

        if (cantidad_1===100) {

            cantidad_1=100;
            
        }
        else{
            cantidad_1-=50;
            document.querySelector('#mostrar_cantidad1').innerHTML=cantidad_1;
        
        }
        
        

    });

    boton_restar_2.addEventListener('click',()=>{

        
        if (cantidad_2===100) {

            cantidad_2=100;
            
        }
        else{
            cantidad_2-=50;
            document.querySelector('#mostrar_cantidad2').innerHTML=cantidad_2;
        
        }
        
        

    });
    boton_restar_3.addEventListener('click',()=>{


        if (cantidad_3===100) {

            cantidad_3=100;
            
        }
        else{
            cantidad_3-=50;
            document.querySelector('#mostrar_cantidad3').innerHTML=cantidad_3;
        
        }
        


    });

    boton_restar_4.addEventListener('click',()=>{

        if (cantidad_4===100) {

            cantidad_4=100;
            
        }
        else{
            cantidad_4-=50;
            document.querySelector('#mostrar_cantidad4').innerHTML=cantidad_4;
        
        }
        

       
        

    });

    boton_restar_5.addEventListener('click',()=>{

        if (cantidad_5===100) {

            cantidad_5=100;
            
        }
        else{
            cantidad_5-=50;
            document.querySelector('#mostrar_cantidad5').innerHTML=cantidad_5;
        
        }
        
        

    });

    /*fetch('js/frutas.json')
        .then(data=>data.json())
        .then(datos =>{
            
            datos_tarjetas(datos);

        })

    
    function datos_tarjetas(datos){

        for (let valor of datos) {

            contenido.innerHTML += `
            <article class="col-md-4" >
    
            <div class="card" style="width: 18rem;" draggable="true">
                <img src=${valor.imagen} class="card-img-top">
                <div class="card-body">
                    <span class="precio">${valor.price}€/Kg</span>
                    <p class="card-text">${valor.content}</p>
                    <div id="cantidad">
                        <button class="btn restar_cantidad">-</button>
                        <span>100</span>     
                        <button class="btn sumar_cantidad">+</button>
                    </div>
                    <p>Arrastrar al carrito de compra</p>
                </div>
            </div>
            
            </article>
            `;
    
    
        }
    }*/
    


   


})();