const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);

            //🔺 AUDIO DECRIPTION
            const phonetics = data[0].phonetics;
            let audioSrc = "";

            // Looping through the phonetics array to find the first non-empty audio value
            for (let i = 0; i < phonetics.length; i++) {
                if (phonetics[i].audio) {
                    audioSrc = phonetics[i].audio;
                    break; // Exit the loop once a non-empty value is found
                }
            }

            // Set the audio source if a valid audio URL was found
            if (audioSrc) {
                sound.setAttribute("src", audioSrc);
            } else {
                console.log("No valid audio found.");
            }


            //🔺 OUTPUTS RESULTS
            let content = `   
            <div class="word">
                <h3>${inpWord}</h3>

            ${audioSrc
                    ?
                    `<button class="vol-btn" onclick="playSound()">
                      <i class="fas fa-volume-up sound-icon"></i>
                   </button> `
                    :
                    ""
                }

            </div>  `;

            // Loop through the meanings array and generate the HTML for each meaning
            data[0].meanings.forEach((meaning) => {
                content += `
                    <div class="sections">

                        <div class="details">
                            <p>&#x2022; ${meaning.partOfSpeech}</p>
                            <p>/${data[0].phonetic}/</p>
                        </div>


                        <p class="word-meaning">
                            ${meaning.definitions[0].definition}
                        </p>
                        <p class="word-example">

                        
             ${meaning.definitions[0].example
                        ? `<div class='ex-title'> Example </div> `
                        : ""
                    }
                            ${meaning.definitions[0].example || ""}
                        </p>
                    </div>
                `;
            });

            result.innerHTML = content;
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});
function playSound() {
    sound.play();
}
