document.addEventListener('DOMContentLoaded', function() {
    console.log('Baby Zone - Página cargada correctamente');
    
    initCarrito();
    initFormularios();
    initNavegacion();
    initProductos();
});

function initCarrito() {
    const botonesAñadir = document.querySelectorAll('button, a[href="carrito1.html"]');
    
    botonesAñadir.forEach(function(boton) {
        if (boton.textContent.includes('🛒') || boton.textContent.includes('Añadir')) {
            boton.addEventListener('click', function(e) {
                if (boton.tagName === 'A') {
                    return;
                }
                
                alert('¡Producto añadido al carrito!');
                
                const contadorCarrito = document.querySelector('.contador-carrito');
                if (contadorCarrito) {
                    let cantidad = parseInt(contadorCarrito.textContent) || 0;
                    cantidad++;
                    contadorCarrito.textContent = cantidad;
                }
            });
        }
    });
}

function initFormularios() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let valido = true;
            
            inputs.forEach(function(input) {
                if (!input.value.trim()) {
                    valido = false;
                    input.style.borderColor = '#ff0000';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    valido = false;
                    emailInput.style.borderColor = '#ff0000';
                    alert('Por favor, ingresa un email válido');
                }
            }
            
            if (!valido) {
                e.preventDefault();
                alert('Por favor, completa todos los campos requeridos');
                return false;
            }
            
            if (form.querySelector('input[name="tarjeta"]')) {
                const confirmar = confirm('¿Confirmas el pago?');
                if (!confirmar) {
                    e.preventDefault();
                    return false;
                } else {
                    alert('¡Pago procesado correctamente! Gracias por tu compra.');
                }
            } else {
                alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
            }
        });
    });
    
    const tarjetaInput = document.querySelector('input[name="tarjeta"]');
    if (tarjetaInput) {
        tarjetaInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 16) valor = valor.substring(0, 16);
            
            let formateado = valor.match(/.{1,4}/g);
            if (formateado) {
                e.target.value = formateado.join('-');
            } else {
                e.target.value = valor;
            }
        });
    }
    
    const mesInput = document.querySelector('input[name="mes"]');
    const anioInput = document.querySelector('input[name="anio"]');
    
    if (mesInput) {
        mesInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor > 12) valor = '12';
            if (valor < 1 && valor.length > 0) valor = '01';
            e.target.value = valor;
        });
    }
    
    if (anioInput) {
        anioInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            const añoActual = new Date().getFullYear();
            if (valor.length === 4 && parseInt(valor) < añoActual) {
                e.target.style.borderColor = '#ff0000';
            } else {
                e.target.style.borderColor = '#ddd';
            }
        });
    }
}

function initNavegacion() {
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');
    
    enlacesInternos.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            const destino = this.getAttribute('href');
            if (destino !== '#') {
                const elemento = document.querySelector(destino);
                if (elemento) {
                    e.preventDefault();
                    elemento.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

function initProductos() {
    const productos = document.querySelectorAll('figure, .producto-item');
    
    productos.forEach(function(producto) {
        producto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        producto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    const botonBuscar = document.querySelector('button:contains("🔍")');
    if (botonBuscar) {
        botonBuscar.addEventListener('click', function() {
            const busqueda = prompt('¿Qué producto buscas?');
            if (busqueda) {
                alert('Buscando: ' + busqueda);
            }
        });
    }
}

function mostrarBienvenida() {
    const mensaje = document.createElement('div');
    mensaje.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px; border-radius: 5px; z-index: 1000; animation: fadeIn 0.5s ease;';
    mensaje.textContent = '¡Bienvenido a Baby Zone! 👶';
    document.body.appendChild(mensaje);
    
    setTimeout(function() {
        mensaje.style.animation = 'fadeOut 0.5s ease';
        setTimeout(function() {
            mensaje.remove();
        }, 500);
    }, 3000);
}

function calcularTotal() {
    const precios = document.querySelectorAll('.precio');
    let total = 0;
    
    precios.forEach(function(precio) {
        const texto = precio.textContent.replace(/[^0-9.]/g, '');
        const valor = parseFloat(texto);
        if (!isNaN(valor)) {
            total += valor;
        }
    });
    
    return total;
}

function actualizarTotal() {
    const total = calcularTotal();
    const elementoTotal = document.querySelector('.total-carrito');
    
    if (elementoTotal) {
        elementoTotal.textContent = 'Total: S/ ' + total.toFixed(2);
    }
}

window.addEventListener('load', function() {
    setTimeout(mostrarBienvenida, 1000);
});

