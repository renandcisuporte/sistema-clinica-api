import { User } from "../dtos/user.interface";

export class UserMapper implements User {
  id!: string;
  code!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date | null;
  fullName!: string;
  email!: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

  map() {
    return {
      id: this.code,
      fullName: this.fullName,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
