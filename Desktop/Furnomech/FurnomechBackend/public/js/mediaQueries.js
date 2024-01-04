const observeMedia = function () {
  const projectCard = document.querySelector('.card-projects');
  const categoryCard = document.querySelector('.card-categories');
  [projectCard, categoryCard].forEach((card, i) => {
    card.addEventListener('click', function() {
        this.classlist.remove('animate-card');
    })
  })

};

const x = window.matchMedia("(max-width: 769px)").matches
  ? window.matchMedia("(max-width: 700px)")
  : false;

if (x) {
  observeMedia(x);
}
