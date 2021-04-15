export default ({ app }, inject) => {
    inject('getMyOrders', (id, token) => {
        return fetch(`${process.env.API_URL}/my-orders/${id}`, {
            headers: {
                "Content-type": "Application/json",
                "Authorization": token
            },
        })
            .then((res) => res.json())
    }),

        inject('getOrders', (token) => {
            return fetch(`${process.env.API_URL}/orders`, {
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                },
            })
                .then((res) => res.json())
        }),

        inject('getOrder', (id, token) => {
            return fetch(`${process.env.API_URL}/order/${id}`, {
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                },
            })
                .then((res) => res.json())
        }),

        inject('updateStatus', (id, body, token) => {
            return fetch(`${process.env.API_URL}/order/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
        })
}