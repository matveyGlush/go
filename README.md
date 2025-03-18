# go
cheness board game implemented in react

Open [http://localhost:3000](http://localhost:3000)

# Документация API

## 1. Регистрация пользователя
**Описание:** Регистрирует нового пользователя и создает для него сессию.

**Запрос:**
```sql
SELECT * FROM register_user('email@example.com', 'password123');
```

**Ответ:**
- `message` (TEXT) - сообщение о статусе операции
- `token` (UUID) - токен сессии (если регистрация успешна)

**Ошибки:**
- "Email cannot be empty"
- "Password cannot be empty"
- "Email is already taken"

---
## 2. Авторизация пользователя
**Описание:** Авторизует пользователя и возвращает сессионный токен.

**Запрос:**
```sql
SELECT * FROM login_user('email@example.com', 'password123');
```

**Ответ:**
- `message` (TEXT) - сообщение о статусе операции
- `token` (UUID) - токен сессии (если вход успешен)

**Ошибки:**
- "Email cannot be empty"
- "Password cannot be empty"
- "User not found"
- "Incorrect password"

---
## 3. Выход пользователя
**Описание:** Завершает сессию пользователя.

**Запрос:**
```sql
SELECT logout_user('token_uuid');
```

**Ответ:**
- `TEXT` - "SUCCESS: Logged out" или сообщение об ошибке

**Ошибки:**
- "ERROR: Invalid token format"
- "ERROR: Invalid or expired token"

---
## 4. Проверка токена
**Описание:** Проверяет, действителен ли токен сессии.

**Запрос:**
```sql
SELECT verify_token('token_uuid');
```

**Ответ:**
- `BOOLEAN` - `true` (токен действителен) или `false` (недействителен)

---
## 5. Создание новой игры
**Описание:** Создает новую игру и назначает игроку цвет.

**Запрос:**
```sql
SELECT create_new_game('token_uuid', 9, 300, 'Player1', 'BLACK');
```

**Ответ:**
- JSON с информацией об игре:
  ```json
  {
    "status": "success",
    "message": "New game created successfully",
    "game_id": 1,
    "nickname": "Player1",
    "chosen_color": "BLACK"
  }
  ```

**Ошибки:**
- "Invalid or expired token"
- "Invalid or expired session"

---
## 6. Отправка приглашения
**Описание:** Отправляет приглашение другому пользователю для участия в игре.

**Запрос:**
```sql
SELECT send_invite('token_uuid', 'friend@example.com', 1, 600);
```

**Ответ:**
- JSON с информацией о приглашении

**Ошибки:**
- "Invalid or expired token"
- "Game does not exist"
- "You are not the game owner"
- "Recipient does not exist"
- "You cannot send invites to yourself"

---
## 7. Присоединение к игре
**Описание:** Позволяет пользователю присоединиться к созданной игре.

**Запрос:**
```sql
SELECT join_created_game('token_uuid', 1, 'Player2');
```

**Ответ:**
- JSON с информацией об успешном подключении

**Ошибки:**
- "Invalid or expired token"
- "Game does not exist"
- "You are not invited to this game"
- "Game is already started"
- "Nickname is already taken"
- "Can not join the same game twice"

---
## 8. Проверка ограничения по времени
**Описание:** Проверяет, не истек ли лимит времени на ход для игрока.

**Запрос:**
```sql
SELECT check_time_limit(1);
```

**Ответ:**
- `BOOLEAN` - `true` (время еще есть) или `false` (время истекло)

---
## 9. Совершение хода
**Описание:** Позволяет игроку сделать ход в игре.

**Запрос:**
```sql
SELECT make_move('token_uuid', 1, 3, 3);
```

**Ответ:**
- `TEXT` - "Move successful" или сообщение об ошибке

**Ошибки:**
- "Invalid or expired token"
- "Player does not exist"
- "Game is not in progress"
- "Not your turn!"
- "Move time expired"
- "GAME OVER: Black/White wins"


## 10. Получение информации об игре
**Описание:** Возвращает информацию об игре, включая статус, размер доски, игроков, текущий ход и оставшееся время.

**Запрос:**
```sql
SELECT get_game_info('token_uuid', 1);
```

**Ответ:**
- `status` (TEXT) - статус игры
- `board_size` (INT) - размер доски
- `players` (JSON) - список игроков
- `crossings` (JSON) - координаты всех ходов
- `current_turn` (TEXT) - информация о текущем ходе
- `time_left` (INT) - оставшееся время на ход

**Ошибки:**
- "Invalid or expired token"
- "Game not found"

---

## 11. Поиск игр без приглашения
**Описание:** Находит игры, в которые можно вступить без приглашения.

**Запрос:**
```sql
SELECT find_games_without_invite('token_uuid');
```

**Ответ:**
- `available_games` (JSON) - список доступных игр

**Ошибки:**
- "Invalid or expired token"
- "Invalid or expired session"

---

## 12. Выход из игры
**Описание:** Позволяет игроку покинуть игру, назначая победителя.

**Запрос:**
```sql
SELECT exit_game('token_uuid', 1);
```

**Ответ:**
- `message` (TEXT) - сообщение о результате выхода

**Ошибки:**
- "Invalid or expired token"
- "User is not a participant of this game"

---

## 13. Проверка пяти камней подряд
**Описание:** Проверяет, есть ли у игрока пять камней подряд в одном из четырёх направлений.

**Запрос:**
```sql
SELECT check_five_in_a_row(1, 123, 'BLACK');
```

**Ответ:**
- `BOOLEAN` - `true`, если найдено пять камней подряд, `false` в противном случае

---

## 14. Проверка свободной клетки
**Описание:** Определяет, свободна ли указанная клетка на доске.

**Запрос:**
```sql
SELECT is_crossing_empty(1, 3, 3);
```

**Ответ:**
- `BOOLEAN` - `true`, если клетка свободна, `false`, если занята

---

## 15. Получение статистики пользователя
**Описание:** Возвращает статистику пользователя (общее количество игр и побед).

**Запрос:**
```sql
SELECT get_user_stats('token_uuid');
```

**Ответ:**
- `total_games` (INT) - общее количество игр
- `wins` (INT) - количество побед

**Ошибки:**
- "Invalid or expired token"

---

## 16. Смена пароля
**Описание:** Позволяет пользователю изменить пароль.

**Запрос:**
```sql
SELECT set_new_password('token_uuid', 'new_password123');
```

**Ответ:**
- `message` (TEXT) - "Password updated successfully"

**Ошибки:**
- "Invalid or expired token"
- "User not found"
- "New password cannot be empty"

