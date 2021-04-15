export default ({ app }, inject) => {
    inject('getUsers', (params, token) => {
        return fetch(`${process.env.API_URL}/users${params ? '?' + params : ''}`, {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
                Authorization: token
            },
        })
            .then((res) => res.json())
    }),

        inject('getUser', (id, token) => {
            return fetch(`${process.env.API_URL}/user/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token
                },
            })
                .then((res) => res.json())
        }),

        inject('updateUser', (id, body, token) => {
            return fetch(`${process.env.API_URL}/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
        }),

        inject('createUser', (body, token) => {
            return fetch(`${process.env.API_URL}/user`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token
                },
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
        }),

        inject('deleteUser', (id, token) => {
            return fetch(`${process.env.API_URL}/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "Application/json",
                    "Authorization": token
                }
            })
                .then((res) => res.json())
        })
}