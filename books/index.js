import { XMLParser } from 'fast-xml-parser';

const url = `https://www.goodreads.com/review/list_rss/${process.env.GOODREADS_USER_ID}?key=&shelf=currently-reading`

// Parse XML to JSON
const parseXML = (xml) => {
  const parser = new XMLParser();
  const json = parser.parse(xml);
  return json;
}

const getBooks = (bookArray) => {
  let books = [];
  for (const book of bookArray) {
    books.push(`- [${book["title"]}](https://www.goodreads.com/book/show/${book["book_id"]}) by ${book["author_name"]}`)
  }
  return books;
}

fetch(url)
  .then(response => response.text())
  .then(data => {
    const json = parseXML(data);
    let items = json["rss"]["channel"]["item"];

    if(!Array.isArray(items)){
      items = [items];
    }
    const bookLines = getBooks(items);
    console.log(bookLines.join("\n"));
  });