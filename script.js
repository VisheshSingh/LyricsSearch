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

function showData(data) {
  //   let output = '';

  //   data.data.forEach(song => {
  //     output += `
  //         <li>
  //             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //             <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //         </li>
  //       `;
  //   });

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
