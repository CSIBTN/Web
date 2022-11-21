showTopTeachers()
showTeacherStatistics()

function showTopTeachers() {
    let listOfTeacher = document.getElementById("listOfTopTeachers")
    for (teacher of randomUserMock) {
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

function showTeacherStatistics() {
    let statisticsTable = document.querySelector("table")

    for (let i = 0; i < 5; i++) {
        let currentRow = statisticsTable.insertRow()

        currentRow.insertCell().innerText = randomUserMock[i].full_name
        currentRow.insertCell().innerText = randomUserMock[i].course
        currentRow.insertCell().innerText = randomUserMock[i].age
        currentRow.insertCell().innerText = randomUserMock[i].gender
        currentRow.insertCell().innerText = randomUserMock[i].country
    }

}


