(() => {
    'use strict';

    
    const contenido = document.querySelector('#tarjetas');
    const soltar_productos = document.getElementById('carrito');
    var img_seleccionada="";

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
        <article class="col-md-4" >

        <div class="card" style="width: 18rem;">
            <img src=${valor.imagen} id="tarjeta${valor.id}" class="card-img-top draggable="true">
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
 
    
    
    document.addEventListener('dragstart',(e)=>{

        e.dataTransfer.setData('text/plain',e.target.id);
        img_seleccionada = document.getElementById(e.target.id);
        
    });

    
    soltar_productos.addEventListener('dragover',(e)=>{

        e.preventDefault();



    });
    
    soltar_productos.addEventListener('drop',(e)=>{
        e.preventDefault();
        console.log("drop");
        console.log(img_seleccionada);
      //  const elemento = document.getElementById(e.getElementById);
         soltar_productos.appendChild(arrastrar_productos.removeChild(img_seleccionada));

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