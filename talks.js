// Внутри каждого года выступления идут от новых к старым.
const talkEntries = [
  {
    type: 'panel', year: 2026, event: 'CodeFest 16', place: 'Новосибирск',
    title: 'Мифическая кроссплатформа',
    recording: 'https://www.youtube.com/watch?v=aqSAyeHJmNI',
    website: 'https://16.codefest.ru/lecture/3289',
  },
  {
    type: 'panel', year: 2026, event: 'FlutterConf 2026', place: 'Москва',
    title: 'Я твой State Manager труба шатал',
  },
  {
    type: 'conference', year: 2025, event: 'CrossConf 2025', place: 'Москва',
    title: 'Многомодульность на Flutter. Переезжаем с монолита',
    recording: 'https://www.youtube.com/watch?v=Rt4CGLeUtc4',
  },
  {
    type: 'panel', year: 2025, event: 'CrossConf 2025', place: 'Москва',
    title: 'Презентация книги Основы Flutter',
    recording: 'https://youtu.be/1JgOOfjxxiA?si=uEPzae2R41Un_73X',
  },
  {
    type: 'conference', year: 2025, event: 'XIV Международная конференция «Стачка»', place: 'Санкт-Петербург',
    title: 'Архитектурные ошибки на Flutter. Легко ли переехать с монолита?',
    website: 'https://spb25.nastachku.ru/lp/proekt-1/speeches/mnogomodulnost-na-flutter-pereezzhaem-s-monolita',
  },
  {
    type: 'panel', year: 2025, event: 'XIV Международная конференция «Стачка»', place: 'Санкт-Петербург',
    title: 'Сильные и слабые стороны AI-driven development и как эта методология влияет на текущий ландшафт разработки',
  },
  {
    type: 'conference', year: 2025, event: 'XIII Международная конференция «Стачка»', place: 'Ульяновск',
    title: 'Истории о Stories. Работаем с анимациями и жестами на Flutter',
    website: 'https://ul25.nastachku.ru/истории-о-stories.-работаем-с-анимациями-и-жестами-на-flutter',
  },
  {
    type: 'conference', year: 2025, event: 'FlutterConf 2025', place: 'Москва',
    title: 'Многомодульность в Flutter 2.0. Все подходы и что нового',
  },
  {
    type: 'panel', year: 2025, event: 'FlutterConf 2025', place: 'Москва',
    title: 'Прошлое, настоящее и будущее Flutter',
  },
  {
    type: 'meetup', year: 2025, event: 'KozhinDev Meetup', place: 'Красноярск',
    title: 'Как не стоит делать корзину для мобильного ecom приложения?',
    recording: 'https://www.youtube.com/watch?v=3whdCbmWujI',
  },
  {
    type: 'meetup', year: 2025, event: 'Usetech Mobile Meetup', place: 'онлайн',
    title: 'Работаем с legacy на Flutter. Короткая и длинная дороги рефакторинга',
  },
  {
    type: 'conference', year: 2024, event: 'CrossConf 2024', place: 'Москва',
    title: 'UI логгера на Flutter: как сделать работу с логами быстрее и удобнее?',
    recording: 'https://www.youtube.com/watch?v=NqbQ9NBDsYc',
    website: 'https://2024.crossconf.com/',
  },
  {
    type: 'conference', year: 2024, event: 'XII Международная конференция «Стачка»', place: 'Санкт-Петербург',
    title: 'Это больше, чем биометрия. Или как сделать локальную аутентификацию на Flutter',
  },
  {
    type: 'conference', year: 2024, event: 'DevFest Omsk 2024', place: 'Омск',
    title: 'Логирование на Flutter или какие метрики помогут в оптимизации',
    recording: 'https://www.youtube.com/watch?v=ij9K-L0qhv4',
  },
  {
    type: 'conference', year: 2024, event: 'Mobius 2024 Spring', place: 'Москва',
    title: 'Создание indoor-карты здания на Flutter',
    recording: 'https://www.youtube.com/watch?v=ZwXCEo3Cduw',
    website: 'https://mobiusconf.com/archive/2024%20Spring/talks/20003625/',
  },
  {
    type: 'conference', year: 2024, event: 'DUMP 2024', place: 'Екатеринбург',
    title: 'Тестирование кросс-платформенных мобильных приложений',
    recording: 'https://youtu.be/43XgI_XvgfY?si=34LkXwzprKykbEMX',
    website: 'https://dump-ekb.ru/testirovanie-krossplatformennyh-mobilnyh-prilozhenij',
  },
  {
    type: 'conference', year: 2024, event: 'XI Международная конференция «Стачка»', place: 'Ульяновск',
    title: 'Многомодульная архитектура на Flutter или делаем большие проекты',
    website: 'https://ul24.nastachku.ru/многомодульная-архитектура-на-flutter-или-делаем-большие-проекты',
  },
  {
    type: 'meetup', year: 2024, event: 'KozhinDev Meetup', place: 'Красноярск',
    title: 'Одно приложение для всех платформ или как мы движемся к мультиплатформенности',
  },
  {
    type: 'meetup', year: 2024, event: 'Тинькофф Техтолк', place: 'Красноярск',
    title: 'Продуктовый подход в мобильной разработке',
    website: 'https://meetup.tbank.ru/event/tinkoff-tehtolk-produktovyj-podhod-v-mobilnoj-razrabotke/',
  },
  {
    type: 'conference', year: 2023, event: 'Mobius 2023 Autumn', place: 'Санкт-Петербург',
    title: 'Best practices локальной аутентификации на Flutter',
    recording: 'https://youtu.be/GAK3S0qcdrA?si=ek9wuj9PbSIbdgLh',
    website: 'https://mobiusconf.com/archive/2023%20Autumn/talks/20003014-best-practices-for-local-authentication-on-flutter/',
  },
  {
    type: 'conference', year: 2023, event: 'CrossConf 2023', place: 'Москва',
    title: 'Челленджи многомодульных Flutter-проектов',
    recording: 'https://www.youtube.com/watch?v=BuydW8HfViU',
  },
  {
    type: 'conference', year: 2023, event: 'CodeFest 13', place: 'Новосибирск',
    title: 'Многомодульность в Flutter или как не выстрелить себе в ногу',
    recording: 'https://www.youtube.com/watch?v=W_jBVpO0dyE&list=PL8761XQAJnra7TATfM9P3Swyf1vYQY3N8&index=4',
    website: 'https://13.codefest.ru/lecture/2241',
  },
  {
    type: 'conference', year: 2023, event: 'DUMP 2023', place: 'Екатеринбург',
    title: 'Многомодульность в Flutter или как не выстрелить себе в ногу',
    recording: 'https://youtu.be/9NtgRB8EB60?si=Tp7QldPn08gfdTMd',
    website: 'https://dump-ekb.ru/mnogomodulnost-v-flutter-ili-kak-ne-vystrelit-sebe-v-nogu',
  },
  {
    type: 'conference', year: 2022, event: 'Dev2Dev Chipec', place: 'Красноярск',
    title: 'Flutter Best Practices для высокого FPS',
    recording: 'https://www.youtube.com/watch?v=RTgor7jZm2A',
  },
  {
    type: 'meetup', year: 2021, event: 'Аспирити', place: 'онлайн',
    title: 'Кодогенерация в Dart и Flutter',
    recording: 'https://www.youtube.com/watch?v=jFK0VBkLtCA',
  },
  {
    type: 'meetup', year: 2021, event: 'Аспирити', place: 'онлайн',
    title: 'State Management на Flutter',
    recording: 'https://www.youtube.com/watch?v=NVo5pLd0xvw',
  },
  {
    type: 'meetup', year: 2021, event: 'Аспирити', place: 'онлайн',
    title: 'Flutter vs React Native 2. Как нативный разработчик перешел на кроссплатформу',
    recording: 'https://www.youtube.com/watch?v=oSsrQkpUGkI',
  },
  {
    type: 'meetup', year: 2021, event: 'Аспирити', place: 'онлайн',
    title: 'Обзор возможностей Firebase',
    recording: 'https://www.youtube.com/watch?v=og-Gv2jaM0M',
  },
  {
    type: 'meetup', year: 2021, event: 'Аспирити', place: 'онлайн',
    title: 'Язык программирования Dart и его фреймворки',
    recording: 'https://www.youtube.com/watch?v=fcpQ5kZG3r8',
  },
  {
    type: 'meetup', year: 2019, event: 'Аспирити', place: 'Красноярск',
    title: 'Flutter vs React Native. Как нативный разработчик попробовал кроссплатформу',
    recording: 'https://youtu.be/MYdPREb2nzE',
  },
];
