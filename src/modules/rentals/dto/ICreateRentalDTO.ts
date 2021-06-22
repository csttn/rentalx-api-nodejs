interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  id?: string;
  end_date?: Date;
  total?: number;
}

interface IUpdateRentalDTO {
  expected_return_date: Date;
  id: string;
  end_date: Date;
  total: number;
}

interface IDevolutionRentalDTO {
  user_id: string;
  id: string;
}

export { ICreateRentalDTO, IDevolutionRentalDTO, IUpdateRentalDTO };
