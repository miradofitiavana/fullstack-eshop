export default ({ app, store }, inject) => {
    inject('paiementSuccess', (body) => {
        return fetch(`/api/success`, {
            method: "POST",
            headers: { "Content-type": "Application/json" },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
    }),

        inject('saveOrder', (body) => {
            return fetch(`${process.env.API_URL}/orders`, {
                method: "POST",
                headers: { "Content-type": "Application/json" },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
        })
}