enum Towns {
  Kraków,
  Warszawa,
  Tarnów,
}
enum Status {
  On,
  Off,
}

export default interface Campaign {
  campaignName: String;
  keywords: String;
  bidAmount: Number;
  campaignFund: Number;
  status: Status;
  town: Towns;
  radius: Number;
}
