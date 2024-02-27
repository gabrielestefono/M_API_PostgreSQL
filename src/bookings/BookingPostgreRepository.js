const db = require('../../database/index.js');
const Booking = require('./Booking.js');

class BookingPostgreRepository {
  constructor() {
    this.db = db;
  }

  async findAll() {
    const storeBookings = await this.db.manyOrNone('SELECT id, room_id as "roomId", guest_name as "guestName", check_in_date as "checkInDate", check_out_date as "checkOutDate", user_id as "userId" FROM Bookings');
    return storeBookings.map(booking => new Booking(booking));
  }

  async create(booking) {
    await this.db.none('INSERT INTO Bookings(room_id, guest_name, check_in_date, check_out_date, user_id, id) VALUES(${roomId}, ${guestName}, ${checkInDate}, ${checkOutDate}, ${user}, ${id})', booking);
  }
}

module.exports = BookingPostgreRepository