import { db } from '../server/mongodb.mjs';
import cron from 'node-cron';

export async function cleanupExpiredVerificationDataForUser () {
  const currentTime = new Date().getTime();
  const condition = {
    $and: [
      { verified: false },
      {
        $expr: {
          $gt: [
            {
              $subtract: ['$creationTime', currentTime]
            },
            24 * 60 * 60 * 1000// 24 hours in milliseconds
          ]
        }
      }
    ]
  };
  await db.collection('userCredentials').deleteMany(condition);
  scheduledCleanupUnverifiedUsers();
}

export async function scheduledCleanupUnverifiedUsers () {
  return cron.schedule('0 12 * * *', await cleanupExpiredVerificationDataForUser());
}
