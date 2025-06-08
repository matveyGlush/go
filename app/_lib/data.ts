"use server";
import postgres from "postgres";
import { Client } from "ssh2";
import net from "net";

const sshConfig = {
  debug: console.log,
  host: "helios.cs.ifmo.ru",
  port: 2222,
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  tryKeyboard: true,
  readyTimeout: 99999,
};

const dbConfig = {
  host: "127.0.0.1",
  port: 5434,
  database: "studs",
  username: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
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

export async function login(email: string, password: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM login_user(${email}, ${password})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function registerUser(email: string, password: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM register_user(${email}, ${password})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function logout(token: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM logout_user(${token})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function newGame(sessionToken: string, boardSize: number, timeLimit: number, nickname: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM create_new_game(${sessionToken}, ${boardSize}, ${timeLimit}, ${nickname})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function sendInvite(token: string, emailRecipient: string, gameId: number, endTimeInSeconds: number) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM send_invite(${token}, ${emailRecipient}, ${gameId}, ${endTimeInSeconds})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function isTokenValid(token: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM verify_token(${token})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function createNewGame(token: string, boardSize: number, timeLimitInSeconds: number, nickname: string, color: 'BLACK' | 'WHITE') {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM create_new_game(${token}, ${boardSize}, ${timeLimitInSeconds}, ${nickname}, ${color})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function joinCreatedGame(token: string, gameId: number, nickname: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM join_created_game(${token}, ${gameId}, ${nickname})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function makeMove(token: string, playerId: number, x_coordinate: number, y_coordinate: number) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM make_move(${token}, ${playerId}, ${x_coordinate}, ${y_coordinate})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function getUserInfo(token: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM get_user_info(${token})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function getGameInfo(token: string, gameId: number) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM get_game_info(${token}, ${gameId})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function findGamesWithoutInvite(token: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM find_games_without_invite(${token})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function exitGame(token: string, gameId: number) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM exit_game(${token}, ${gameId})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function getUserStats(token: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM get_user_stats(${token})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function declineInvite(from: string, to: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`DELETE FROM Invites WHERE Invites.email='${from}' AND Invites.email_recipient='${to}'`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const sql = await connectToDB();
    const result = await sql`SELECT * FROM set_new_password(${token}, ${newPassword})`;
    return result;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    sql = null;
    return null;
  }
}

