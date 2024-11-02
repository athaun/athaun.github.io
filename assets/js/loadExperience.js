document.addEventListener('DOMContentLoaded', function() {
    fetch('../../data/experience.json')
        .then(response => response.json())
        .then(data => {
            const experienceContainer = document.querySelector('.experienceList');
            data.forEach(experience => {
                const card = document.createElement('div');
                card.classList.add('card');

                const header = document.createElement('div');
                header.classList.add('card-header');

                if (experience.logo) {
                    const logo = document.createElement('img');
                    logo.src = experience.logo;
                    logo.alt = `${experience.company} logo`;
                    logo.classList.add('company-logo');
                    header.appendChild(logo);
                } else {
                    const logo = document.createElement('div');
                    logo.style.backgroundColor = '#2f2f2f';
                    logo.classList.add('company-logo');
                    header.appendChild(logo);
                }

                const textContainer = document.createElement('div');
                textContainer.classList.add('text-container');

                const position = document.createElement('h3');
                position.textContent = `${experience.position}`;
                textContainer.appendChild(position);

                const company = document.createElement('p');
                if (experience.link) {
                    const link = document.createElement('a');
                    link.href = experience.link;
                    link.textContent = experience.company;
                    link.target = '_blank';
                    textContainer.appendChild(link);
                } else {
                    company.textContent = experience.company;
                    company.textContent = experience.company;
                    textContainer.appendChild(company);
                }

                const duration = document.createElement('p');
                duration.textContent = `${experience.type}. ${experience.duration}`;
                textContainer.appendChild(duration);

                
                const descriptionList = document.createElement('ul');
                experience.description.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = item;
                    descriptionList.appendChild(listItem);
                });
                
                textContainer.appendChild(descriptionList);
                header.appendChild(textContainer);
                card.appendChild(header);

                experienceContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading experience:', error));
});