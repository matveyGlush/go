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

async function checkPortAvailable(): Promise<boolean> {
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
    server.listen(dbConfig.port, dbConfig.host);
  });
}

// Function to establish SSH connection and DB tunnel
export async function connectToDB() {
  if (sql) {
    console.log("Reusing existing DB connection...");
    return sql;
  }

  const isAvailable = await checkPortAvailable();
  if (!isAvailable) {
    console.log("Port already in use. Reusing SSH tunnel...");
    sql = postgres(dbConfig);
    return sql;
  }

  if (sshClient) {
    sshClient.removeAllListeners();
    sshClient.end;
    sshClient.destroy;
  }

  return new Promise<postgres.Sql<{}>>((resolve, reject) => {
    console.log("Creating new SSH connection...");

    sshClient = new Client();

    sshClient
      .on("keyboard-interactive", (name, instr, lang, prompts, cb) => {
        cb(["BhFk}9219"]);
      })
      .on("ready", () => {
        console.log("SSH Connection Established");

        sshClient!.forwardOut(dbConfig.host, 0, dbConfig.host, 5432, (err, stream) => {
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
            sql = postgres(dbConfig);
            resolve(sql);
          });

          server.listen(dbConfig.port, dbConfig.host);
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
