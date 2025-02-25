"use server";
import postgres from "postgres";
import { Client } from "ssh2";
import net from "net";

const sshConfig = {
  debug: console.log,
  host: "helios.cs.ifmo.ru",
  port: 2222,
  username: "s338844",
  password: "BhFk}9219",
  tryKeyboard: true,
  readyTimeout: 99999,
};

const dbConfig = {
  host: "127.0.0.1",
  port: 5434,
  database: "studs",
  username: "s338844",
  password: "Qb4Ixf1x34N1c5zo",
  ssl: false,
};

let sshClient: Client | null = null;
let sql: any = null;
let isPortForwarded = false;

// Function to check if port is already in use
async function checkPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        resolve(false); // Port is already in use
      } else {
        resolve(true);
      }
    });
    server.once("listening", () => {
      server.close();
      resolve(true); // Port is free
    });
    server.listen(port, "127.0.0.1");
  });
}

// Function to establish SSH connection and DB tunnel
export async function connectToDB() {
  if (sql) {
    console.log("Reusing existing DB connection...");
    return sql;
  }

  const isAvailable = await checkPortAvailable(dbConfig.port);
  if (!isAvailable) {
    console.log("Port already in use. Reusing SSH tunnel...");
    sql = postgres(dbConfig);
    return sql;
  }

  return new Promise<postgres.Sql<{}>>((resolve, reject) => {
    console.log("Creating new SSH connection...");

    sshClient = new Client();
    sshClient.setMaxListeners(20); // Prevent max listener warning

    sshClient
      .on("keyboard-interactive", (name, instr, lang, prompts, cb) => {
        cb(["BhFk}9219"]);
      })
      .on("ready", () => {
        console.log("SSH Connection Established");

        sshClient!.forwardOut("127.0.0.1", 0, "127.0.0.1", 5432, (err, stream) => {
          if (err) {
            sshClient!.end();
            return reject(err);
          }

          const server = net.createServer((socket) => {
            stream.pipe(socket);
            socket.pipe(stream);
          });

          server.once("error", (err: any) => {
            if (err.code === "EADDRINUSE") {
              console.log("Port already in use. Using existing tunnel.");
              sql = postgres(dbConfig);
              resolve(sql);
            } else {
              reject(err);
            }
          });

          server.once("listening", async () => {
            console.log("DB Tunnel Established on Port 5434");
            isPortForwarded = true;
            sql = postgres(dbConfig);
            resolve(sql);
          });

          server.listen(dbConfig.port, "127.0.0.1");
        });
      })
      .connect(sshConfig);
  });
}

// Function to fetch data
export async function getData() {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM users`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    getData();
    return null;
  }
}





// 'use server'
// import postgres from 'postgres';
// import { Client } from "ssh2";

// const sshConfig = {
//   debug: console.log,
//   host: 'helios.cs.ifmo.ru',
//   port: 2222,
//   username: 's338844',
//   password: "BhFk}9219",
//   tryKeyboard: true,
//   readyTimeout: 99999,
// };

// const dbConfig = {
//   host: "127.0.0.1", // Localhost since we are forwarding
//   port: 5434, // The forwarded port
//   database: "studs",
//   username: "s338844",
//   password: "Qb4Ixf1x34N1c5zo",
//   ssl: false, // Not needed when using an SSH tunnel
// };

// export async function getData(): Promise<any | void> {

//    return new Promise((resolve, reject) => {
//     const conn = new Client();
//     conn
//       .on('keyboard-interactive', function(name, instr, lang, prompts, cb) {
//         cb(['BhFk}9219']);
//       })
//       .on("ready", async () => {
//         // Forward a local port (5433) to the remote database
//         conn.forwardOut(
//           "127.0.0.1",
//           0,
//           "127.0.0.1", // PostgreSQL host from the SSH server's perspective
//           5432, // PostgreSQL port
//           async (err, stream) => {
//             if (err) {
//               conn.end();
//               return;
//             }

//             // Create a local server to forward the SSH tunnel
//             const { createServer } = require("net");
//             const server = createServer((socket: any) => {
//               stream.pipe(socket);
//               socket.pipe(stream);
//             });

//             server.listen(5434, "127.0.0.1", async () => {
//               // Now connect to the PostgreSQL database via the local port
//               const sql = postgres(dbConfig);

//               try {
//                 const result = await sql`SELECT * from users`;
//                 console.log('here in 38s line ----------------------------------')
//                 console.log(result)
//                 resolve(result);
//               } catch (dbErr) {
//                 console.log(dbErr)
//                 reject(dbErr);
//               } finally {
//                 server.close();
//                 conn.end();
//               }
//             });
//           }
//         );
//       })
//       .connect(sshConfig);
//   })
// }