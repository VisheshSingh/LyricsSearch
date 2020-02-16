const form = document.getElementById('form');
const search = document.getElementById('search');
const results = document.getElementById('results');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  results.innerHTML = `
    <ul class="songs">
        ${data.data
          .map(
            song =>
              `
            <li>
              <span>
                <strong>${song.artist.name}</strong> - ${song.title}
              </span>
              <button
                class='btn'
                data-artist='${song.artist.name}'
                data-songtitle='${song.title}'
              >
                Get Lyrics
              </button>
            </li>`
          )
          .join('')}   
    </ul>
  `;

  if (data.prev || data.next) {
    // console.log(data.next);
    more.innerHTML = `
    ${
      data.prev
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
        : ''
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
        : ''
    }
  `;
  } else {
    more.innerHTML = '';
  }
}

// Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert('Enter an artist or song name');
  } else {
    searchSongs(searchTerm);
  }
});
