(() => {
    'use strict';

    
    const contenido = document.querySelector('#tarjetas');
    const soltar_productos = document.getElementById('carrito');
    const pedido = document.getElementById('total_pedido');
    const footer = document.getElementById('footer');
    
    let img_seleccionada="";
    let articulo ="";
    let cantidad_articulo="";
    let precio_articulo="";
    let total_compra=0;

    let elemento_seleccionado="";

    let frutas = [
        {   
            id: 0,
            content: 'Kiwi verde al peso.',
            price: 3.89,
            image:'img/KIWIS.png'
        },
        {
            id: 1,
            content: 'Melocotón al peso.',
            price: 3.95,
            image:'img/melocotones.png'
        },
        {
            id: 2,
            content: 'Melón selección al peso.',
            price: 3.47,
            image:'img/melon.png'
        },
        {
            id: 3,
            content: 'Manzana golden al peso.',
            price: 1.75,
            image:'img/manzanas.png'
        },
        {
            id: 4,
            content: 'Paraguayo al peso.',
            price: 1.69,
            image:'img/paraguayos.png'
        },
        {
            id: 5,
            content: 'Sandía cuarto pieza al peso.',
            price:0.99,
            image:'img/sandia.png'
        },


        
    ];

    
    
    for (let valor of frutas) {
        
        contenido.innerHTML += `
        <article class="col-md-4 articulo_tarjeta${valor.id}" >

        <div class="card" style="width: 15rem;">
            <img src=${valor.image} id="tarjeta${valor.id}" class="card-img-top" draggable="true">
            <div class="card-body">
                <span id="precio_tarjeta${valor.id}">${valor.price}</span><span>€/Kg</span>
                <p class="card-text">${valor.content}</p>
                <div class="cantidad">
                    <button class="btn" id="restar_cantidad_${valor.id}">-</button>
                    <span id="mostrar_cantidad_tarjeta${valor.id}">100</span><span>g</span>
                    <button class="btn" id="sumar_cantidad_${valor.id}">+</button>
                </div>
                <p>Arrastrar imagen al carrito</p>
            </div>
        </div>
        
        </article>
		`;
      
    }

    soltar_productos.innerHTML=`<i class="fa fa-shopping-cart m-3"></i><span id="titulo_carrito">Mi carrito</span>`;
    pedido.innerHTML=`<p class="m-3">Total pedido:</p><span id="importe_pedido">0€</span><button class="btn">Tramitar pedido</button>`;
    
    
    footer.innerHTML=`
    <div class="row">
              <div class="col">

                <img src="img/logo.png" class="logo_footer">
                <h6><strong>Frutería Rosmarí</strong></h6>
                <ul class="list-inline">
                  <li class="list-inline-item footer-menu"><a href="index.html">Inicio</a></li>
                  <li class="list-inline-item footer-menu"><a href="#">Sobre mí</a></li>
                  <li class="list-inline-item footer-menu"><a href="#">Contacto</a></li>
                  <li class="list-inline-item footer-menu"><a href="#">Área de clientes</a></li>
                </ul>
                <ul class="list-inline">
                  <li class="list-inline-item"><a href="#">
                      <ion-icon name="logo-instagram"></ion-icon>
                    </a></li>
                  <li class="list-inline-item"><a href="#">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a></li>
                  <li class="list-inline-item"><a href="#">
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </a></li>
                  <li class="list-inline-item"><a href="#">
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a></li>
                  <li class="list-inline-item"><a href="#">
                      <ion-icon name="logo-youtube"></ion-icon>
                    </a></li>
                </ul>
      
      
                <small>&copy2020 All Rights Reserved. Created by Jorge Salazar Web</small>
              </div>
      
    </div>
            `;



    

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
        let articulo_seleccionado = document.createElement("article");
        articulo_seleccionado.classList.add("articulo_tarjeta"+ultima);
        soltar_productos.appendChild(articulo_seleccionado);
        
        
        
        img_seleccionada.setAttribute("draggable","false");
        articulo_seleccionado.appendChild(img_seleccionada);
        
        articulo_seleccionado.appendChild(cantidad_articulo);
        let simbolo_multiplicar = document.createElement("span");
        simbolo_multiplicar.innerHTML=" X ";
        articulo_seleccionado.appendChild(simbolo_multiplicar);
        articulo_seleccionado.appendChild(precio_articulo);
        let simbolo_igual = document.createElement("span");
        simbolo_igual.innerHTML=" = ";
        articulo_seleccionado.appendChild(simbolo_igual);

        let total = document.createElement("span");
        let operacion=0;
        operacion=(parseFloat((cantidad_articulo.textContent)/1000)*parseFloat(precio_articulo.textContent)).toFixed(2);
        operacion=parseFloat(operacion);
        
        total_compra+=operacion;
       
       

        let mostrar_suma_pedido=0;
        mostrar_suma_pedido=total_compra.toFixed(2);

        document.getElementById('importe_pedido').innerHTML=mostrar_suma_pedido+'€';
      
        total.innerHTML=operacion+'€';
        articulo_seleccionado.appendChild(total);

        let icono_papelera = document.createElement("span");
        icono_papelera.innerHTML = `<i id="papelera_${elemento_seleccionado}"class="fa fa-trash papelera"></i>`;
        articulo_seleccionado.appendChild(icono_papelera);
        contenido.removeChild(articulo);
        
        

        


        icono_papelera.addEventListener('click',(e)=>{

            const elemento_pulsado = e.target.id;
            
      
            let ultima=elemento_pulsado[elemento_pulsado.length-1];
            let devolver_producto= document.createElement("article");
            devolver_producto.classList.add("col-md-4");
            devolver_producto.classList.add("articulo_tarjeta"+frutas[ultima].id);

            contenido.appendChild(devolver_producto);
        
            devolver_producto.innerHTML = `
            
            <div class="card" style="width: 15rem;">
                <img src=${frutas[ultima].image} id="tarjeta${frutas[ultima].id}" class="card-img-top" draggable="true">
                <div class="card-body">
                    <span id="precio_tarjeta${frutas[ultima].id}">${frutas[ultima].price}</span><span>€/Kg</span>
                    <p class="card-text">${frutas[ultima].content}</p>
                    <div class="cantidad">
                        <button class="btn" id="restar_cantidad_${frutas[ultima].id}">-</button>
                        <span id="mostrar_cantidad_tarjeta${frutas[ultima].id}">100</span><span>g</span>
                        <button class="btn" id="sumar_cantidad_${frutas[ultima].id}">+</button>
                    </div>
                    <p>Arrastrar imagen al carrito</p>
                </div>
            </div>
            
            `;
           
            contenido.appendChild(devolver_producto);
            soltar_productos.removeChild(articulo_seleccionado);


            total_compra-=operacion;
            mostrar_suma_pedido=total_compra.toFixed(2);

            if(mostrar_suma_pedido<=0){mostrar_suma_pedido=0;}
            
            document.getElementById('importe_pedido').innerHTML=mostrar_suma_pedido+'€';



        });

        
        
    });


    

    


   


})();