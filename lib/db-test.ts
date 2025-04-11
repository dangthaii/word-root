import { Pool } from "pg";

async function testConnection() {
  const connectionString =
    "postgresql://thai:_tx9EpCRCTfPAA16H8L9qw@soggy-muskrat-9255.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/word_root?sslmode=verify-full";

  const pool = new Pool({
    connectionString,
  });

  try {
    console.log("Connecting to CockroachDB...");
    const client = await pool.connect();
    console.log("Connection successful!");

    const result = await client.query("SELECT NOW()");
    console.log("Database time:", result.rows[0].now);

    client.release();
    await pool.end();
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

testConnection();
