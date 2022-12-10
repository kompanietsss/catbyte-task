export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  age: number | string;
  company: Company;
  image: string;
};

type Address = {
  address: string;
  city: string;
  postalCode: string;
  state: string;
};
type Company = {
  address: Address;
  name: string;
};
