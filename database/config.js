const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        const cnn = process.env.DB_CNN;        
        await mongoose.connect(cnn, {
            // Opcciones deprecadas en versiones nuevas
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');        
    }

};

module.exports = {
    dbConnection,
}