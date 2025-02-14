import axios from "axios";

type Location = {
  country: string;
  asn: string;
  org_name: string;
  city: string;
  zip_code: string;
  time_zone: string;
  meta: string;
};

type Metadata = {
  ip: string;
  providers: {
    dbip: Location;
    ip2location: Location;
    ipinfo: Location;
    maxmind: Location;
  };
};

export class LocationClient {
  public async getLocation() {
    const { data } = await axios.get<Metadata>("https://ip.oxylabs.io/location");

    return data;
  }
}
