interface IDestination {
  _id?: string;
  name: string;
  country: string;
  category?: string;
  price: string | number;
  duration: string;
  imageUrl?: string;
  departureDate?: string;
  bookingId?: string;
  destinationId?: string;
  status?: string;
  rating?: number;
  reviews?: number;
  description?: string;
}

export default IDestination;
