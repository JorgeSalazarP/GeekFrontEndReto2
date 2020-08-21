(() => {
    'use strict';

    
    const contenido = document.querySelector('#tarjetas');
    const soltar_productos = document.getElementById('carrito');
    let img_seleccionada="";
    let articulo ="";
    let cantidad_articulo="";
    let precio_articulo="";
    let total_compra=0;
    let elemento_seleccionado="";

    let frutas = [
        {   
            id: 0,
            content: 'Kiwi verde al peso (peso aproximado de la unidad 130g).',
            price: 3.89,
            image:'img/KIWIS.png'
        },
        {
            id: 1,
            content: 'Melocotón selección al peso (peso aproximado de la unidad 150g).',
            price: 3.95,
            image:'img/melocotones.png'
        },
        {
            id: 2,
            content: 'Melón piel de sapo pieza 3,5kg peso aproximado.',
            price: 3.47,
            image:'img/melon.png'
        },
        {
            id: 3,
            content: 'Manzana golden al peso (peso aproximado de la unidad 200g).',
            price: 1.75,
            image:'img/manzanas.png'
        },
        {
            id: 4,
            content: 'Paraguayo al peso (peso aproximado de la unidad 130g)',
            price: 1.69,
            image:'img/paraguayos.png'
        },
        {
            id: 5,
            content: 'Sandía cuarto pieza 1,5 kg peso aproximado',
            price:0.99,
            image:'img/sandia.png'
        },
    ];

    
    
    for (let valor of frutas) {
        
        contenido.innerHTML += `
        <article class="col-md-4 articulo_tarjeta${valor.id}" >

        <div class="card" style="width: 18rem;">
            <img src=${valor.image} id="tarjeta${valor.id}" class="card-img-top" draggable="true">
            <div class="card-body">
                <span id="precio_tarjeta${valor.id}">${valor.price}</span><span>€/Kg</span>
                <p class="card-text">${valor.content}</p>
                <div class="cantidad">
                    <button class="btn" id="restar_cantidad_${valor.id}">-</button>
                    <span id="mostrar_cantidad_tarjeta${valor.id}">100</span><span>g</span>
                    <button class="btn" id="sumar_cantidad_${valor.id}">+</button>
                </div>
                <p>Arrastrar la imagen al carrito de compra</p>
            </div>
        </div>
        
        </article>
		`;
      
    }
    
 
    document.addEventListener('dragstart',(e)=>{

        img_seleccionada = document.getElementById(e.target.id);
        articulo = document.querySelector('.articulo_'+ e.target.id);
        cantidad_articulo= document.querySelector('#mostrar_cantidad_'+e.target.id);
        precio_articulo= document.querySelector('#precio_'+e.target.id);
        elemento_seleccionado=e.target.id;

      
       
    });


    document.addEventListener('click',(e)=>{
       
        const elemento_pulsado = e.target.id;
        const nombre_idboton = "sumar_cantidad_";
        const pulsado_boton_sumar = elemento_pulsado.indexOf(nombre_idboton);
        const nombre_idboton2 = "restar_cantidad_";
        const pulsado_boton_restar = elemento_pulsado.indexOf(nombre_idboton2);
        
        if (pulsado_boton_sumar !== -1){
            
            const ultima=elemento_pulsado[elemento_pulsado.length-1];
            let numero_veces=parseInt(document.querySelector('#mostrar_cantidad_tarjeta'+ultima).textContent);
            numero_veces+=50;
            document.querySelector('#mostrar_cantidad_tarjeta'+ultima).innerHTML=numero_veces;

        }
        else if(pulsado_boton_restar !== -1){

            const ultima=elemento_pulsado[elemento_pulsado.length-1];
            let numero_veces=parseInt(document.querySelector('#mostrar_cantidad_tarjeta'+ultima).textContent);
            numero_veces===100 ? numero_veces=100 : numero_veces-=50;
            document.querySelector('#mostrar_cantidad_tarjeta'+ultima).innerHTML=numero_veces;

        }
        
        
    


    });
    
    soltar_productos.addEventListener('dragover',(e)=>{

        e.preventDefault();
    });
    
    soltar_productos.addEventListener('drop',(e)=>{
        e.preventDefault();     
        
        let ultima=elemento_seleccionado[elemento_seleccionado.length-1];
        console.log(ultima);
        let crear_articulo_seleccionado = document.createElement("article");
        crear_articulo_seleccionado.classList.add("articulo_tarjeta"+ultima);
        soltar_productos.appendChild(crear_articulo_seleccionado);
        
        
        
        img_seleccionada.setAttribute("draggable","false");
        crear_articulo_seleccionado.appendChild(img_seleccionada);
        
        crear_articulo_seleccionado.appendChild(cantidad_articulo);
        let simbolo_multiplicar = document.createElement("span");
        simbolo_multiplicar.innerHTML=" X ";
        crear_articulo_seleccionado.appendChild(simbolo_multiplicar);
        crear_articulo_seleccionado.appendChild(precio_articulo);
        let simbolo_igual = document.createElement("span");
        simbolo_igual.innerHTML=" = ";
        crear_articulo_seleccionado.appendChild(simbolo_igual);

        let total = document.createElement("span");
        let operacion=(parseFloat((cantidad_articulo.textContent)/1000)*parseFloat(precio_articulo.textContent)).toFixed(2);
        
        total.innerHTML=operacion+'€';
        crear_articulo_seleccionado.appendChild(total);
        total_compra+=operacion;
        let icono_papelera = document.createElement("span");
        icono_papelera.innerHTML = `<i id="papelera_${elemento_seleccionado}"class="fa fa-trash"></i>`;
        crear_articulo_seleccionado.appendChild(icono_papelera);
        contenido.removeChild(articulo);

        icono_papelera.addEventListener('click',(e)=>{

            const elemento_pulsado = e.target.id;
            console.log(elemento_pulsado);
      
            let ultima=elemento_pulsado[elemento_pulsado.length-1];
            console.log(ultima);
            let devolver_producto= document.createElement("article");
            devolver_producto.classList.add("col-md-4");
            devolver_producto.classList.add("articulo_tarjeta"+frutas[ultima].id);

            contenido.appendChild(devolver_producto);
        
            devolver_producto.innerHTML = `
            
            <div class="card" style="width: 18rem;">
                <img src=${frutas[ultima].image} id="tarjeta${frutas[ultima].id}" class="card-img-top" draggable="true">
                <div class="card-body">
                    <span id="precio_tarjeta${frutas[ultima].id}">${frutas[ultima].price}</span><span>€/Kg</span>
                    <p class="card-text">${frutas[ultima].content}</p>
                    <div class="cantidad">
                        <button class="btn" id="restar_cantidad_${frutas[ultima].id}">-</button>
                        <span id="mostrar_cantidad_tarjeta${frutas[ultima].id}">100</span><span>g</span>
                        <button class="btn" id="sumar_cantidad_${frutas[ultima].id}">+</button>
                    </div>
                    <p>Arrastrar la imagen al carrito de compra</p>
                </div>
            </div>
            
            `;
           
            contenido.appendChild(devolver_producto);
            soltar_productos.removeChild(crear_articulo_seleccionado);




        });

        
        
    });


    

    


   


})();