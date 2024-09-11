// Import the mysql2 library and use the promise-based API
import mysql from 'mysql2/promise';

// Create a connection pool to the MySQL database
export async function ConnectDb() {
  try{

    const connection = await mysql.createConnection({
      host: 'localhost',     // XAMPP's MySQL host (usually localhost)
      user: 'root',          // Your MySQL username (default is 'root' in XAMPP)
      password: '',          // Your MySQL password (usually empty in XAMPP)
      database: 'signup',  // The name of your database (replace with your actual database name)
    });
    console.log("connected to mysql database okay")
    return connection;
  }
  catch(err){
    console.error("failed to connect my db",err)
   throw err;
  }
}


