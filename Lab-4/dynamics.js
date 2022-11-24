
showTopTeachers()
showTeacherStatistics()
setTableListeners()

let favouritesShownCount = 0;
showFavouriteTeachers()
favouriteSlides()
formTopTeachersListeners()

addTeacher()

function showTopTeachers(teachers) {
    let listOfTeacher = document.getElementById("listOfTopTeachers")
    listOfTeacher.innerHTML = ''
    let arrayOfTeachers
    if (teachers === undefined)
        arrayOfTeachers = randomUserMock
    else arrayOfTeachers = teachers


    for (teacher of arrayOfTeachers) {
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
        teacherSection.addEventListener("click", () => { openTeacherPopUp() })
        listOfTeacher.appendChild(teacherSection)
    }
}

function showTeacherStatistics(sortKey) {
    let statisticsTable = document.querySelector("tbody")
    statisticsTable.innerHTML = ''
    sortedTeachers = sort(sortKey, { ordered: true })
    statisticsTable.insertRow()
    for (let i = 0; i < 5; i++) {
        let currentRow = statisticsTable.insertRow()

        currentRow.insertCell().innerText = randomUserMock[i].full_name
        currentRow.insertCell().innerText = randomUserMock[i].course
        currentRow.insertCell().innerText = randomUserMock[i].age
        currentRow.insertCell().innerText = randomUserMock[i].gender
        currentRow.insertCell().innerText = randomUserMock[i].country
    }
}


function showFavouriteTeachers(startingPosition) {

    let favoriteTeachers = filter("favourite", { equalTo: true })
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

function favouriteSlides() {
    let arrowLeftSlide = document.getElementById("arrowIconLeft")
    let arrowRightSlide = document.getElementById("arrowIconRight")

    arrowLeftSlide.addEventListener("click",
        () => {
            if (favouritesShownCount - 5 >= 0) {
                console.log(`${favouritesShownCount} : count value`)
                favouritesShownCount--;
                showFavouriteTeachers(favouritesShownCount -= 4)
            }
        }
    )
    arrowRightSlide.addEventListener("click",
        () => {
            if (favouritesShownCount < 10) {
                favouritesShownCount++;
                showFavouriteTeachers(favouritesShownCount -= 4)
            }
        }
    )
}

function setTableListeners() {
    let nameColumn = document.getElementById("name_column")
    nameColumn.addEventListener("click",
        () => {
            showTeacherStatistics("full_name")
        })
    let courseColumn = document.getElementById("course_column")
    courseColumn.addEventListener("click",
        () => {
            showTeacherStatistics("course")
        })
    let ageColumn = document.getElementById("age_column")
    ageColumn.addEventListener("click",
        () => {
            showTeacherStatistics("age")
        })
    let genderColumn = document.getElementById("gender_column")
    genderColumn.addEventListener("click",
        () => {
            showTeacherStatistics("gender")
        })
    let countryColumn = document.getElementById("country_column")
    countryColumn.addEventListener("click",
        () => {
            showTeacherStatistics("country")
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
                "id": randomTeacher() + 250,
                "favourite": (Math.floor(Math.random() * 2) == 0 ? true : false), // If 0 true else false
                "course": course, // Random pick from the courses array
                "bg_color": bgColor,
                "note": notes
            }
            randomUserMock.push(teacher)
            closeAddTeacherPopUp()
            showTopTeachers()
        }
    )

}

function formTopTeachersListeners() {
    let newListOfTeachers
    let age = document.getElementById("ageSearch")
    age.addEventListener('change',
        () => {
            let value = age.options[age.selectedIndex].value
            console.log(value)
            let lowerBound = value.split("-")[0]
            console.log(lowerBound)
            let upperBound = value.split("-")[1]
            console.log(upperBound)
            newListOfTeachers = filter("age", { greaterThenEqualsLessThenEquals: [lowerBound, upperBound] })
            showTopTeachers(newListOfTeachers)
        }, false)

    let region = document.getElementById("region")
    region.addEventListener('change',
        () => {
            let value = region.options[region.selectedIndex].value
            newListOfTeachers = filter("country", { equalTo: value })
            showTopTeachers(newListOfTeachers)
        })
    let sex = document.getElementById("sex")
    sex.addEventListener('change',
        () => {
            let value = sex.options[sex.selectedIndex].value
            newListOfTeachers = filter("gender", { equalTo: value })
            showTopTeachers(newListOfTeachers)
        })
}



