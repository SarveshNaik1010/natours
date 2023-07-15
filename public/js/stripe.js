/* eslint-disable*/
// import axios from 'axios';

const stripe = Stripe(
  `pk_test_51NPGtbSIMvKlxNw83N8XipQ6ss3omx98jtc6ZgSUQXD4N9ZRBHIFtfSX5DRf5zBXdFLklHG6BgQdzAfywCCqfpe900O7tL5g4G`
);
const bookTourBtn = document.getElementById('book-tour');

const bookTour = async (tourId) => {
  // 1. Get checkout session from API
  const session = await axios(
    `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
  );
  console.log(session);

  // 2. Use stripe object to create checkout form + charn credit card
};

bookTourBtn.addEventListener('click', function () {
    bookTour(bookTourBtn.dataset.tour.id);
});
