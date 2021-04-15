export default ({ app }, inject) => {
    inject('register', (body) => {
        return fetch(`${process.env.API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
    }),

        inject('login', (body) => {
            return fetch(`${process.env.API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
        }),

        inject('getMe', (id, token) => {
            return fetch(`${process.env.API_URL}/user/${id}`, {
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
            })
                .then((res) => res.json())
        }),

        inject('updateMe', (id, token, body) => {
            console.log(body);
            return fetch(`${process.env.API_URL}/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
        })
}