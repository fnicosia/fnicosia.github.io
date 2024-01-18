const wordListContainer = document.getElementById('word-list');

const fetchDefinitionAndPlayPronunciation = (word) => {
  const url = `https://api.dictionaryapi.dev/v2/entries/en/%s`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url.replace('%s', word));
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0].text;
      const pronunciation = data.results[0].pronunciations[0].audioFile;

      const definitionElement = document.createElement('li');
      definitionElement.textContent = `Word: ${word}\nDefinition: ${definition}`;

      if (pronunciation) {
        const playButton = document.createElement('button');
        playButton.textContent = 'Play Pronunciation';
        playButton.addEventListener('click', () => {
          const audioElement = new Audio(`https://api.dictionaryapi.dev/v2/entries/en/${word}/audio/mp3/${pronunciation}`);
          audioElement.play();
        });

        definitionElement.appendChild(playButton);
      }

      wordListContainer.appendChild(definitionElement);
    } else {
      console.error(`Error fetching definition for word ${word}`);
    }
  };
  xhr.send();
};

const addWord = () => {
  const newWord = document.getElementById('new-word').value.trim();

  if (newWord) {
    fetchDefinitionAndPlayPronunciation(newWord);
    document.getElementById('new-word').value = '';
  }
};
