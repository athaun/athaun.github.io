document.addEventListener('DOMContentLoaded', function() {
    const orcidId = '0000-0002-2821-6263'; // Replace with your ORCID ID
    const apiUrl = `https://pub.orcid.org/v3.0/${orcidId}/works`;

    fetch(apiUrl, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const publicationsContainer = document.querySelector('.publicationsList');
        const works = data.group;

        works.forEach(work => {
            const workSummary = work['work-summary'][0];
            const title = workSummary.title.title.value;
            const journal = workSummary['journal-title'] ? workSummary['journal-title'].value : 'N/A';
            const publicationDate = workSummary['publication-date'] ? `${workSummary['publication-date'].year.value}-${workSummary['publication-date'].month ? workSummary['publication-date'].month.value : '01'}-${workSummary['publication-date'].day ? workSummary['publication-date'].day.value : '01'}` : 'N/A';
            const url = workSummary['external-ids']['external-id']
                .find(id => id['external-id-type'] === 'doi') 
                ? `https://doi.org/${workSummary['external-ids']['external-id']
                    .find(id => id['external-id-type'] === 'doi')['external-id-value']}`
                : (workSummary.url ? workSummary.url.value : null);
                
            const abstract = workSummary['citation'] && workSummary['citation']['citation-description'] ? workSummary['citation']['citation-description'] : '';
            type = workSummary['type'] ? workSummary['type'].replace('-', ' ').toLowerCase() : 'N/A';
            type = type.charAt(0).toUpperCase() + type.slice(1);

            const card = document.createElement('div');
            card.classList.add('card');

            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            titleElement.classList.add('card-title');
            card.appendChild(titleElement);

            const publishedElement = document.createElement('p');
            publishedElement.textContent = `${type} for ${journal}, ${publicationDate}`;
            card.appendChild(publishedElement);
        
            const abstractElement = document.createElement('p');
            abstractElement.textContent = abstract;
            card.appendChild(abstractElement);

            if (url) {
                const linkWrapper = document.createElement('a');
                linkWrapper.href = url;
                linkWrapper.target = '_blank';
                linkWrapper.appendChild(card);
                publicationsContainer.appendChild(linkWrapper);
            } else {
                publicationsContainer.appendChild(card);
            }
        });
    })
    .catch(error => console.error('Error loading publications:', error));
});