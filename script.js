document.getElementById('getAllCharacters').addEventListener('click', getAllCharacters);
document.getElementById('filterCharacters').addEventListener('click', filterCharacters);

async function getAllCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        showError('Failed to fetch characters');
    }
}

async function filterCharacters() {
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const type = document.getElementById('type').value;
    const gender = document.getElementById('gender').value;

    const url = new URL('https://rickandmortyapi.com/api/character');
    if (name) url.searchParams.append('name', name);
    if (status) url.searchParams.append('status', status);
    if (species) url.searchParams.append('species', species);
    if (type) url.searchParams.append('type', type);
    if (gender) url.searchParams.append('gender', gender);

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        showError('Failed to fetch filtered characters');
    }
}

function displayCharacters(characters) {
    const container = document.getElementById('characterContainer');
    container.innerHTML = '';
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.className = 'character';
        characterElement.innerHTML = `
            <img src="${character.image}" alt="${character.name}" style="width: 100%; border-radius: 5px;">
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Type: ${character.type}</p>
            <p>Gender: ${character.gender}</p>
        `;
        container.appendChild(characterElement);
    });
}

function showError(message) {
    const container = document.getElementById('characterContainer');
    container.innerHTML = `<p style="color: red;">${message}</p>`;
}
