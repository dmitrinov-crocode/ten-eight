# React Native + Expo Project Guidelines

## Tech Stack

- **React Native** (Expo SDK 54)
- **Expo Router v6** (файловая маршрутизация, app/ directory)
- **Styling:** StyleSheet (Native)
- **Navigation:** Expo Router + React Navigation (bottom-tabs v7, native-stack)
- **Анимации:** React Native Reanimated v4 + Worklets
- **Иконки:** @expo/vector-icons, expo-symbols (iOS SF Symbols), react-native-svg

## Project Structure

- `app/` - Expo Router screens (file-based routing)
- `components/` - Reusable UI components
- `constants/` - Colors, typography, design tokens
- `hooks/` - Custom React hooks
- `assets/` - Images, fonts, SVGs

## File Organization Rules

1. **Создавай экраны в `app/`** с использованием Expo Router conventions
2. **Компоненты выноси в `components/`**

## Figma Integration Rules

### 1. Pixel Perfect

- Воспроизводи дизайн максимально точно (отступы, размеры, цвета, шрифты) согласно макету Figma
- Используй `get_design_context` для получения точных значений
- Сохраняй иерархию и вложенность элементов из Figma

### 2. Design Tokens (CRITICAL)

- **Никогда не хардкодь hex-цвета, размеры или отступы**
- Все цвета, шрифты, градиеты и подобное из Figma выноси в `constants/theme.ts`

## Main Task

Необходимо через Figma MCP сверстать экраны auth (SIGN UP / LOG IN) по макету из Figma: https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3019&m=dev

## Макеты Figma

Макет "SIGN UP / LOG IN" включает:

- Экран Get Started: @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3170&m=dev
- Экраны Log In: @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3955&m=dev
- Экраны Sign Up: @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3236&m=dev
- Рандомные иконки пользователей (5 шт.): @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3949&m=dev

Назначение макетов экранов Log In:

1. Вход через Email:

- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3956&m=dev - форма входа
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-4098&m=dev - успешно заполненная форма входа

2. Вход через номер телефона:

- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-4027&m=dev - форма входа
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-4169&m=dev - успешно заполненная форма входа

Назначение макетов экранов Sign Up:

1. Регистрация через Email:

- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3237&m=dev - форма регистрации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3316&m=dev - успешно заполненная форма регистрации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3395&m=dev - экран верификации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3588&m=dev - заполенный экран верификации

2. Регистрация через номер телефона:

- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3791&m=dev - форма регистрации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3870&m=dev - успешно заполненная форма регистрации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3657&m=dev - экран верификации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3722&m=dev - заполенный экран верификации

3. Последующее оформление аккаунта (на этот экран(ы) пользователь переходит после регистрации. После прохожения экрана(ов) оформления аккаунта пользователь попадает на главный экран проекта):

- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3460&m=dev - форма кастомизации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3524&m=dev - заполненая форма кастомизации
- @https://www.figma.com/design/ph4qvVMmqqKeGN2ytslVyc/10-8---UI_UX---cro-copy?node-id=563-3949&m=dev - рандомные иконки для оформления аккаунта пользователей

## Логика переходов между экранами:

- При запуске проекта самым первым отображается экран Get Started
- По нажатию на кнопку "Sign Up with Email / Phone" экрана Get Started осуществляется переход на экран(ы) Sign Up
- По нажатию на ссылку "Log in" экрана Get Started осуществаляется переход на экран(ы) Log In

## Шаги выполения Main Task

1. Запись (недостающих в constants/theme.ts) токенов/переменных из Figma в constants/theme.ts + Верстка экрана Get Started
2. Верстка Log In
3. Верстка Sign Up
