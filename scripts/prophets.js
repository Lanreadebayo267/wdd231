const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    displayProphets(data.prophets);
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName= document.createElement('h2');
        let birthInfo = document.createElement('p');
        let portrait = document.createElement('img');

        // Full Name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Birth info
        birthInfo.textContent = `Born: ${prophet.birthdate} in ${prophet.birthplace}`;

        // Portrait image
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day Prophet`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Build card
        card.appendChild(fullName);
        card.appendChild(birthInfo);
        card.appendChild(portrait);

        // Add card to container
        cards.appendChild(card);
   });
}

getProphetData();
