setUpUsers()


let favouritesShownCount = 0;
let globalTeachers = []
let paginatedTeachers = []

function openTeacherPopUp(teacher) {
    let name = document.getElementById("teacherPopUpName")
    name.innerText = teacher.full_name

    let className = document.getElementById("teacherPopUpClass")
    className.innerText = teacher.course

    let place = document.getElementById("teacherPopUpPlace")
    place.innerText = `${teacher.city},${teacher.country}`

    let biologicalI = document.getElementById("teacherPopUpBioInf")
    biologicalI.innerText = `${teacher.age},${teacher.gender}`

    let email = document.getElementById("teacherPopUpEmail")
    email.innerText = teacher.email

    let phone = document.getElementById("teacherPopUpPhone")
    phone.innerText = teacher.phone

    let notes = document.getElementById("teacherPopUpNotes")
    notes.innerText = teacher.note

    let photo = document.getElementById("teacherPopUpImage")
    photo.setAttribute("src", teacher.picture_large)

    teacherPopUp.classList.add("teacherPopUpOpen")
    popUpBackground.classList.add("active")
}
function closeTeacherPopUp() {
    teacherPopUp.classList.remove('teacherPopUpOpen')
    popUpBackground.classList.remove("active")
}


function showTopTeachers(teachers, start) {
    let listOfTeacher = document.getElementById("listOfTopTeachers")
    paginatedTeachers = []
    listOfTeacher.innerHTML = ''
    let arrayOfTeachers
    if (teachers === undefined)
        arrayOfTeachers = randomUserMock
    else arrayOfTeachers = teachers
    if (teachers.length >= 10) {

        let limit = 10 * (start - 1)
        for (let i = limit; i < limit + 10; i++) {
            paginatedTeachers.push(teachers[i])
            let teacherSection = document.createElement("section")

            let teacherPhoto = document.createElement("img")
            teacherPhoto.setAttribute("src", teachers[i].picture_thumbnail)

            let nameArr = teachers[i].full_name.split(" ")

            let firstName = document.createElement("span")
            firstName.innerText = nameArr[0]
            firstName.classList.add("teacherSpan", "teacherName")

            let lastName = document.createElement("span")
            lastName.innerText = nameArr[1]
            lastName.classList.add("teacherSpan", "teacherName")

            let course = document.createElement("span")
            course.innerText = teachers[i].course
            course.classList.add("teacherSpan", "teacherClass")

            let country = document.createElement("span")
            country.innerText = teachers[i].country
            country.classList.add("teacherSpan")

            teacherSection.append(teacherPhoto, firstName, lastName, course, country)
            teacherSection.classList.add("topTeacher")
            teacherSection.addEventListener("click", () => { openTeacherPopUp(teachers[i]) })
            listOfTeacher.appendChild(teacherSection)
        }
    } else {
        for (teacher of teachers) {
            paginatedTeachers.push(teacher)
            let teacherSection = document.createElement("section")

            let teacherPhoto = document.createElement("img")
            teacherPhoto.setAttribute("src", teacher.picture_thumbnail)

            let nameArr = teacher.full_name.split(" ")

            let firstName = document.createElement("span")
            firstName.innerText = nameArr[0]
            firstName.classList.add("teacherSpan", "teacherName")

            let lastName = document.createElement("span")
            lastName.innerText = nameArr[1]
            lastName.classList.add("teacherSpan", "teacherName")

            let course = document.createElement("span")
            course.innerText = teacher.course
            course.classList.add("teacherSpan", "teacherClass")

            let country = document.createElement("span")
            country.innerText = teacher.country
            country.classList.add("teacherSpan")

            teacherSection.append(teacherPhoto, firstName, lastName, course, country)
            teacherSection.classList.add("topTeacher")
            teacherSection.addEventListener("click", () => { openTeacherPopUp(teacher) })
            listOfTeacher.appendChild(teacherSection)
        }
    }
}


function showTeacherStatistics(teachers, sortKey) {
    let statisticsTable = document.querySelector("tbody")
    statisticsTable.innerHTML = ''
    sortedTeachers = sort(teachers, sortKey, { ordered: true })
    statisticsTable.insertRow()

    for (let i = 0; i < 10; i++) {
        let currentRow = statisticsTable.insertRow()

        currentRow.insertCell().innerText = teachers[i].full_name
        currentRow.insertCell().innerText = teachers[i].course
        currentRow.insertCell().innerText = teachers[i].age
        currentRow.insertCell().innerText = teachers[i].gender
        currentRow.insertCell().innerText = teachers[i].country
    }
}


function showFavouriteTeachers(startingPosition, teachers) {

    let favoriteTeachers = filter(teachers, "favourite", { equalTo: true })
    if (startingPosition === undefined)
        startingPosition = 0


    let newListToAppend = document.createDocumentFragment()
    let listOfFavourites = document.getElementById("teacherFavouriteSection")
    for (let i = startingPosition; i < startingPosition + 4; i++) {
        console.log(i)
        let teacherSection = document.createElement("section")

        let teacherPhoto = document.createElement("img")
        teacherPhoto.setAttribute("src", favoriteTeachers[i].picture_thumbnail)

        let nameArr = favoriteTeachers[i].full_name.split(" ")

        let firstName = document.createElement("span")
        firstName.innerText = nameArr[0]
        firstName.classList.add("teacherSpan", "teacherName")

        let lastName = document.createElement("span")
        lastName.innerText = nameArr[1]
        lastName.classList.add("teacherSpan", "teacherName")

        let country = document.createElement("span")
        country.innerText = favoriteTeachers[i].country
        country.classList.add("teacherSpan")

        teacherSection.append(teacherPhoto, firstName, lastName, country)
        teacherSection.classList.add("topTeacher")
        teacherSection.addEventListener("click", () => { openTeacherPopUp() })
        newListToAppend.appendChild(teacherSection)

        favouritesShownCount++;
    }
    listOfFavourites.replaceChildren(...newListToAppend.children)
}

function favouriteSlides(teachers) {
    let arrowLeftSlide = document.getElementById("arrowIconLeft")
    let arrowRightSlide = document.getElementById("arrowIconRight")

    arrowLeftSlide.addEventListener("click",
        () => {
            if (favouritesShownCount - 5 >= 0) {
                console.log(`${favouritesShownCount} : count value`)
                favouritesShownCount--;
                showFavouriteTeachers(favouritesShownCount -= 4, teachers)
            }
        }
    )
    arrowRightSlide.addEventListener("click",
        () => {
            if (favouritesShownCount <= 15) {
                favouritesShownCount++;
                showFavouriteTeachers(favouritesShownCount -= 4, teachers)
            }
        }
    )
}

function setTableListeners(teachers) {
    console.log(teachers)
    let nameColumn = document.getElementById("name_column")
    nameColumn.addEventListener("click",
        () => {
            showTeacherStatistics(teachers, "full_name")
        })
    let courseColumn = document.getElementById("course_column")
    courseColumn.addEventListener("click",
        () => {
            showTeacherStatistics(teachers, "course")
        })
    let ageColumn = document.getElementById("age_column")
    ageColumn.addEventListener("click",
        () => {
            showTeacherStatistics(teachers, "age")
        })
    let genderColumn = document.getElementById("gender_column")
    genderColumn.addEventListener("click",
        () => {
            showTeacherStatistics(teachers, "gender")
        })
    let countryColumn = document.getElementById("country_column")
    countryColumn.addEventListener("click",
        () => {
            showTeacherStatistics(teachers, "country")
        })

}

function addTeacher() {
    document.getElementById("addTeacherBtn").addEventListener("click",
        (event) => {
            event.preventDefault()
            let name = document.getElementById("name").value

            let gender = document.getElementById("male")
            if (gender.checked) {
                gender = "male"
            } else {
                gender = "female"
            }
            let city = document.getElementById("city").value

            let country = document.getElementById("country")
            country = country.options[country.selectedIndex].value

            let course = document.getElementById("speciality")
            course = course.options[course.selectedIndex].value

            let email = document.getElementById("email").value
            let phone = document.getElementById("phone").value
            let date = document.getElementById("birth").value
            let age = 2022 - date.split("-")[0]
            let bgColor = document.getElementById("bgColor")
            let notes = document.getElementById("notes")


            let teacher = {
                "full_name": name,
                "city": city,
                "country": country,
                "email": email,
                "b_date": date,
                "age": age,
                "phone": phone,
                "id": randomTeacher(globalTeachers) + 250,
                "favourite": (Math.floor(Math.random() * 2) == 0 ? true : false), // If 0 true else false
                "course": course, // Random pick from the courses array
                "bg_color": bgColor,
                "note": notes
            }
            postUser(teacher)
            closeAddTeacherPopUp()
        }
    )

}

function formTopTeachersListeners(teachers) {
    console.log(teachers)
    let age = document.getElementById("ageSearch")
    age.addEventListener('change',
        () => {
            let value = age.options[age.selectedIndex].value
            console.log(value)
            let lowerBound = value.split("-")[0]
            console.log(lowerBound)
            let upperBound = value.split("-")[1]
            console.log(upperBound)
            console.log(filter(teachers, "age", { greaterThenEqualsLessThenEquals: [lowerBound, upperBound] }))
            showTopTeachers(filter(teachers, "age", { greaterThenEqualsLessThenEquals: [lowerBound, upperBound] }), 1)
        }, false)

    let region = document.getElementById("region")
    region.addEventListener('change',
        () => {
            let value = region.options[region.selectedIndex].value
            console.log(value)
            filter(teachers, "country", { equalTo: value })
            showTopTeachers(filter(teachers, "country", { equalTo: value }), 1)
        })
    let sex = document.getElementById("sex")
    sex.addEventListener('change',
        () => {
            let value = sex.options[sex.selectedIndex].value
            console.log(value)
            showTopTeachers(filter(teachers, "gender", { equalTo: value }), 1)
        })
}

function setPagination() {

    document.getElementById("firstPage").addEventListener("click", (e) => {
        e.preventDefault()
        document.getElementById("firstPage").value = 1
        showTopTeachers(globalTeachers, document.getElementById("firstPage").value)
        formTopTeachersListeners(paginatedTeachers)
        showTeacherStatistics(paginatedTeachers)
        setTableListeners(paginatedTeachers)
    })
    document.getElementById("secondPage").addEventListener("click", (e) => {
        e.preventDefault()
        document.getElementById("secondPage").value = 2
        showTopTeachers(globalTeachers, document.getElementById("secondPage").value)
        formTopTeachersListeners(paginatedTeachers)
        showTeacherStatistics(paginatedTeachers)
        setTableListeners(paginatedTeachers)
    })
    document.getElementById("thirdPage").addEventListener("click", (e) => {
        e.preventDefault()
        document.getElementById("thirdPage").value = 3
        showTopTeachers(globalTeachers, document.getElementById("thirdPage").value)
        formTopTeachersListeners(paginatedTeachers)
        showTeacherStatistics(paginatedTeachers)
        setTableListeners(paginatedTeachers)
    })
    document.getElementById("lastPage").addEventListener("click", (e) => {
        e.preventDefault()
        document.getElementById("lastPage").value = 5
        console.log(e.value)
        showTopTeachers(globalTeachers, document.getElementById("lastPage").value)
        formTopTeachersListeners(paginatedTeachers)
        showTeacherStatistics(paginatedTeachers)
        setTableListeners(paginatedTeachers)
        setUpSearch(paginatedTeachers)
    })
}

function setUpSearch(teachers) {
    let searchBtn = document.getElementById("teacherSearchButton")
    let searchForm = document.getElementById("searchForm")
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
    })
    searchBtn.addEventListener("click", (event) => {
        let teacherFindField = document.getElementById("teacherFindField")
        let foundTeacher = {}
        foundTeacher = find(teachers, "full_name", teacherFindField.value)
        console.log(foundTeacher)
        console.log(teacherFindField.value)
        if (foundTeacher == undefined) {
            foundTeacher = find(teachers, "age", teacherFindField.value)
            console.log(foundTeacher)
            if (foundTeacher == undefined) {
                foundTeacher = find(teachers, "note", teacherFindField.value)
                console.log(foundTeacher)
                if (foundTeacher == undefined) {
                    alert("No valid teacher found!")
                } else {
                    openTeacherPopUp(foundTeacher)
                }
            } else {
                openTeacherPopUp(foundTeacher)
            }
        } else {
            openTeacherPopUp(foundTeacher)
        }
    })
}



async function setUpUsers() {
    await fetchUsers()
        .then((users) => {
            console.log(users)
            users = organizeTeachers(users)
            globalTeachers = users
            console.log(users)
            showTopTeachers(globalTeachers, 1)
            console.log(paginatedTeachers)
            addTeacher()
            formTopTeachersListeners(paginatedTeachers)
            showTeacherStatistics(paginatedTeachers)
            setTableListeners(paginatedTeachers)
            showFavouriteTeachers(1, globalTeachers)
            favouriteSlides(globalTeachers)
            setPagination()
            postingUsers(globalTeachers)
            setUpSearch(paginatedTeachers)

        })
}




