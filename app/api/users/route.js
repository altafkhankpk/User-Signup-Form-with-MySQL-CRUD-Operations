import { ConnectDb } from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET Operation - Fetch all users
export async function GET(req) {
  const connection = await ConnectDb();
  try {
    const [rows] = await connection.execute('SELECT * FROM userTable');
    return NextResponse.json({
      success: true,
      data: [rows], // Removed unnecessary array wrapping
    });
  } catch (error) {
    console.error("Error during fetch:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch data",
    });
  } finally {
    connection.end();
  }
}

// POST Operation - Insert a new user
export async function POST(req) {
  const connection = await ConnectDb();
  try {
    let data = await req.json();

    let query = `INSERT INTO userTable(user_name, user_email, user_password) VALUES (?, ?, ?)`;
    let [result] = await connection.execute(query, [data.user_name, data.user_email, data.user_password]);

    return NextResponse.json({
      success: true,
      result,
      data,
    });
  } catch (err) {
    console.error("Error during insert:", err);
    return NextResponse.json({
      success: false,
      error: "Failed to insert data",
    });
  } finally {
    connection.end();
  }
}

// PUT Operation - Update an existing user
export async function PUT(req) {
  const connection = await ConnectDb();
  try {
    let data = await req.json();
    let query = `UPDATE userTable SET user_name = ?, user_email = ?, user_password = ? WHERE _id = ?`;
    let [result] = await connection.execute(query, [data.user_name, data.user_email, data.user_password, data._id]);

    return NextResponse.json({
      success: true,
      result,
      data,
    });
  } catch (err) {
    console.error("Error during update:", err);
    return NextResponse.json({
      success: false,
      error: "Failed to update data",
    });
  } finally {
    connection.end();
  }
}

// DELETE Operation - Delete a uer
// DELETE Operation - Delete a user
export async function DELETE(req) {
  const connection = await ConnectDb();
  try {
    let data = await req.json();
    
    console.log("Data received for deletion:", data); // Debugging

    let query = `DELETE FROM userTable WHERE _id = ?`;
    let [result] = await connection.execute(query, [data._id]);

    console.log("Deletion result:", result); // Debugging

    return NextResponse.json({
      success: true,
      result,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error("Error during deletion:", err.message, err.stack);
    return NextResponse.json({
      success: false,
      error: "Failed to delete data",
    });
  } finally {
    connection.end();
  }
}
