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
    $('#p__booking-text').hide();
    $('#button-confirm-booking').hide();
    $('#p__room-service-text').hide();
    $('#button-confirm-room-service').hide();
    $('#p__room-service-total').hide();
    $('#show-available-rooms').hide();
    $('.article-rooms1').hide();
    $('.article-rooms2').hide();
    $('.form__all-rooms').hide();
    $('#button__filter-room-type').hide();
    $('.rooms-content-container').hide();
    this.showMainPageContent(hotel);
    this.showRoomsPageContent(hotel);
    hotel.returnAllRoomServiceOrdersByDate(this.displayCurrentDate())
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

  showRoomsPageContent(hotel) {
    $('#most-popular-date').text(hotel.findMostAndLeastPopularBookingDate('high'));
    $('#least-popular-date').text(hotel.findMostAndLeastPopularBookingDate('low'))
  },

  displayCurrentCustomer(currentCustomer) {
    $('.article-all-rooms1').hide();
    $('.article-all-rooms2').hide();
    $('.all-rooms-container').hide();
    $('.search-rooms-available-container').hide();
    $('#button__filter-room-type').hide();
    $('#show-available-rooms').show();
    $('.article-rooms1').show();
    $('.article-rooms2').show();
    $('.rooms-content-container').show();
    $('.current-customer').css("visibility", "visible");
    $('#current-customer-name1').text(currentCustomer.name);
    $('#current-customer-name2').text(currentCustomer.name);
    $('#current-customer-name3').text(currentCustomer.name);
    $('#current-customer-name4').text(currentCustomer.name);
    this.appendCustomerRoomServiceBreakdown(currentCustomer);
    this.displayCustomerBookingsBreakdown(currentCustomer);
  },

  showErrorMessage(name) {
    $('#error-search-customer').append(`Whoops! We don't have that name in our database. Please check your spelling or create a new customer!`);
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
      $('#table-all-orders').hide();
      $('#article-all-orders').append(`<p class="all-orders-error">There are are no room service orders for this date.</p>`)
    } else {
      $('#table-all-orders').show();
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
      console.log('no room services');
      $('#article-customer-orders').append(`<p class="customer-orders-error">This user has no room service orders on file.</p>`)
    }
  },

  showRoomsAvailable(availableRooms) {
    $('.tr__available-rooms-header').html('');
    $('.tr__available-rooms').hide();
    $('#show-available-rooms').hide();
    $('#button__filter-room-type').show();
    $('#table-available-rooms').append(
      `<tr class="tr__available-rooms-header">
        <th>Room Number</th>
        <th>Room Type</th>
        <th>Number of Beds</th>
        <th>Bed Size</th>
        <th>Bidet</th>
        <th>Price</th>
      </tr>`)
    availableRooms.map(room => {
      return $('#table-available-rooms').append(
        `<tr class="tr__available-rooms" data-id="${room.number}" tabindex="0">
          <td class="td__available-rooms" data-id="${room.number}">${room.number}</td>
          <td class="td__available-rooms" data-id="${room.number}">${room.roomType}</td>
          <td class="td__available-rooms" data-id="${room.number}">${room.numBeds}</td>
          <td class="td__available-rooms" data-id="${room.number}">${room.bedSize}</td>
          <td class="td__available-rooms" data-id="${room.number}">${room.bidet}</td>
          <td class="td__available-rooms" data-id="${room.number}">$${room.costPerNight}</td>
        </tr>`)
    })
  },

  displayBookingInquiry(targetRoom) {
    $('#button__filter-room-type').hide();
    $('#booking-room-number').text(targetRoom.number);
    $('#booking-dollar-amount').text(targetRoom.costPerNight);
    $('#p__booking-text').show();
    $('#button-confirm-booking').show();
  },

  displayCustomerBookingsBreakdown(currentCustomer) {
    $('#button-confirm-booking').hide();
    $('#p__booking-text').hide();
    $('#table-bookings-breakdown').html('');
    $('#p__booking-name').text(currentCustomer.name);
    if(currentCustomer.bookings.length === 0) {
      $('#bookings-breakdown-error').append(`<p class="p__booking-error">${currentCustomer.name} has zero bookings on file.</p>`)
    } else {
      $('#table-bookings-breakdown').append(
        `<tr>
          <th class="th__bookings-breakdown">Date</th>
          <th class="th__bookings-breakdown">Room Number</th>
        </tr>`)
      currentCustomer.bookings.map(booking => {
        return $('#table-bookings-breakdown').append(
          `<tr>
            <td>${booking.date}</td>
            <td>${booking.roomNumber}</td>
          </tr>`)
      })
    }
  },

  displayRoomServiceMenu(roomServices) {
    $('#bookings-breakdown-error').hide();
    $('#table-available-rooms').hide();
    $('#p__room-service-text').show();
    $('#button-confirm-room-service').show();
    $('#p__room-service-total').show();
    $('#table-room-service-menu').append(
      `<tr>
        <th>Food</th>
        <th>Price</th>
        <th>Select Item</th>
      </tr>`)
    roomServices.map(item => {
      return $('#table-room-service-menu').append(
        `<tr class="tr__room-service-item" data-id="${item.totalCost}">
          <td class="td__room-service-item" data-id="${item.totalCost}">${item.food}</td>
          <td class="td__room-service-item" data-id="${item.totalCost}">${item.totalCost}</td>
          <td class="td__room-service-item" data-id="${item.totalCost}"><input type="checkbox" class="menu-checkbox" id="menu-checkbox"></td>
        </tr>`)
    })
  },

  updateRoomServiceTotal(totalCost) {
    $('#room-service-total-number').text(totalCost.toFixed(2));
  },

  resetRoomsPage(customer) {
    $('#p__room-service-text').hide();
    $('#button-confirm-room-service').hide();
    $('#p__room-service-total').hide();
    $('.rooms-content-container').hide();
    $('#confirm-room-service-text').append(
      `<p class="p__room-service-confirmation">Room service for ${customer.name} has been submitted. Thank you!</p>
      <button class="button__main-menu" id="button__main-menu" onClick="window.location.reload()">Return to the main menu</button>`)
  }, 

  displayAllRoomsAvailableByDate(roomsAvailable) {
    $('#table__all-rooms-by-date').html('');
    $('.article-all-rooms2').prepend(
      `<table id="table__all-rooms-by-date">
        <tr>
          <th>Room Number</th>
          <th>Room Type</th>
          <th>Number of Beds</th>
          <th>Bed Size</th>
          <th>Bidet</th>
          <th>Price</th>
        </tr>
      </table>`);
    roomsAvailable.map(room => {
      return $('#table__all-rooms-by-date').append(
        `<tr class="tr__all-rooms-by-date" data-id="${room.number}">
          <td class="td__all-rooms-by-date" data-id="${room.number}">${room.number}</td>
          <td class="td__all-rooms-by-date" data-id="${room.number}">${room.roomType}</td>
          <td class="td__all-rooms-by-date" data-id="${room.number}">${room.numBeds}</td>
          <td class="td__all-rooms-by-date" data-id="${room.number}">${room.bedSize}</td>
          <td class="td__all-rooms-by-date" data-id="${room.number}">${room.bidet}</td>
          <td class="td__all-rooms-by-date" data-id="${room.number}">$${room.costPerNight}</td>
        </tr>`)
    })
  },

  handleAllRoomsFilter() {
    $('#table-available-rooms').toggle();
    $('.form__all-rooms').toggle()
  }
}

export default domUpdates;