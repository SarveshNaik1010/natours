const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  // 1. Get all the tour data from the collection
  const tours = await Tour.find();

  // 2. Build template

  // 3. Render the template using tour data from 1
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://api.mapbox.com https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js https://events.mapbox.com https://tile.openstreetmap.org'
    )
    .render('overview', {
      title: 'All Tours',
      tours,
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. Get the tour based on the name in the params and get the reviews
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user tour',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }

  // 2. Build the template

  // 3. Render the template using 1
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      'connect-src https://*.tiles.mapbox.com https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js https://api.mapbox.com https://events.mapbox.com https://tile.openstreetmap.org'
    )
    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js https://cdnjs.cloudflare.com"
    )
    .render('login', {
      title: 'Login into your account',
    });
});

exports.getAccount = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js https://cdnjs.cloudflare.com"
    )
    .render('account', {
      title: 'Your account',
    });
};

// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
//   res
//     .status(200)
//     .set(
//       'Content-Security-Policy',
//       "connect-src 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js https://cdnjs.cloudflare.com"
//     )
//     .render('account', {
//       title: 'Your account',
//       user: updatedUser,
//     });
// });
