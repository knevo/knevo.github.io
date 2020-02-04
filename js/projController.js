const portfolioImgUrl = 'assets/img/portfolio/'
var gPageNum;
function init() {
  createProjects()
  renderPortfolio()
  renderNav()
}

function renderPortfolio() {
  var $portContainer = $('.portfolio-container')
  projects = getProjectsToRender()

  var htmls = projects.map(function (proj) {
    return `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" data-id="${proj.id}" onclick="onReadPortfolio(this)">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content" ">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${portfolioImgUrl + proj.id}.jpg" alt="${proj.title}">
        </a>
        <div class="portfolio-caption">
          <h4>${proj.name}</h4>
          <p class="text-muted">${proj.title}</p>
        </div>
      </div>`
  })
  $portContainer.html(htmls)
}

function renderNav() {
  var lis = ''
  var className;
  gPageNum = Math.ceil(getProjectsAmount() / projPerPage);
  for (let i = 0; i < gPageNum; i++) {
    if (i === getCurrentPage()) className = 'active'
    lis += `<li class="page-item ${className}">
      <a class="page-link" onclick="onPageChange(this)" data-val="${i}">${i + 1}</a>
    </li>`
    className = ''
  }
  $('#nav-bar-pages').html(lis)

}

function onReadPortfolio(elProj) {
  setCurrentProject(elProj.dataset.id)
  renderPortfolioModal()
}

function renderPortfolioModal() {
  var $modalContainer = $('#portfolioModal')
  $modalContainer.find('#proj-name').text(`${gCurrProj.name}`)
  $modalContainer.find('#proj-desc').text(`${gCurrProj.desc}`)
  $modalContainer.find('#proj-date').text(`${gCurrProj.publishedAt}`)
  $modalContainer.find('#proj-title').text(`${gCurrProj.title}`)
  $modalContainer.find('#proj-category').text(`${gCurrProj.category}`)
  $modalContainer.find('#proj-img').attr("src", `${portfolioImgUrl + gCurrProj.id}.jpg`);
  $modalContainer.find('#proj-link').click(function () {
    window.open(gCurrProj.url, '_blank');
  })
  $modalContainer.modal()
}

function onShowContactModal() {
  $('#contactModal').modal()
}

function onSendMessage() {
  var email = $('#recipient-email').val()
  var subject = $('#message-subject').val()
  var message = $('#message-text').val()

  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`, '_blank');

  $('#recipient-email').val('')
  $('#message-subject').val('')
  $('#message-text').val('')
}
function onPageChange(elPage) {
  setCurrentPage(+elPage.dataset.val)
  renderNav()
  renderPortfolio()
}

function onPageShift(elShift) {
  var currPage = getCurrentPage()
  var diff = +elShift.dataset.val
  currPage += diff
  setCurrentPage((currPage + gPageNum) % gPageNum)

  renderNav()
  renderPortfolio()
}