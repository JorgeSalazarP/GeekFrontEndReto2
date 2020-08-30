(() => {

'use strict';

/**************VARIABLES*********************/

    let img_seleccionada = "";
    let articulo = "";
    let cantidad_articulo = "";
    let precio_articulo = "";
    let total_compra = 0;
    let mostrar_suma_pedido = 0;
    let elemento_seleccionado = "";

    let frutas = [
        {
            id: 0,
            content: 'Kiwi verde al peso.',
            price: 3.89,
            image: 'img/KIWIS.png'
        },
        {
            id: 1,
            content: 'Melocotón al peso.',
            price: 3.95,
            image: 'img/melocotones.png'
        },
        {
            id: 2,
            content: 'Melón selección al peso.',
            price: 3.47,
            image: 'img/melon.png'
        },
        {
            id: 3,
            content: 'Manzana golden al peso.',
            price: 1.75,
            image: 'img/manzanas.png'
        },
        {
            id: 4,
            content: 'Paraguayo al peso.',
            price: 1.69,
            image: 'img/paraguayos.png'
        },
        {
            id: 5,
            content: 'Sandía pieza al peso.',
            price: 0.99,
            image: 'img/sandia.png'
        },



    ];

/******************** CREAMOS LOS ELEMENTOS**********************************/

/*************CREAMOS LOS PRODUCTOS DE FORMA DINÁMICA ********************/
const contenido = document.querySelector('#tarjetas');
    for (let valor of frutas) {

        contenido.innerHTML += `
        <article class="col-md-5 col-lg-4 articulo_tarjeta${valor.id}" >

        <div class="card" style="width: 15rem;">
            <img src=${valor.image} id="tarjeta${valor.id}" class="card-img-top" draggable="true">
            <div class="card-body">
                <span id="precio_tarjeta${valor.id}">${valor.price}</span><span>€/kg</span>
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
    /**************CREAMOS EL CARRITO Y EL TOTAL PEDIDO*************************************** */
    const soltar_productos = document.getElementById('carrito');
    const pedido = document.getElementById('total_pedido');

    soltar_productos.innerHTML = `<i class="fa fa-shopping-cart m-3"></i><span id="titulo_carrito">Mi carrito</span>`;
    pedido.innerHTML = `<p class="m-3">Total pedido:</p><span id="importe_pedido">0€</span><button class="btn btn-lila">Tramitar pedido</button>`;



/******************CREAMOS SECCIÓN NUESTRO EQUIPO, CONECTAMOS A UNA API UTILIZANDO FETCH*******/
let equipo_API=document.querySelector(".equipo_usuarios");

fetch('https://reqres.in/api/users/')
    .then(data=>data.json())
    .then(users =>{

        listadoUsuarios(users.data);

    });
    const listadoUsuarios = usuarios =>{
        
        usuarios.map((user,i)=>{ //SOLO NECESITO LA IMAGEN, EL NOMBRE Y EL APELLIDO

            equipo_API.innerHTML+=`<img class="foto" src=${user.avatar} alt="testimonio1"> 
            <span class="nombre">${user.first_name} <span="apellido">${user.last_name}</span></span>`

        });
    }


/**********************CUANDO EN EL MENÚ PULSAN ÁREA DE CLIENTES*************/
/**********************CREAMOS UN FALSO LOGIN Y UTILIZAMOS LOCALSTORE**** */
    const boton_formulario=document.querySelector('#boton_formulario');

    boton_formulario.addEventListener('click',()=>{

        let nombre_usuario=document.querySelector('#nombre_usuario').value;
      
        localStorage.setItem('nombre_usuario',nombre_usuario);
        let obtener_nombre_usuario = localStorage.getItem('nombre_usuario');

        if(obtener_nombre_usuario !="" && obtener_nombre_usuario != "undefined") //SI EL USUARIO NO ESTÁ VACÍO, MOSTRAMOS EL DIV USUARIO
        {
            document.querySelector('#mostrar_usuario').innerHTML="Bienvenid@ "+obtener_nombre_usuario;
            document.querySelector('#usuario_identificado').style.display='block';
        }
        else
        {
           document.querySelector('#usuario_identificado').style.display='none';//ocultamos si text del usuario está vacío.

        }
            
       
    });

/*****************CERRAR SESIÓN Y LIMPIAMOS EL LOCALSTORE ****/
    const cerrar_sesion=document.querySelector('#cerrar_sesion');
   
    cerrar_sesion.addEventListener('click',()=>{

       localStorage.clear();
       window.reload();


    });

/***************************DRAG************************ */

    document.addEventListener('dragstart', (e) => {

        /*CAPTURAMOS LA IMAGEN DEL PRODUCTO SELECCIONADO*/
        img_seleccionada = document.getElementById(e.target.id);
        articulo = document.querySelector('.articulo_' + e.target.id);//LOCALIZAMOS LA TARJETA QUE PERTENECE A ESA IMAGEN
        cantidad_articulo = document.querySelector('#mostrar_cantidad_' + e.target.id);//LA CANTIDAD QUE TIENE EN ESE MOMENTO LA TARJETA
        precio_articulo = document.querySelector('#precio_' + e.target.id);//Y EL PRECIO QUE TIENE 
        elemento_seleccionado = e.target.id; //GUARDAMOS EL NOMBRE DEL ID
        



    });

/*********************CUANDO PULSAMOS EL BOTÓN DE SUMAR O RESTAR CANTIDAD********/

    document.addEventListener('click', (e) => {

        //AVERIGUO SI LO QUE SE ESTÁ PULSANDO SON BOTONES DE SUMAR O RESTAR DE CUALQUIER ARTÍCULO        
        const elemento_pulsado = e.target.id; 
        const nombre_idboton = "sumar_cantidad_";
        const pulsado_boton_sumar = elemento_pulsado.indexOf(nombre_idboton);
        const nombre_idboton2 = "restar_cantidad_";
        const pulsado_boton_restar = elemento_pulsado.indexOf(nombre_idboton2);

        if (pulsado_boton_sumar !== -1) {
            
            const ultima = Obtener_Ultima_Letra(elemento_pulsado);
            let numero_veces = parseInt(document.querySelector('#mostrar_cantidad_tarjeta' + ultima).textContent);
            numero_veces += 50;
            document.querySelector('#mostrar_cantidad_tarjeta' + ultima).innerHTML = numero_veces;

        }
        else if (pulsado_boton_restar !== -1) {

            const ultima = Obtener_Ultima_Letra(elemento_pulsado);
            let numero_veces = parseInt(document.querySelector('#mostrar_cantidad_tarjeta' + ultima).textContent);
            numero_veces === 100 ? numero_veces = 100 : numero_veces -= 50;//LA CANTIDAD MÍNIMA DE COMPRA SIEMPRE ES 100g.
            document.querySelector('#mostrar_cantidad_tarjeta' + ultima).innerHTML = numero_veces;

        }


    });

/************************************DROP EN EL DIV DE CARRITO************************************ */
    soltar_productos.addEventListener('dragover', (e) => {

        e.preventDefault();
    });

    soltar_productos.addEventListener('drop', (e) => {
        e.preventDefault();

        /*************VAMOS CREANDO EL ELEMENTO EN EL CARRITO************* */
        const ultima = Obtener_Ultima_Letra(elemento_seleccionado);
        let articulo_seleccionado = document.createElement("article");
        articulo_seleccionado.classList.add("articulo_tarjeta" + ultima);
        soltar_productos.appendChild(articulo_seleccionado);


        img_seleccionada.setAttribute("draggable", "false");//SI LO DEJAMOS EN TRUE, SOBRE EL CARRITO DE SE PODRÍA ARRASTRAR
        articulo_seleccionado.appendChild(img_seleccionada);

        articulo_seleccionado.appendChild(cantidad_articulo);
        let simbolo_multiplicar = document.createElement("span");
        simbolo_multiplicar.innerHTML = " X ";
        articulo_seleccionado.appendChild(simbolo_multiplicar);
        articulo_seleccionado.appendChild(precio_articulo);
        let simbolo_igual = document.createElement("span");
        simbolo_igual.innerHTML = " = ";
        articulo_seleccionado.appendChild(simbolo_igual);
        

        /******************OPERACIÓN************************* */
        let total = document.createElement("span");
        let operacion = 0;
        operacion=Cantidad_Precio(operacion);//Calculamos la cantidad* el precio
        total.innerHTML = operacion + '€';
        articulo_seleccionado.appendChild(total)

        /**************************PAPELERA *************************/
        let icono_papelera = document.createElement("span");//CREAMOS EL BOTÓN DE LA PAPELERA
        icono_papelera.innerHTML = `<i id="papelera_${elemento_seleccionado}"class="fa fa-trash papelera"></i>`;
        articulo_seleccionado.appendChild(icono_papelera);
        contenido.removeChild(articulo);


        /********CUANDO PULSAMOS LA PAPELERA TENEMOS QUE ELIMINAR EL ARTÍCULO DEL CARRITO*******************/
        icono_papelera.addEventListener('click', (e) => {

            const elemento_pulsado = e.target.id;

            const ultima = Obtener_Ultima_Letra(elemento_pulsado);
            let devolver_producto = document.createElement("article");
            devolver_producto.classList.add("col-md-5");
            devolver_producto.classList.add("col-lg-4");
            devolver_producto.classList.add("articulo_tarjeta" + frutas[ultima].id);

            /************CREAMOS DINÁMICAMENTE EL ELEMENTO QUE TENEMOS QUE VOLVER A PONER EN LA SECCIÓN DE ARTÍCULOS******** */
            contenido.appendChild(devolver_producto);

            devolver_producto.innerHTML = `
            
            <div class="card" style="width: 15rem;">
                <img src=${frutas[ultima].image} id="tarjeta${frutas[ultima].id}" class="card-img-top" draggable="true">
                <div class="card-body">
                    <span id="precio_tarjeta${frutas[ultima].id}">${frutas[ultima].price}</span><span>€/kg</span>
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

            contenido.appendChild(devolver_producto);/*********INCLUIMOS EL ELEMENTO CREADO EN LA SECCIÓN DE ARTÍCULOS */
            soltar_productos.removeChild(articulo_seleccionado);/**LO ELIMINAMOS DEL CARRITO */

            total_compra -= operacion;//AHORA LO TENEMOS QUE RESTAR A LA CANTIDAD TOTAL DE LA COMPRA
            Total_Carrito();

        });



    });




    /**Función creada para obtener la última letra del id del elemento seleccionado */
    const Obtener_Ultima_Letra = (boton_pulsado)=>{
        boton_pulsado=boton_pulsado[boton_pulsado.length - 1];

        return boton_pulsado;
    }

    /**Función que realiza el cálculo de los gramos y la cantidad */
    const Cantidad_Precio =(calculo) =>{
       
        calculo = (parseFloat((cantidad_articulo.textContent) / 1000) * parseFloat(precio_articulo.textContent)).toFixed(2);
        calculo = parseFloat(calculo);
        total_compra += calculo;
        Total_Carrito(); //Actualizamos el total del carrito

        return calculo;
    }

    /**Función que muestra el total del pedido */
    const Total_Carrito = ()=>{ 

        mostrar_suma_pedido = total_compra.toFixed(2); //SOLO DOS DECIMALES Y MOSTRAMOS EN LA SUMA TOTAL DEL CARRITO

        if (mostrar_suma_pedido <= 0) { mostrar_suma_pedido = 0; } //PARA QUE NO MUESTRE NÚMEROS NEGATIVOS.
        document.getElementById('importe_pedido').innerHTML = mostrar_suma_pedido + '€';

        
    }


})();