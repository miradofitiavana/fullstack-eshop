export default ({ app }, inject) => {
    inject('getOrders', (token) => {
        return fetch(`${process.env.API_URL}/orders`, {
            headers: {
                "Content-type": "Application/json",
                "Authorization": token
            },
        })
            .then((res) => res.json())
    })
}