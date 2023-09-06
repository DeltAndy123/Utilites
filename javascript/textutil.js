// Taken and modified from
// https://github.com/ajayyy/DeArrow/blob/master/src/titles/titleFormatter.ts

export function cleanText(title) {
  return cleanPunctuation(title)
    .replace(/(^|\s)>(\S)/g, "$1$2")
    .trim();
}

function cleanWordPunctuation(title) {
  const words = title.trim().split(" ");
  if (words.length > 0 && forceKeepFormatting(words[words.length - 1], false)) {
    return title;
  }

  let toTrim = 0;
  let questionMarkCount = 0;
  for (let i = title.length - 1; i >= 0; i--) {
    toTrim = i;

    if (title[i] === "?") {
      questionMarkCount++;
    } else if (title[i] !== "!" && title[i] !== "." && title[i] !== " ") {
      break;
    }
  }

  let cleanTitle = toTrim === title.length ? title : title.substring(0, toTrim + 1);
  if (questionMarkCount > 0) {
    cleanTitle += "?";
  }

  return cleanTitle;
}

export function cleanPunctuation(title) {
  title = cleanWordPunctuation(title);
  const words = title.split(" ");

  let result = "";
  let index = 0;
  for (let word of words) {
    if (!forceKeepFormatting(word, false)
      && index !== words.length - 1) { // Last already handled
      if (word.includes("?")) {
        word = cleanWordPunctuation(word);
      } else if (word.match(/[!]+$/)) {
        if (words.length > index + 1 && !isDelimeter(words[index + 1])) {
          // Insert a period instead
          word = cleanWordPunctuation(word) + ". ";
        } else {
          word = cleanWordPunctuation(word);
        }
      }
    }

    word = word.trim();
    if (word.trim().length > 0) {
      result += word + " ";
    }

    index++;
  }

  return result.trim();
}

export function cleanEmojis(title) {
  // \uFE0F is the emoji variation selector, it comes after non colored symbols to turn them into emojis
  // \uFE0E is similar but makes colored emojis into non colored ones
  // \u200D is the zero width joiner, it joins emojis together

  const cleaned = title
    // Clear extra spaces between emoji "words"
    .replace(/ ((?=\p{Extended_Pictographic})(?=[^🅰🆎🅱🆑🅾])\S(?:\uFE0F?\uFE0E?\p{Emoji_Modifier}?\u200D?)*)+(?= )/ug, "")
    // Emojis in between letters should be spaces, varient selector is allowed before to allow B emoji
    .replace(/(\p{L}|[\uFE0F\uFE0E🆎🆑])(?:(?=\p{Extended_Pictographic})(?=[^🅰🆎🅱🆑🅾])\S(?:\uFE0F?\uFE0E?\p{Emoji_Modifier}?\u200D?)*)+(\p{L}|[🅰🆎🅱🆑🅾])/ug, "$1 $2")
    .replace(/(?=\p{Extended_Pictographic})(?=[^🅰🆎🅱🆑🅾])\S(?:\uFE0F?\uFE0E?\p{Emoji_Modifier}?\u200D?)*/ug, "")
    .trim();

  if (cleaned.length > 0) {
    return cleaned;
  } else {
    return title;
  }
}