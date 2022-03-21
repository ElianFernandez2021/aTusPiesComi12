console.log("Estas en el carrito")

const addItem = async(id) => {
    try {
        const response = await fetch(`/api/cart/${id}`,{
            method:'POST'
        })
        const result = await response.json()
    } catch (error) {
        console.log(error)
    }
}

const getCarito = async() => {
    try {
        const response = await fetch(`/api/cart`)
    } catch (error) {
        console.log(error)
    }
}



let $add = document.querySelector('#add')
window.addEventListener('load',()=> {
    $add.addEventListener('onclick',(item)=>{

    })
})
