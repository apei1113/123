const { render } = require('ejs');
const { json } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM `0521`.books_copy ORDER BY ClassName desc');
    data = rows;
    // res.json(data);
    res.render('assignments', { data });
  } catch (err) {
    console.log('Errors on getting assignments!');
    res.render('assignments', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  // res.send('display add book page')
  res.render('assignments/add', {
    // name: '',
    // author: '',
    ClassName: '',
    HW_Name: '',
    HW_Grade: '',
  });
});

// add a new book
router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.')

  // const name = req.body.name;
  // const author = req.body.author;
  const ClassName = req.body.ClassName;
  const HW_Name = req.body.HW_Name;
  const HW_Grade = req.body.HW_Grade;

  // console.log(name, author);
  console.log(ClassName, HW_Name, HW_Grade);

  const form_data = {
    // name: name,
    // author: author,
    ClassName: ClassName,
    HW_Name: HW_Name,
    HW_Grade: HW_Grade,
  };
  
  try {
    await db.query('INSERT INTO `0521`.books_copy SET ?', form_data);
    res.redirect('/assignments');
  } catch(err) {
    console.log(err);
    res.render('assignments/add', {
      // name: form_data.name,
      // author: form_data.author
      ClassName: form_data.ClassName,
      HW_Name: form_data.HW_Name,
      HW_Grade: form_data.HW_Grade
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  // res.send('display edit book page');
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM `0521`.assignments_copy WHERE id = ?', [id]);
    res.render('assignments/edit', {
      id: rows[0].id,
      // name: rows[0].name,
      // author: rows[0].author
      ClassName: rows[0].ClassName,
      HW_Name: rows[0].HW_Name,
      HW_Grade: rows[0].HW_Grade
    });
  } catch(err) {
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
  // res.send('update book data');
  // const name = req.body.name;
  // const author = req.body.author;
  const ClassName = req.body.ClassName;
  const HW_Name = req.body.HW_Name;
  const HW_Grade = req.body.HW_Grade;
  const id = req.body.id;

  try {
      await db.query('UPDATE `0521`.books_copy SET ClassName = ?, HW_Name = ?, HW_Grade = ? WHERE id = ?',[
      // name,
      // author,
      ClassName,
      HW_Name,
      HW_Grade,
      id,
    ]);
    // res.status(200).json({ message: 'Updating successful' });
    res.redirect('/assignments');
  } catch(err){
    console.log(err);
  }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
// router.get('/delete/:ClassName', async function (req, res, next) {
  let id = req.params.id;
  // let ClassName = req.params.ClassName;

  try {
    await db.query('DELETE FROM `0521`.books_copy WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/assignments');
});

module.exports = router;
