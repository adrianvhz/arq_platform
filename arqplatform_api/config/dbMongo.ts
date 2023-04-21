// import mongoose, { ConnectOptions } from "mongoose";


// class DataBaseMongo {
// 	private mongo_cnn : string;
// 	private options : any;

// 	constructor(){
// 		this.mongo_cnn = process.env.MONGODB_CNN || '' ;
// 		this.options = {
// 			useNewUrlParser :true,
// 			useUnifiedTopology :true
// 		}
// 	}

// 	async connect(){
// 		try {
// 			await mongoose.connect(this.mongo_cnn, this.options as ConnectOptions);
// 			console.log('Conectado MongoDB');
// 			console.log(mongoose.connection.readyState);
// 			} 
// 		catch (error) {
// 			console.log(error);
// 		}
// 	}
// }

// export default DataBaseMongo;
