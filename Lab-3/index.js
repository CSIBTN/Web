function organizeTeachers() {
    let courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
        "Law", "Art", "Medicine", "Statistics"]
    randomUserMock = randomUserMock.map(function teacherMapper(teacher) {
        return {
            "gender": teacher.gender,
            "title": teacher.name.title,
            "full_name": `${teacher.name.first} ${teacher.name.last}`,
            "city": teacher.location.city,
            "state": teacher.location.state,
            "country": teacher.location.country,
            "postcode": teacher.location.postcode,
            "coordinates": { "latitude": teacher.location.coordinates.latitude, "longitude": teacher.location.coordinates.longitude },
            "timezone": { "offset": teacher.location.timezone.offset, "description": teacher.location.timezone.description },
            "email": teacher.email,
            "b_date": teacher.dob.date,
            "age": teacher.dob.age,
            "phone": teacher.phone,
            "picture_large": teacher.picture.large,
            "picture_thumbnail": teacher.picture.thumbnail,
            "id": teacher.id.value === null ? `${randomTeacher()}}` : teacher.id.value,
            "favourite": (Math.floor(Math.random() * 2) == 0 ? true : false), // If 0 true else false
            "course": courses[(Math.floor(Math.random() * courses.length))], // Random pick from the courses array
            "bg_color": `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            "note": (Math.random() + 100).toString(36)
        }
    }
    )

    additionalUsers = additionalUsers.map(function mapper(teacher) {
        let randomPhotoId = Math.floor(Math.random() * 200 + 50)
        return {
            "gender": teacher.gender,
            "title": teacher.title,
            "full_name": teacher.full_name,
            "city": teacher.city === undefined ? randomUserMock[randomTeacher()].city : teacher.city,
            "country": teacher.country === undefined ? randomUserMock[randomTeacher()].country : teacher.country,
            "postcode": teacher.postcode,
            "coordinates": {
                "latitude": teacher.location !== undefined ? teacher.location.coordinates.latitude : randomUserMock[randomTeacher()].coordinates.latitude,
                "longitude": teacher.location !== undefined ? teacher.location.coordinates.longitude : randomUserMock[randomTeacher()].coordinates.longitude
            },
            "timezone": {
                "offset": teacher.timezone !== undefined ? teacher.timezone.offset : randomUserMock[randomTeacher()].timezone.offset,
                "longitude": teacher.timezone !== undefined ? teacher.timezone.description : randomUserMock[randomTeacher()].timezone.description
            },
            "state": randomUserMock[randomTeacher()].state,
            "email": randomUserMock[randomTeacher()].email,
            "b_date": randomUserMock[randomTeacher()].b_date,
            "age": randomUserMock[randomTeacher()].age,
            "phone": randomUserMock[randomTeacher()].phone,
            "picture_large": `https://randomuser.me/api/portraits/${teacher.gender === "male" ? "men" : "female"}/${randomPhotoId}.jpg`,
            "picture_thumbnail": `https://randomuser.me/api/portraits/${teacher.gender === "male" ? "men" : "female"}/${randomPhotoId}.jpg`
        }
    })

    for (teacherA in additionalUsers) {
        for (teacherR in randomUserMock) {
            if (checkIfEqual(teacherA, teacherR)) {
                additionalUsers.pop(teacherA)
                break
            }
        }
    }

    randomUserMock = randomUserMock.concat(additionalUsers)
}

function checkIfEqual(teacher1, teacher2) {
    const keys1 = Object.keys(teacher1);
    const keys2 = Object.keys(teacher2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (teacher1[key] !== teacher2[key]) {
            return false;
        }
    }
    return true;
}

function validateTeacher(teacher) {
    if (typeof (teacher.full_name) !== "string" || teacher.full_name[0] !== teacher.full_name[0].toUpperCase())
        return false
    if (typeof (teacher.gender) !== "string" || teacher.gender[0] !== teacher.gender[0].toUpperCase())
        return false
    if (typeof (teacher.note) !== "string" || teacher.note[0] !== teacher.note[0].toUpperCase())
        return false
    if (typeof (teacher.state) !== "string" || teacher.state[0] !== teacher.state[0].toUpperCase())
        return false
    if (typeof (teacher.city) !== "string" || teacher.city[0] !== teacher.city[0].toUpperCase())
        return false
    if (typeof (teacher.country) !== "string" || teacher.country[0] !== teacher.country[0].toUpperCase())
        return false
    if (typeof (teacher.age) !== "number")
        return false
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(teacher.email))
        return false
    if (!/^[\+]?[(]?[0-9]{2,9}[)]?[-\s\.]?[0-9]{2,9}[-\s\.]?([0-9]{2,9})?$/.test(teacher.phone.toString()))
        return false
    return true
}
function filter(key, options = { greaterThen, greaterThenEquals, lessThen, lessThenEquals, includes, equalTo }) { // options{greaterThen , greaterThenEquals, lessThen, lessThenEquals, includes, equalTo}
    return randomUserMock.filter(function filtering(teacher) {
        if (options.greaterThen !== undefined) {
            return teacher[key] > options.greaterThen;
        } else if (options.greaterThenEquals !== undefined) {
            return teacher[key] >= options.greaterThen;
        } else if (options.lessThen !== undefined) {
            return teacher[key] < options.lessThen
        } else if (options.lessThenEquals !== undefined) {
            return teacher[key] <= options.lessThenEquals
        } else if (options.includes !== undefined) {
            if (typeof (teacher[key]) === "string")
                return teacher[key].includes(`${includes}`)
            return false
        } else if (options.equalTo !== undefined) {
            return teacher[key] === options.equalTo
        }
    })
}

function sort(key, options = { ordered }) {
    return randomUserMock.sort(function sorting(teacher1, teacher2) {
        if (options.ordered) {
            if (teacher1[key] < teacher2[key])
                return -1
            else if (teacher1[key] > teacher2[key])
                return 1
            else {
                return 0
            }
        } else {
            if (teacher1[key] < teacher2[key])
                return 1
            else if (teacher1[key] > teacher2[key])
                return -1
            else {
                return 0
            }
        }
    })
}

function find(key, value) {
    return randomUserMock.find(function predicate(teacher) {
        return teacher[key] === value ? true : teacher[key].includes(value)
    })
}

function filterWithPercantage(key, options = { greaterThen, greaterThenEquals, lessThen, lessThenEquals, includes, equalTo }) {
    let filteredArray = filter(key, options)
    return `${Math.round(100.0 * filteredArray.length / randomUserMock.length)}%`
}

function randomTeacher() {
    return Math.floor(Math.random() * randomUserMock.length);
}