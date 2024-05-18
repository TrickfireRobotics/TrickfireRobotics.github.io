//DO NOT CHANGE DELIMITERs
const DELIMITER_BEG =
    'DO NOT DELETE THIS TEXT AND INCLUDE A SPACE AFTER COLON: ';
// 2 Ending because for some reason fetching from google doc has to
const DELIMITER_END1 = '</span>';
const DELIMITER_END2 = '"';

const deadlineElements = document.querySelectorAll('[data-deadline]');

fetch(
    //public view only url
    //trickfirerobotics@gmail.com
    'https://docs.google.com/document/d/1tRysVWzUv-sKNg6lWe7n-CvKLZU0HNW3SZiIs19d09Q/edit?usp=sharing'
)
    .then(res => {
        //check to make sure API works
        if (!res.ok) {
            throw new error('DEADLINE TEXT API NOT WORKING');
        }
        return res.text();
    })
    .then(text => {
        let indexBeg = text.indexOf(DELIMITER_BEG) + DELIMITER_BEG.length;
        let indexEnd = Math.min(
            text.indexOf(DELIMITER_END1, indexBeg),
            text.indexOf(DELIMITER_END2, indexBeg)
        );
        //Catches if the DELIMITER isn't found
        if (indexBeg == -1 + DELIMITER_BEG.length || indexEnd == -1) {
            throw new Error('DELIMITER WAS NOT FOUND');
        }

        const deadlineText = `Deadline: ${text.substring(indexBeg, indexEnd)}`;
        //safety check to make sure it didn't go over
        if (deadlineText.length > 100) {
            throw new Error('TEXT WAS OVER 100 CHARS');
        }
        deadlineElements.forEach(ele => {
            ele.innerText = deadlineText;
        });
    })
    .catch(error => {
        console.error(error);
    });
