// import User from '../../models/User'

// import { verifyToken } from '../../utils/generateToken'

// export const userResolver = {
// 	Query: {
// 		async getUser(__: any, { id }: { id: string }) {
// 		try {
// 			return await User.findById(id).populate('activities')
// 		} catch (error) {
// 			console.error(error)
// 			throw new Error('There was an error finding user')
// 		}
// 	},

// 		async getAllUsers() {
// 			try {
// 				return await User.find().populate('activities')
// 			} catch (error) {
// 				console.error(error)
// 				throw new Error ('There was an issue getting all users')
// 			}
// 		}
// 	},

// 	Mutation: {
// 		async createUser(__: any, 
// 			{ username, password }: { username: string, password: string }) {
// 			try {
// 				const newUser = new User({ username, password })

// 				return await newUser.save()
// 			} catch (error) {
// 				console.error(error)
// 				throw new Error ('There was an error creating a new user')
// 			}
// 		},
// // 
// 		async login(__: any,
// 			{ username, password } : { username: string, password: string }) {
// 			try {
// 				const findUser = await User.findOne({ username })
// 				if (!findUser) {
// 					console.log('No user found')
// 					throw new Error ('User now found')
// 				}

// 				const userVerified = await findUser.matchPassword(password)

// 				if(!userVerified) {
// 					console.log('Invalid credentials')
// 					throw new Error('Invalid credentials')
// 				}

// 				console.log('User verified')

// 				const token = verifyToken(findUser._id.toString())

// 				return { user: findUser, token }

// 			} catch (error) {
// 				console.error(error)
// 				throw new Error ('There was an error creating a new user')
// 			}
// 		}
// 	}

// }