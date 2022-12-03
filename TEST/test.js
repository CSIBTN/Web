
async function postingUsers(teachers) {
    axios.post('http://localhost:3000/users', teachers)
        .then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });
}

async function postUser(teacher) {
    axios.post('http://localhost:3000/users', teacher)
        .then(resp => {
            console.log(resp.data);
        }).catch(error => {
            console.log(error);
        });
}



