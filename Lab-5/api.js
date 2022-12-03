let userURL = "https://randomuser.me/api/"
let newApiListOfTeachers = []



async function fetchUser() {
    let userToReturn = {}

    await fetch(userURL)
        .then((user) => {
            return user.json()
        })
        .then((user) => {
            userToReturn = user.results[0]
        })
        .catch((error) => {
            console.log(error)
        })
    return userToReturn
}

async function fetchUsers() {
    for (let i = 0; i < 50; i++) {
        await fetchUser()
            .then((user) => {
                newApiListOfTeachers.push(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return newApiListOfTeachers
}

