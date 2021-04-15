export default ({ app }, inject) => {
    inject('createCategory', (body, token) => {
        return fetch(`${process.env.API_URL}/categories`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
                "Authorization": token
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
    }),
        inject('updateCategory', (id, body, token) => {
            return fetch(`${process.env.API_URL}/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
        }),
        inject('deleteCategory', (id, token) => {
            return fetch(`${process.env.API_URL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                }
            })
                .then((res) => res.json())
        })
}