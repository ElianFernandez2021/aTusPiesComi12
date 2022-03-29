console.log("Estas en el carrito")
let carrito = document.querySelector('#cart')
let total = document.querySelector('#total')

const getCarrito = async () => {
    try {
        const response = await fetch(`/api/cart`);
        const result = await response.json();

        console.log(result);

        cargarTabla(result.data)

    } catch (error) {
        console.log(error)
    }
}

const addItem = async (id) => {
    console.log(id)
    try {
        const response = await fetch(`/api/cart/${id}`, {
            method: 'POST'
        })
        const result = await response.json();
        console.log(result)
        cargarTabla(result.data)

    } catch (error) {
        console.log(error)
    }
}

const removeItem = async (id) => {
    try {
        const res = await fetch('/api/cart/' + id, {
            method: 'DELETE'
        })
        const result = await res.json()
        if (result.ok) {
            cargarTabla(result.data)
        }
    } catch (error) {
        console.log(error)
    }
}

const removeAllItem = async (id) => {
    try {
        const res = await fetch(`api/cart/item/${id}`, {
            mehotd: 'DELETE'
        })
        const result = await res.json()

        if (result.ok) {
            cargarTabla(result.data)
        }
    } catch (error) {
        console.log(error)
    }
}

const emptyCart = async () => {

    try {
        const response = await fetch(`/api/cart/empty`, {
            method: 'DELETE'
        })
        const result = await response.json()

        if (result.ok) {
            cargarTabla(result.data)
        }
    } catch (error) {
        console.error(error)
    }
}

const cargarTabla = (data) => {

    carrito.innerHTML = null;
    let totalCart = 0
    data.forEach(({ id, quantity, image, name, total, size, color }) => {
        let item = `
        <tr>
            <td>
                <figure>
                    <img src="/images/products/${image}" alt="">
                </figure>
            </td>
            <td>${name}</td>
            <td>${size}</td>
            <td>${color}</td>
            <td>
                <button onclick="addItem(${id})" class ="botonSuma">+</button>
                <p>${quantity}</p>
                <button onclick="removeItem(${id})" class="botonResta">-</button>
            </td>
            <td>$${(total)}</td>
        </tr>
        `
        totalCart = totalCart+total
        carrito.innerHTML += item
        
    });
    let totales = `
        <tr>
            <td>Total: </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${totalCart }</td>
        </tr>
        `
    total.innerHTML = totales

}

carrito && getCarrito();
