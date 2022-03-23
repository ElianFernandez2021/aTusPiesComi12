console.log("Estas en el carrito")
let $cart = document.querySelector('#cart')

const getCarito = async () => {
    try {
        const response = await fetch(`/api/cart`)
    } catch (error) {
        console.log(error)
    }
}

const addItem = async (id) => {
    try {
        const response = await fetch(`/api/cart/${id}`, {
            method: 'POST'
        })
        const result = await response.json()
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

    $cart.innerHTML = null;

    data.forEach(({ id, amount, image, name, price, total,size,color }) => {
        let item = `
        <tr>
            <td>
                <figure>
                    <img src="/images/products/${image}" alt="">
                </figure>
            </td>
            <td>${name}</td>
            <td>>${size}</td>
            <td>>${color}</td>
            <td>
                <button>+</button>
                <p>${amount}</p>
                <button>-</button>
            </td>
            <td>>${price}</td>
        </tr>
        <tfoot>
            <tr>
                <td>Total: </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${total}</td>
            </tr>
        </tfoot>
        `
        carrito.innerHTML += item
    });

}

carrito && getCarrito();
