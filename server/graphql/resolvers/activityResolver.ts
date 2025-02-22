import Activity from '../../models/Activity';
import User from '../../models/User';

export const activityResolver = {
  Query: {
    async getActivity(_: any, { id }: { id: string }, context: { userId: string }) {
      if (!context.userId) {
        console.log("the context =>", context)
        throw new Error('You are unauthorized to access this');
      }

      try {
        const activity = await Activity.findById(id).populate('user');
        console.log('Populated activity:', activity);

        return activity
      } catch (error) {
        console.error('Error getting activity:', error);
        throw new Error('There was an issue getting the activity');
      }
    },

    async getAllActivities(_: any, __: any, context: { userId: string | null }) {
      console.log('Context userId:', context.userId); // Check if this logs a valid user ID
    
      if (!context.userId) {
        throw new Error('You are unauthorized to access this');
      }
    
      try {
        const activities = await Activity.find({ user: context.userId }).populate('user');
        console.log("All activities", activities);
        return activities;
      } catch (error) {
        console.error('Error getting all activities:', error);
        throw new Error('There was an issue getting all activities');
      }
    }
    
  },

  Mutation: {
    async createActivity(
      _: any,
      { name, value, userId }: { name: string; value: number; userId: string }
    ) {
      try {

        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        const newActivity = new Activity({
          name,
          value,
          user: user._id,
        });

        const activity = await newActivity.save();

        await User.findByIdAndUpdate(userId, { $push: { activities: activity._id } });

        return activity;
      } catch (error) {
        console.error('Error creating activity:', error);
        throw new Error('There was an issue creating the activity');
      }
    },
  },
};
