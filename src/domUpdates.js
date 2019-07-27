import $ from 'jquery';

let domUpdates = {

  displayCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${yyyy}/${mm}/${dd}`
    return today;
  },

  displayPageOnLoad(hotel) {
    $('.content').hide();
    $('.current-customer').css("visibility", "hidden");
    $('#content-main').show();
    this.showMainPageContent(hotel);
  },

  displaySectionOfPage(idName) {
    $('.content').hide();
    $(idName).show();
  },

  showMainPageContent(hotel) {
    $('#main-total-revenue').text(`$ ${hotel.calculateTotalRevenueByDate(this.displayCurrentDate())}`);
    $('#main-occupied-rooms').text(`% ${hotel.returnPercentRoomsOccupiedByDate(this.displayCurrentDate())}`)
    $('#main-available-rooms').text(hotel.returnTotalNumberOfUnoccupiedRoomsByDate(this.displayCurrentDate()))
  },

  displayCurrentCustomer(name) {
    $('.current-customer').css("visibility", "visible");
    $('#current-customer-name1').text(name);
    $('#current-customer-name2').text(name);
    $('#current-customer-name3').text(name);
    $('#current-customer-name4').text(name);
  },

  showErrorMessage(name) {
    $('#error-search-customer').append(`Whoops! We don't have a ${name} in our database. Please check your spelling or create a new customer!`);
    $("#input-search-customer").css("border", "red 2px solid");
    setTimeout(() => {
     $('#error-search-customer').hide();
     $("#input-search-customer").css("border", "");
    }, 3000);
  },

}

export default domUpdates;