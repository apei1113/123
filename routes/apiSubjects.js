const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res, next) {
    // let data;
    try {
      const response = await fetch('http://localhost:1337/subjects');
      const data = await response.json();

      res.render('apiSubjects/index', { data });
    } catch (err) {
      console.log('Errors on getting subjects!');
      res.render('apiSubjects/index', { data: '' });
    }
  });

// display add book page
router.get('/add', async function (req, res, next) {
  // res.send('display add book page')
  res.render('apiSubjects/add', {
    Name: '',
    Code: '',
    professor: '',
    teaching_assistant: '',
    Department_of_Courses: '',
    credits: '',
  });
});

// add a new book
router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.')

  const Name = req.body.Name;
  const Code = req.body.Code;
  const professor = req.body.professor;
  const teaching_assistant = req.body.teaching_assistant;
  const Department_of_Courses = req.body.Department_of_Courses;
  const credits = req.body.credits;

  // console.log(name, author);
  console.log(Name, Code, professor, teaching_assistant, Department_of_Courses, credits);

  const form_data = {
    Name: Name,
    Code: Code,
    professor: professor,
    teaching_assistant: teaching_assistant,
    Department_of_Courses: Department_of_Courses,
    credits: credits,
  };
  
  try {
    // await db.query('INSERT INTO `0521`.books_copy SET ?', form_data);//透過SQL抓資料
    const response = await fetch('http://localhost:1337/subjects', {
        method: 'post',
        body:    JSON.stringify(form_data),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    res.redirect('/apiSubjects');
  } catch(err) {
    console.log(err);
    res.render('apiSubjects/add', {
      Name: form_data.Name,
      Code: form_data.Code,
      professor: form_data.professor,
      teaching_assistant: form_data.teaching_assistant,
      Department_of_Courses: form_data.Department_of_Courses,
      credits: form_data.credits,
    });
  }
});

// display edit book page
  router.get('/edit/:id', async function (req, res, next) {
    // res.send('display edit book page');
    const id = req.params.id;
    try {
      const response = await fetch(`http://localhost:1337/subjects/${id}`);
      const data = await response.json();
      
      res.render('apiSubjects/edit', {
        id: data.id,
        Name: data.Name,
        Code: data.Code,
        professor: data.professor,
        teaching_assistant: data.teaching_assistant,
        Department_of_Courses: data.Department_of_Courses,
        credits: data.credits
      });
    } catch(err) {
      console.log(err);
    }
  });

router.post('/update', async function (req, res, next) {
  // res.send('update subjects data');
  const Name = req.body.Name;
  const Code = req.body.Code;
  const professor = req.body.professor;
  const teaching_assistant = req.body.teaching_assistant;
  const Department_of_Courses = req.body.Department_of_Courses;
  const credits = req.body.credits;
  const id = req.body.id;

  const form_data = {
    Name: Name,
    Code: Code,
    professor: professor,
    teaching_assistant: teaching_assistant,
    Department_of_Courses: Department_of_Courses,
    credits: credits,
  };

  try {

      const response = await fetch(`http://localhost:1337/subjects/${id}`, {
        method: 'put',
        body:    JSON.stringify(form_data),
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    res.redirect('/apiSubjects');
  } catch(err){
    console.log(err);
  }
});

router.get('/delete/:id', async function (req, res, next) {
    let id = req.params.id;
  
    try {
        const response = await fetch(`http://localhost:1337/subjects/${id}`, {
        method: 'delete'
      });

    const data = await response.json();

    res.redirect('/apiSubjects');

    } catch (err) {
      console.log(err);
    }
    res.redirect('/subjects');
  });

module.exports = router;