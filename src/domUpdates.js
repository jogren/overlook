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
    $('#customer-orders-total').hide();
    $('.customer-orders-article').hide();
    $('.current-customer').css("visibility", "hidden");
    $('#content-main').show();
    this.showMainPageContent(hotel);
    hotel.returnAllRoomServiceOrdersByDate('2019/07/28')
  },

  displaySectionOfPage(idName) {
    $('.content').hide();
    $(idName).show();
  },

  showMainPageContent(hotel) {
    $('#main-total-revenue').text(`$ ${hotel.calculateTotalRevenueByDate(this.displayCurrentDate())}`);
    $('#main-occupied-rooms').text(`${hotel.returnPercentRoomsOccupiedByDate(this.displayCurrentDate())}%`)
    $('#main-available-rooms').text(hotel.returnTotalNumberOfUnoccupiedRoomsByDate(this.displayCurrentDate()))
  },

  displayCurrentCustomer(currentCustomer) {
    $('.current-customer').css("visibility", "visible");
    $('#current-customer-name1').text(currentCustomer.name);
    $('#current-customer-name2').text(currentCustomer.name);
    $('#current-customer-name3').text(currentCustomer.name);
    $('#current-customer-name4').text(currentCustomer.name);
    this.appendCustomerRoomServiceBreakdown(currentCustomer);
    console.log(currentCustomer)
  },

  showErrorMessage(name) {
    $('#error-search-customer').append(`Whoops! We don't have a ${name} in our database. Please check your spelling or create a new customer!`);
    $("#input-search-customer").css("border", "red 2px solid");
    setTimeout(() => {
     $('#error-search-customer').hide();
     $("#input-search-customer").css("border", "");
    }, 3000);
  },

  appendAllFoodItemsAndCostByDate(roomServiceObjects) {
    $('.all-orders-error').html('');
    $('#table-all-orders').html('');
    if(roomServiceObjects.length === 0) {
      $('#article-all-orders').append(`<p class="all-orders-error">There are are no room service orders for this date.</p>`)
    } else {
      $('#article-all-orders').append(
        `<table id="table-all-orders">
        </table>`);
      roomServiceObjects.map(obj => {
        return $('#table-all-orders').append(
          `<tr>
            <td>
              ${obj.food}
            </td>
            <td>
              $${obj.cost}
            </td>
          </tr>`)
      });
    }
  },

  appendCustomerRoomServiceBreakdown(currentCustomer) {
    $('.customer-orders-article').show();
    $('#customer-orders-total').show();
    if(currentCustomer.roomServices.length) {
      $('.customer-orders-total-number').text(`$${currentCustomer.allTimeRoomServiceDebt()}`)
    } else {
      $('.customer-orders-total-number').text(`$0`)
    }
    $('.customer-orders-error').html('');
    $('#table-customer-orders').html('');
    if(currentCustomer.roomServices.length) {
      $('#article-customer-orders').append(`<table id="table-customer-orders">
        </table>`);
      currentCustomer.roomServices.map(obj => {
        return $('#table-customer-orders').append(
          `<tr>
            <td>
              ${obj.date}
            </td>
            <td>
              ${obj.food}
            </td>
            <td>
              $${obj.totalCost}
            </td>
          </tr>`)
      });
    } else {
      $('#table-customer-orders').append(`<p class="customer-orders-error">This user has no room service orders on file.</p>`)
    }
  }
}

export default domUpdates;