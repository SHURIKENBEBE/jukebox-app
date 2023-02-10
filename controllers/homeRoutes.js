const router = require('express').Router();
const { Song, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    console.log('ding');
  try {
    // Get all projects and JOIN with user data
    const songData = await Song.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        
        },
      ],
    });

    // Serialize data so the template can read it
    const songs = songData.map((song) => song.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      songs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
  try {
    const songData = await Song.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const song = songData.get({ plain: true });

    res.render('profile', {
      ...song,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
});
  
module.exports = router;
  



// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

