import UserModels from "../../app/models/UserModels"
import { v4 } from 'uuid';
import bcrypt from 'bcrypt';


export default async () => {
  try {
    const user = await UserModels.findOne({email: process.env.EMAIL})
    if (!user) await UserModels.create({
      id: v4(),
      firstName: process.env.USER_FIRST_NAME,
      lastName: process.env.USER_LAST_NAME,
      email: process.env.USER_EMAIL,
      passwordWash: await bcrypt.hash(process.env.USER_PASSWORD || '', await bcrypt.genSalt(10)),
      userLevel: 'owner',
    });
  } catch (err) {
    console.log({logMigration: err.message })
    throw err;
  }
}