module.exports = function(app) {
  var express = require('express');
  var booksRouter = express.Router();

  var books = [
    {
      id: 1,
      title: 'Hamlet',
      description: "Hamlet is Shakespeare's most popular, and most puzzling, play. It follows the form of a “revenge tragedy,” in which the hero, Hamlet, seeks vengeance against his father’s murderer, his uncle Claudius, now the king of Denmark. Much of its fascination, however, lies in its uncertainties.",
      author: 'William Shakespeare'
    },
    {
      id: 2,
      title: "One Flew Over the Cuckoo's Nest",
      description: "Boisterous, ribald, and ultimately shattering, Ken Kesey's One Flew Over the Cuckoo's Nest is the seminal novel of the 1960s that has left an indelible mark on the literature of our time. Here is the unforgettable story of a mental ward and its inhabitants, especially the tyrannical Big Nurse Ratched and Randle Patrick McMurphy, the brawling, fun-loving new inmate who resolves to oppose her. We see the struggle through the eyes of Chief Bromden, the seemingly mute half-Indian patient who witnesses and understands McMurphy's heroic attempt to do battle with the awesome powers that keep them all imprisoned.",
      author: 'Ken Kesey'
    },
    {
      id: 3,
      title: "1984",
      description: "While 1984 has come and gone, Orwell's narrative is more timely than ever. 1984 presents a \"negative utopia\", that is at once a startling and haunting vision of the world — so powerful that it's completely convincing from start to finish. No one can deny the power of this novel, its hold on the imaginations of entire generations of readers, or the resiliency of its admonitions — a legacy that seems to grow, not lessen, with the passage of time.",
      author: 'George Orwell'
    }
  ];

  booksRouter.get('/', function(req, res) {
    var data = [];
    books.forEach(function(item) {
      data.push({
        type: 'books',
        id: item.id.toString(),
        attributes: {
          title: item.title,
          description: item.description,
          author: item.author
        }
      });
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  booksRouter.post('/', function(req, res) {
    var newBook = req.body.data.attributes;
    var newId = books.length + 1;

    books.push({
      title: newBook.title,
      descrition: newBook.description,
      author: newBook.author,
      id: newId
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: {
        type: 'books',
        id: newId,
        attributes: newBook
      }
    });
  });

  booksRouter.get('/:id', function(req, res) {
    res.send({
      'books': {
        id: req.params.id
      }
    });
  });

  booksRouter.patch('/:id', function(req, res) {
    var bookAttrs = req.body.data.attributes;
    var bookId = req.param('id');
    books.forEach(function(item) {
      if (item.id === parseInt(bookId)) {
        item.title = bookAttrs.title;
        item.description = bookAttrs.description;
        item.author = bookAttrs.author;
      }
    });
    res.send({
      data: {
        type: 'books',
        id: bookId,
        attributes: bookAttrs
      }
    });
  });

  booksRouter.delete('/:id', function(req, res) {
    var bookId = req.param('id');
    for (var i = 0; i < books.length; i++) {
      if (parseInt(bookId) === books[i].id) {
        books.splice(i, 1);
        break;
      }
    }
    res.status(204).end();
  });

  app.use('/api/books', booksRouter);
};
