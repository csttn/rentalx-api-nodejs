import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { v4 as uuidV4 } from 'uuid';

// @Entity('rentals')
class Rental {
  // @PrimaryColumn()
  id: string;

  // @OneToOne(() => Car)
  // @JoinColumn({ name: 'car_id' })
  car_id: string;

  // @OneToOne(() => User)
  // @JoinColumn({ name: 'user_id' })
  user_id: string;

  // @CreateDateColumn()
  start_date: Date;

  // @CreateDateColumn()
  end_date: Date;

  // @CreateDateColumn()
  expected_return_date: string;

  // @Column()
  total: number;

  // @CreateDateColumn()
  created_at: Date;

  // @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };
