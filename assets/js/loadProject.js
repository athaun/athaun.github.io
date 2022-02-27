function $ (selector) {
    return document.querySelector(selector)
}

let selectedSkills = []
function filterProjects (clickedSkill) {
    let div = clickedSkill.target
    let id = clickedSkill.target.querySelector("p").id
    let skillName = clickedSkill.target.querySelector("h2").innerHTML
    console.log(skillName)

    if (selectedSkills.includes(skillName)) {
        selectedSkills.splice(selectedSkills.indexOf(skillName), 1)
    } else {
        selectedSkills.push(skillName)
    }

    div.classList.toggle("selected")
}

function generateProjectFilters (json) {
    let projectFilters = $("#projectFilters")
    let tagsList = json["tags"]
    
    // Make 3 columns and give them a unique ID
    for (let i = 0; i < tagsList.length/3; i ++) {
        let column = document.createElement("div")
        column.classList.add("column")
        column.id = "col-" + i

        projectFilters.appendChild(column)
    }

    // Loop through the skills list and append a new skill filter to each column at interval (i%3)
    for (let i in tagsList) {
        // Find the column to append to
        let column = $("#col-" + (i%3))

        // Build the skill from json data
        let skillName = Object.keys(tagsList[i])[0]
        let skillIcon = tagsList[i][skillName]
        let skillID = skillName.replace(/ /g, '-').toLowerCase()
        
        // Create the actual DOM element
        let skill = document.createElement("div")
        skill.innerHTML = `
                        <img style="pointer-events:none;" src="${skillIcon}" />
                        <h2 style="pointer-events:none;">${skillName}</h2>
                        <p style="pointer-events:none;" id="num-${skillID}"><span class="skillCount">0</span><span class="countLabel"> projects</span></p>
                        `
        skill.style.userSelect = "none"
        skill.onclick = filterProjects
        column.appendChild(skill)
    }
}

function countTag (json, tag) {
    let tags = json["tags"]
    tag = tag.toLowerCase()
    for (let i in tags) {
        if (tag == Object.keys(tags[i])[0].toLowerCase()) {
            let count = $("#num-" + tag.replace(/ /g, '-')).querySelector(".skillCount")
            let label = $("#num-" + tag.replace(/ /g, '-')).querySelector(".countLabel")
            count.innerHTML ++

            if (count.innerHTML == 1) {
                label.innerHTML = " project"
            } else {
                label.innerHTML = " projects"
            }
        }
    }
    // console.log(result)
}

function generateProjectList (json) {
    let projectsParent = $("#mainContent > div.projectsList")
    let projects = json["projectList"]

    for (let i in projects) {
        let p = projects[i]
        
        let name = p["name"]
        let description = p["description"]
        let tags = ``
        for (let j in p["tags"]) {
            tags += `<li>${p["tags"][j]}</li>`
            countTag(json, p["tags"][j])
        }
        let links = ``
        for (let j in p["links"]) {
            // If the URL isn't empty, add a link for it
            // I know it is hideous, it is grabbing the value (URL) without directly knowing the key (name)
            let linkType = Object.keys(p["links"][j])[0]
            let url = p["links"][j][linkType]
            if (url != "") {
                links += `
                <a href="${url}" target="_blank">
                    <img src="assets/icons/${linkType}.png" alt="">
                </a>
                `
            }
        }
        let thumbnail = p["thumbnail"]

        let projectCard = document.createElement("div")
        projectCard.classList += "fadeIn"
        projectCard.innerHTML = `
        <div>
            <h2>${name}</h2>
            <p>${description}</p>
            <p>
                <ul>
                    ${tags}
                </ul>
            </p>
            <div class="links">
                ${links}
            </div>
        </div>
        <div>
            <img src="${thumbnail}">
        </div>
        `

        projectsParent.appendChild(projectCard)
        if (i == projects.length - 1) {
            projectsParent.appendChild(document.createElement("br"))
        }
    }
}

fetch("../../data/projects.json")
.then(response => {
   return response.json();
})
.then(json => {
    generateProjectFilters(json)
    generateProjectList(json)

    checkScroll()
    window.addEventListener('scroll', debounce(checkScroll));
})