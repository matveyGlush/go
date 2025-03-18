'use client'

import React from 'react';

export default function Rules() {

  return (
    <article className="prose text-gray-900">
      <h1 className="max-w-[90%] text-2xl md:text-3xl font-bold mb-5">
        Правила настольной игры &laquo;Го-бан (пять в ряд)&raquo; (Go)
      </h1>
      <section className='mb-4'>
        <p className="mb-2 pt-1 pl-2 text-gray-900">
          Первым выстроить вертикальную, горизонтальную или&nbsp;диагональную прямую
          линию из&nbsp;5&nbsp;камней.
        </p>
      </section>
      <section className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-900">
          Правила настольной игры &laquo;Го
        </h2>
        <h2 className="text-xl font-semibold text-gray-900">
          Компоненты
        </h2>
        <ul className="pl-5">
          <li>&mdash; Игровая доска, разлинованная на&nbsp;9*9&nbsp;или&nbsp;19*19&nbsp;линий, создающих единую сетку.</li>
          <li>&mdash; Черные и&nbsp;белые камни</li>
        </ul>
      </section>
      <section className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-900">
          Подготовка к&nbsp;игре:
        </h2>
        <p className="mb-2 pt-1 pl-2 text-gray-900">
          Цвета игроков распределяются жребием. Если один из&nbsp;участников сильнее, ему лучше взять
          белые камни. Черные делают первый ход.
        </p>
      </section>
      <section className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-900">Цель игры</h2>
        <p className="mb-2 pt-1 pl-2 text-gray-900">
          Захват территории и захват камней противника.
        </p>
      </section>
      <section className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-900">Ход игры</h2>
        <ul className="pl-5">
          <li>
            <h3 className="text-md font-medium text-gray-900">&mdash; Размещение камней</h3>
            <p className="mb-2 pt-1 pl-2 text-gray-900">
              Игроки по&nbsp;очереди ставят один свой камень на&nbsp;одно из&nbsp;пересечений на поле. Эти камни остаются на&nbsp;месте во&nbsp;время игры, кроме случая, когда их&nbsp;снимают с&nbsp;доски. Не допускается ставить камни в&nbsp;между линиями или двигать их&nbsp;с&nbsp;места на&nbsp;место.
            </p>
          </li>
          <li>
            <h3 className="text-md font-medium text-gray-900">&mdash; Захват камней</h3>
            <p className="mb-2 pt-1 pl-2 text-gray-900">
              Камень можно захватить, если все соседние пересечения, непосредственно соединенные линиями с&nbsp;камнем, заняты камнями противника. Таким образом, атакующий игрок получает пустую территорию.
            </p>
            <figure className="my-6">
              <img src="/rules/rules-1.webp" alt="Пример - Захват камней" className="rounded-lg" />
              <figcaption className="text-sm sm: text-gray-900">
                Белые камни захвачены, поскольку они так окружены черными камнями, что не&nbsp;имеют пустых соседних пересечений. Они снимаются с&nbsp;поля и&nbsp;отдаются противнику (владельцу черных камней).
              </figcaption>
            </figure>
          </li>
          <li>
            <h3 className="text-md font-medium text-gray-900">&mdash; Запрет на самоубийство</h3>
            <p className="mb-2 pt-1 pl-2 text-gray-900">
              Никто из&nbsp;игроков не&nbsp;может ставить камень в&nbsp;пересечение, полностью окруженное камнями противника. Исключение&nbsp;&mdash; случай, когда такой ход приводит к&nbsp;захвату камней оппонента.
            </p>
          </li>
          <figure>
            <img src="/rules/rules-2.webp" alt="Пример - Запрет на самоубийство" />
            <figcaption className="text-sm sm: text-gray-900">
              Белые не&nbsp;могут сделать ход в&nbsp;отмеченные пересечения.
            </figcaption>
          </figure>
          <figure>
            <img src="/rules/rules-3.webp" alt="Пример - Запрет на самоубийство" />
            <figcaption className="text-sm sm: text-gray-900">
              Здесь белые могут сделать ход в&nbsp;отмеченное пересечение, но&nbsp;с&nbsp;учетом
              правила &laquo;Ко&raquo;, описанного ниже.
            </figcaption>
          </figure>
        </ul>
        <h2 className='text-xl font-semibold'>Правило &laquo;Ко&raquo;</h2>
        <p className="mb-2 pt-1 pl-2 text-gray-900">
          Правило &laquo;Ко&raquo; запрещает повторять позицию.
          В&nbsp;позиции, показанной на&nbsp;последней иллюстрации, может возникнуть безвыходная, казалось&nbsp;бы,
          ситуация. Белые снимают черный камень, затем черные могут снять камень противника. Поскольку
          белые могут опять снять камень черных и&nbsp;это может продолжаться до&nbsp;бесконечности, в&nbsp;силу
          вступает правило&nbsp;Ко: игрок не&nbsp;может своим ходом повторять позицию, копирующую позицию в&nbsp;его
          предыдущем ходу. Иными словами, ходы, которые приводят к&nbsp;повторению на&nbsp;доске той&nbsp;же
          ситуации, запрещены. Таким образом, черным запрещено немедленно делать ход в&nbsp;то&nbsp;же самое
          место, и&nbsp;вынужден делать другой ход, даря белым возможность защитить свой камень.
        </p>
      </section>
      <section className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-900">
          Конец игры:
        </h2>
        <p className="mb-2 pt-1 pl-2 text-gray-900">
          Игра заканчивается по&nbsp;согласию обоих игроков. Рано или поздно наступает момент, в&nbsp;который
          один или оба игрока могут сделать только запрещенный ход или выставить камень на&nbsp;свою
          территорию. В&nbsp;таком случае, игрок может пропустить свой ход, сказав &laquo;Пас&raquo;. Если оба игрока
          пасуют один за&nbsp;другим, игра окончена.
        </p>
      </section>
      <section className='mb-4'>
        <h2 className="text-xl font-semibold text-gray-900">
          Определение победителя
        </h2>
        <p className="mb-2 pt-1 pl-2 text-gray-900">
          В&nbsp;основном, считаются пересечения внутри территории, окруженной камнями игрока, а&nbsp;также
          захваченные камни противника. Подсчет начинается с&nbsp;определения камней, обреченных на&nbsp;гибель,
          и&nbsp;добавления их&nbsp;к&nbsp;захваченным камням. Теперь подсчитываются пустые пересечения, а&nbsp;также
          захваченные и&nbsp;окруженные камни&nbsp;&mdash; по&nbsp;1&nbsp;очку за&nbsp;каждый.
          Побеждает игрок, набравший наибольшее число очков.
        </p>
      </section>
      <section className='mb-4'>
        <h2 className='text-xl font-semibold'>Малая энциклопедия &laquo;Го&raquo;</h2>
        <ul className="pl-5">
          <li>
          <h3 className="text-md font-medium text-gray-900">&mdash; Дыхание</h3>
            <p>
              Пустые пересечения, непосредственно примыкающие к&nbsp;камням или
              группам камней.
            </p>
            <img src="/rules/rules-4.webp" alt="Пример - Дыхание" />
          </li>
          <li>
          <h3 className="text-md font-medium text-gray-900">&mdash; Территория</h3>
            <p>
              Пустые пересечения, огороженные камнями одного цвета. При этом
              могут помочь края игровой доски.
            </p>
            <img src="/rules/rules-5.webp" alt="Пример - Территория" />
          </li>
          <li>
          <h3 className="text-md font-medium text-gray-900">&mdash; Пойманные камни</h3>
            <p>
              Камень пойман, если находится на&nbsp;территории противника.
            </p>
            <img src="/rules/rules-6.webp" alt="Пример - Пойманные камни" />
          </li>
        </ul>
      </section>
    </article>
  );
};