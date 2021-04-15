export default ({ app }, inject) => {
    inject('createProduct', (body, token) => {
        return fetch(`${process.env.API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                Authorization: token
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
    }),
        inject('updateProduct', (id, body, token) => {
            return fetch(`${process.env.API_URL}/product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
        }),
        inject('deleteProduct', (id, token) => {
            return fetch(`${process.env.API_URL}/product/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                }
            })
                .then((res) => res.json())
        })
}