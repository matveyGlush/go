'use server'
import postgres from 'postgres';
import { Client } from "ssh2";

const sshConfig = {
  debug: console.log,
  host: 'helios.cs.ifmo.ru',
  port: 2222,
  username: 's338844',
  password: "BhFk}9219",
  tryKeyboard: true,
  readyTimeout: 99999,
};

const dbConfig = {
  host: "127.0.0.1", // Localhost since we are forwarding
  port: 5434, // The forwarded port
  database: "studs",
  username: "s338844",
  password: "Qb4Ixf1x34N1c5zo",
  ssl: false, // Not needed when using an SSH tunnel
};

export async function getData(): Promise<any | void> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on('keyboard-interactive', function(name, instr, lang, prompts, cb) {
        cb(['BhFk}9219']);
      })
      .on("ready", async () => {
        // Forward a local port (5433) to the remote database
        conn.forwardOut(
          "127.0.0.1",
          0,
          "127.0.0.1", // PostgreSQL host from the SSH server's perspective
          5432, // PostgreSQL port
          async (err, stream) => {
            if (err) {
              conn.end();
              return;
            }

            // Create a local server to forward the SSH tunnel
            const { createServer } = require("net");
            const server = createServer((socket: any) => {
              stream.pipe(socket);
              socket.pipe(stream);
            });

            server.listen(5434, "127.0.0.1", async () => {
              // Now connect to the PostgreSQL database via the local port
              const sql = postgres(dbConfig);

              try {
                const result = await sql`SELECT * from users`;
                console.log('here in 38s line ----------------------------------')
                console.log(result)
                resolve(result);
              } catch (dbErr) {
                console.log(dbErr)
                reject(dbErr);
              } finally {
                server.close();
                conn.end();
              }
            });
          }
        );
      })
      .connect(sshConfig);
  })
}





// const sql = postgres("postgres://s338844:Qb4Ixf1x34N1c5zo@helios.cs.ifmo.ru:5432/studs");

// export async function getData() {
//   try {
//     // Artificially delay a response for demo purposes.
//     // Don't do this in production :)

//     // console.log('Fetching revenue data...');
//     // await new Promise((resolve) => setTimeout(resolve, 3000));

//     const data = await sql<User[]>`SELECT get_users()`;

//     // console.log('Data fetch completed after 3 seconds.');

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }