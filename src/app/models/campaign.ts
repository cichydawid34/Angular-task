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
  campaignName: string;
  keywords: string;
  bidAmount: number;
  campaignFund: number;
  status: Status;
  town: Towns;
  radius: number;
}
